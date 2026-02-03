from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime, timezone
from email_service import send_appointment_email, send_contact_email
import razorpay
import hmac
import hashlib


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Razorpay configuration (test keys for development)
RAZORPAY_KEY_ID = os.environ.get('RAZORPAY_KEY_ID', 'rzp_test_placeholder')
RAZORPAY_KEY_SECRET = os.environ.get('RAZORPAY_KEY_SECRET', 'placeholder_secret')

# Initialize Razorpay client only if keys are configured
razorpay_client = None
if RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET and 'placeholder' not in RAZORPAY_KEY_ID:
    razorpay_client = razorpay.Client(auth=(RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET))

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Define Models
class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")  # Ignore MongoDB's _id field
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class StatusCheckCreate(BaseModel):
    client_name: str

class AppointmentRequest(BaseModel):
    name: str
    email: EmailStr
    phone: str
    service: str
    date: str
    time: str
    message: Optional[str] = ""

class Appointment(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: EmailStr
    phone: str
    service: str
    date: str
    time: str
    message: Optional[str] = ""
    status: str = "pending"
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class ContactRequest(BaseModel):
    name: str
    email: EmailStr
    phone: Optional[str] = ""
    subject: str
    message: str

class Contact(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: EmailStr
    phone: Optional[str] = ""
    subject: str
    message: str
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

# Payment Models
class CreateOrderRequest(BaseModel):
    amount: int  # Amount in paise (e.g., 99900 for Rs 999)
    appointment_id: str
    customer_name: str
    customer_email: EmailStr
    customer_phone: str

class VerifyPaymentRequest(BaseModel):
    razorpay_order_id: str
    razorpay_payment_id: str
    razorpay_signature: str
    appointment_id: str

# Community Post Models
class CommunityPostRequest(BaseModel):
    category: str
    content: str

class CommunityPost(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    category: str
    content: str
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

# Helper function to generate Jitsi Meet link
def generate_jitsi_meeting_link(appointment_id: str) -> str:
    """Generate a unique Jitsi Meet link for a session"""
    room_name = f"aashwashan-session-{appointment_id[:8]}-{uuid.uuid4().hex[:8]}"
    return f"https://meet.jit.si/{room_name}"

# Add your routes to the router instead of directly to app
@api_router.get("/")
async def root():
    return {"message": "Hello World"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.model_dump()
    status_obj = StatusCheck(**status_dict)
    
    # Convert to dict and serialize datetime to ISO string for MongoDB
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    
    _ = await db.status_checks.insert_one(doc)
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    # Exclude MongoDB's _id field from the query results
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    
    # Convert ISO string timestamps back to datetime objects
    for check in status_checks:
        if isinstance(check['timestamp'], str):
            check['timestamp'] = datetime.fromisoformat(check['timestamp'])
    
    return status_checks

@api_router.post("/appointments", response_model=Appointment)
async def create_appointment(request: AppointmentRequest):
    """
    Create a new appointment request and send notification emails
    """
    try:
        # Create appointment object
        appointment = Appointment(**request.model_dump())
        
        # Convert to dict and serialize datetime to ISO string for MongoDB
        doc = appointment.model_dump()
        doc['created_at'] = doc['created_at'].isoformat()
        
        # Save to database
        await db.appointments.insert_one(doc)
        
        # Send email notifications
        email_sent = send_appointment_email(request.model_dump())
        
        logger.info(f"Appointment created for {request.name} - Email sent: {email_sent}")
        
        return appointment
    except Exception as e:
        logger.error(f"Error creating appointment: {str(e)}")
        raise

@api_router.get("/appointments", response_model=List[Appointment])
async def get_appointments():
    """
    Get all appointments
    """
    appointments = await db.appointments.find({}, {"_id": 0}).sort("created_at", -1).to_list(1000)
    
    # Convert ISO string timestamps back to datetime objects
    for appointment in appointments:
        if isinstance(appointment['created_at'], str):
            appointment['created_at'] = datetime.fromisoformat(appointment['created_at'])
    
    return appointments

@api_router.post("/contact")
async def submit_contact(request: ContactRequest):
    """
    Submit contact form and send notification email
    """
    try:
        # Create contact object
        contact = Contact(**request.model_dump())
        
        # Convert to dict and serialize datetime to ISO string for MongoDB
        doc = contact.model_dump()
        doc['created_at'] = doc['created_at'].isoformat()
        
        # Save to database
        await db.contacts.insert_one(doc)
        
        # Send email notification
        email_sent = send_contact_email(request.model_dump())
        
        logger.info(f"Contact form submitted by {request.name} - Email sent: {email_sent}")
        
        return {"message": "Contact form submitted successfully", "id": contact.id}
    except Exception as e:
        logger.error(f"Error submitting contact form: {str(e)}")
        raise

# ==================== PAYMENT ENDPOINTS ====================

@api_router.post("/create-order")
async def create_razorpay_order(request: CreateOrderRequest):
    """
    Create a Razorpay order for payment
    """
    try:
        if not razorpay_client:
            # If Razorpay is not configured, return mock order for testing
            logger.warning("Razorpay not configured - returning mock order")
            mock_order_id = f"order_mock_{uuid.uuid4().hex[:16]}"
            return {
                "order_id": mock_order_id,
                "amount": request.amount,
                "currency": "INR",
                "key_id": "rzp_test_mock",
                "mock": True,
                "message": "Razorpay not configured. Using mock payment for testing."
            }
        
        # Create Razorpay order
        order_data = {
            "amount": request.amount,  # Amount in paise
            "currency": "INR",
            "receipt": f"receipt_{request.appointment_id}",
            "notes": {
                "appointment_id": request.appointment_id,
                "customer_name": request.customer_name,
                "customer_email": request.customer_email
            }
        }
        
        order = razorpay_client.order.create(data=order_data)
        
        # Save order to database
        order_doc = {
            "order_id": order["id"],
            "appointment_id": request.appointment_id,
            "amount": request.amount,
            "currency": "INR",
            "status": "created",
            "customer_name": request.customer_name,
            "customer_email": request.customer_email,
            "customer_phone": request.customer_phone,
            "created_at": datetime.now(timezone.utc).isoformat()
        }
        await db.payment_orders.insert_one(order_doc)
        
        logger.info(f"Razorpay order created: {order['id']}")
        
        return {
            "order_id": order["id"],
            "amount": order["amount"],
            "currency": order["currency"],
            "key_id": RAZORPAY_KEY_ID,
            "mock": False
        }
        
    except Exception as e:
        logger.error(f"Error creating Razorpay order: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@api_router.post("/verify-payment")
async def verify_razorpay_payment(request: VerifyPaymentRequest):
    """
    Verify Razorpay payment signature and update appointment status
    """
    try:
        if not razorpay_client:
            # Mock verification for testing
            logger.warning("Razorpay not configured - mock payment verification")
            
            # Generate Jitsi meeting link
            meeting_link = generate_jitsi_meeting_link(request.appointment_id)
            
            # Update appointment with meeting link
            await db.appointments.update_one(
                {"id": request.appointment_id},
                {
                    "$set": {
                        "status": "confirmed",
                        "payment_status": "mock_paid",
                        "meeting_link": meeting_link,
                        "payment_verified_at": datetime.now(timezone.utc).isoformat()
                    }
                }
            )
            
            return {
                "success": True,
                "message": "Mock payment verified successfully",
                "meeting_link": meeting_link,
                "mock": True
            }
        
        # Verify signature
        params_dict = {
            'razorpay_order_id': request.razorpay_order_id,
            'razorpay_payment_id': request.razorpay_payment_id,
            'razorpay_signature': request.razorpay_signature
        }
        
        try:
            razorpay_client.utility.verify_payment_signature(params_dict)
        except Exception as sig_error:
            logger.error(f"Payment signature verification failed: {str(sig_error)}")
            raise HTTPException(status_code=400, detail="Payment verification failed")
        
        # Generate Jitsi meeting link
        meeting_link = generate_jitsi_meeting_link(request.appointment_id)
        
        # Update payment order status
        await db.payment_orders.update_one(
            {"order_id": request.razorpay_order_id},
            {
                "$set": {
                    "status": "paid",
                    "payment_id": request.razorpay_payment_id,
                    "verified_at": datetime.now(timezone.utc).isoformat()
                }
            }
        )
        
        # Update appointment with payment info and meeting link
        await db.appointments.update_one(
            {"id": request.appointment_id},
            {
                "$set": {
                    "status": "confirmed",
                    "payment_status": "paid",
                    "payment_id": request.razorpay_payment_id,
                    "order_id": request.razorpay_order_id,
                    "meeting_link": meeting_link,
                    "payment_verified_at": datetime.now(timezone.utc).isoformat()
                }
            }
        )
        
        logger.info(f"Payment verified for appointment: {request.appointment_id}")
        
        return {
            "success": True,
            "message": "Payment verified successfully",
            "meeting_link": meeting_link,
            "mock": False
        }
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error verifying payment: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

# ==================== COMMUNITY ENDPOINTS ====================

@api_router.post("/community-posts")
async def create_community_post(request: CommunityPostRequest):
    """
    Create a new anonymous community post
    """
    try:
        post = CommunityPost(**request.model_dump())
        
        doc = post.model_dump()
        doc['created_at'] = doc['created_at'].isoformat()
        
        await db.community_posts.insert_one(doc)
        
        logger.info(f"Community post created: {post.id}")
        
        return {"message": "Post created successfully", "id": post.id}
    except Exception as e:
        logger.error(f"Error creating community post: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@api_router.get("/community-posts")
async def get_community_posts(limit: int = 50, skip: int = 0):
    """
    Get community posts (most recent first)
    """
    try:
        posts = await db.community_posts.find({}, {"_id": 0}).sort("created_at", -1).skip(skip).limit(limit).to_list(limit)
        
        return {"posts": posts, "count": len(posts)}
    except Exception as e:
        logger.error(f"Error fetching community posts: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()