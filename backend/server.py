from fastapi import FastAPI, APIRouter, HTTPException, Depends
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from sqlalchemy.orm import selectinload
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime, timezone
from email_service import send_appointment_email, send_contact_email
import razorpay
import json

# Import Supabase database and models
from database import get_db, engine, Base
from models import User, UserRole, TherapistProfile, AvailabilitySlot, Booking, CommunityPost as CommunityPostModel, Blog
from auth import (
    UserCreate, UserLogin, Token, UserResponse,
    hash_password, verify_password, create_access_token,
    get_current_user, get_admin_user, get_therapist_user
)


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection (for existing endpoints)
mongo_url = os.environ['MONGO_URL']
mongo_client = AsyncIOMotorClient(mongo_url)
mongo_db = mongo_client[os.environ['DB_NAME']]

# Razorpay configuration (test keys for development)
RAZORPAY_KEY_ID = os.environ.get('RAZORPAY_KEY_ID', 'rzp_test_placeholder')
RAZORPAY_KEY_SECRET = os.environ.get('RAZORPAY_KEY_SECRET', 'placeholder_secret')

# Initialize Razorpay client only if keys are configured
razorpay_client = None
if RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET and 'placeholder' not in RAZORPAY_KEY_ID:
    razorpay_client = razorpay.Client(auth=(RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET))

# Create the main app
app = FastAPI(title="Aashwashan API", version="2.0")

# Create routers
api_router = APIRouter(prefix="/api")
auth_router = APIRouter(prefix="/api/auth", tags=["Authentication"])
admin_router = APIRouter(prefix="/api/admin", tags=["Admin"])
therapist_router = APIRouter(prefix="/api/therapist", tags=["Therapist"])
community_router = APIRouter(prefix="/api/community", tags=["Community"])
blog_router = APIRouter(prefix="/api/blogs", tags=["Blogs"])

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


# ==================== PYDANTIC MODELS ====================

class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class StatusCheckCreate(BaseModel):
    client_name: str

class AppointmentRequest(BaseModel):
    name: str
    email: EmailStr
    phone: str
    service: str = ""
    date: str
    time: str
    message: Optional[str] = ""

class Appointment(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: EmailStr
    phone: str
    service: str = ""
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

class CreateOrderRequest(BaseModel):
    amount: int
    appointment_id: str
    customer_name: str
    customer_email: EmailStr
    customer_phone: str

class VerifyPaymentRequest(BaseModel):
    razorpay_order_id: str
    razorpay_payment_id: str
    razorpay_signature: str
    appointment_id: str

# Supabase-based models
class TherapistProfileCreate(BaseModel):
    specialization: Optional[str] = ""
    bio: Optional[str] = ""
    experience_years: Optional[int] = 0
    skills: Optional[List[str]] = []
    image_url: Optional[str] = ""

class TherapistProfileResponse(BaseModel):
    id: str
    user_id: str
    name: str
    email: str
    specialization: Optional[str]
    bio: Optional[str]
    experience_years: int
    skills: List[str]
    image_url: Optional[str]
    is_available: bool

class AvailabilitySlotCreate(BaseModel):
    date: str  # Format: "2024-01-15"
    start_time: str  # Format: "09:00"
    end_time: str  # Format: "10:00"

class AvailabilitySlotResponse(BaseModel):
    id: str
    therapist_id: str
    date: str
    start_time: str
    end_time: str
    is_booked: bool

class CommunityPostCreate(BaseModel):
    title: str
    content: str
    category: Optional[str] = "General"
    is_anonymous: Optional[bool] = False

class CommunityPostResponse(BaseModel):
    id: str
    author_name: str
    title: str
    content: str
    category: str
    is_anonymous: bool
    likes_count: int
    comments_count: int
    created_at: str

class BlogCreate(BaseModel):
    title: str
    content: str
    excerpt: Optional[str] = ""
    featured_image: Optional[str] = ""
    category: Optional[str] = "General"
    tags: Optional[List[str]] = []
    is_published: Optional[bool] = False

class BlogResponse(BaseModel):
    id: str
    author_name: str
    title: str
    slug: str
    content: str
    excerpt: Optional[str]
    featured_image: Optional[str]
    category: str
    tags: List[str]
    is_published: bool
    views_count: int
    created_at: str
    published_at: Optional[str]


# ==================== HELPER FUNCTIONS ====================

def generate_jitsi_meeting_link(appointment_id: str) -> str:
    room_name = f"aashwashan-session-{appointment_id[:8]}-{uuid.uuid4().hex[:8]}"
    return f"https://meet.jit.si/{room_name}"

def generate_slug(title: str) -> str:
    import re
    slug = title.lower().strip()
    slug = re.sub(r'[^\w\s-]', '', slug)
    slug = re.sub(r'[\s_-]+', '-', slug)
    slug = slug.strip('-')
    return f"{slug}-{uuid.uuid4().hex[:8]}"


# ==================== AUTHENTICATION ROUTES ====================

@auth_router.post("/register", response_model=Token)
async def register(user_data: UserCreate, db: AsyncSession = Depends(get_db)):
    """Register a new user"""
    # Check if email already exists
    result = await db.execute(select(User).where(User.email == user_data.email))
    if result.scalar_one_or_none():
        raise HTTPException(status_code=400, detail="Email already registered")
    
    # Determine role
    role = UserRole.USER
    if user_data.role == "admin":
        role = UserRole.ADMIN
    elif user_data.role == "therapist":
        role = UserRole.THERAPIST
    
    # Create user
    user = User(
        email=user_data.email,
        password_hash=hash_password(user_data.password),
        name=user_data.name,
        role=role
    )
    db.add(user)
    await db.commit()
    await db.refresh(user)
    
    # Create access token
    access_token = create_access_token(data={"sub": user.id, "role": role.value})
    
    logger.info(f"User registered: {user.email} with role {role.value}")
    
    return Token(
        access_token=access_token,
        token_type="bearer",
        user={"id": user.id, "email": user.email, "name": user.name, "role": role.value}
    )

@auth_router.post("/login", response_model=Token)
async def login(credentials: UserLogin, db: AsyncSession = Depends(get_db)):
    """Login user"""
    result = await db.execute(select(User).where(User.email == credentials.email))
    user = result.scalar_one_or_none()
    
    if not user or not verify_password(credentials.password, user.password_hash):
        raise HTTPException(status_code=401, detail="Invalid email or password")
    
    if not user.is_active:
        raise HTTPException(status_code=403, detail="Account is disabled")
    
    access_token = create_access_token(data={"sub": user.id, "role": user.role.value})
    
    logger.info(f"User logged in: {user.email}")
    
    return Token(
        access_token=access_token,
        token_type="bearer",
        user={"id": user.id, "email": user.email, "name": user.name, "role": user.role.value}
    )

@auth_router.get("/me", response_model=UserResponse)
async def get_me(current_user: User = Depends(get_current_user)):
    """Get current user info"""
    return UserResponse(
        id=current_user.id,
        email=current_user.email,
        name=current_user.name,
        role=current_user.role.value,
        is_active=current_user.is_active
    )


# ==================== ADMIN ROUTES ====================

@admin_router.get("/stats")
async def get_admin_stats(
    current_user: User = Depends(get_admin_user),
    db: AsyncSession = Depends(get_db)
):
    """Get admin dashboard statistics"""
    # Count users by role
    users_result = await db.execute(select(User))
    users = users_result.scalars().all()
    
    therapists_count = len([u for u in users if u.role == UserRole.THERAPIST])
    users_count = len([u for u in users if u.role == UserRole.USER])
    
    # Count posts and blogs
    posts_result = await db.execute(select(CommunityPostModel))
    posts_count = len(posts_result.scalars().all())
    
    blogs_result = await db.execute(select(Blog).where(Blog.is_published == True))
    blogs_count = len(blogs_result.scalars().all())
    
    # Get MongoDB stats
    appointments_count = await mongo_db.appointments.count_documents({})
    contacts_count = await mongo_db.contacts.count_documents({})
    
    return {
        "total_users": users_count,
        "total_therapists": therapists_count,
        "total_appointments": appointments_count,
        "total_contacts": contacts_count,
        "total_posts": posts_count,
        "total_blogs": blogs_count
    }

@admin_router.get("/users")
async def get_all_users(
    current_user: User = Depends(get_admin_user),
    db: AsyncSession = Depends(get_db)
):
    """Get all users (admin only)"""
    result = await db.execute(select(User).order_by(User.created_at.desc()))
    users = result.scalars().all()
    
    return [
        {
            "id": u.id,
            "email": u.email,
            "name": u.name,
            "role": u.role.value,
            "is_active": u.is_active,
            "created_at": u.created_at.isoformat() if u.created_at else None
        }
        for u in users
    ]

@admin_router.post("/therapists")
async def create_therapist_account(
    user_data: UserCreate,
    profile_data: TherapistProfileCreate,
    current_user: User = Depends(get_admin_user),
    db: AsyncSession = Depends(get_db)
):
    """Create a new therapist account (admin only)"""
    # Check if email exists
    result = await db.execute(select(User).where(User.email == user_data.email))
    if result.scalar_one_or_none():
        raise HTTPException(status_code=400, detail="Email already registered")
    
    # Create user with therapist role
    user = User(
        email=user_data.email,
        password_hash=hash_password(user_data.password),
        name=user_data.name,
        role=UserRole.THERAPIST
    )
    db.add(user)
    await db.commit()
    await db.refresh(user)
    
    # Create therapist profile
    profile = TherapistProfile(
        user_id=user.id,
        specialization=profile_data.specialization,
        bio=profile_data.bio,
        experience_years=profile_data.experience_years,
        skills=json.dumps(profile_data.skills),
        image_url=profile_data.image_url
    )
    db.add(profile)
    await db.commit()
    
    logger.info(f"Therapist account created: {user.email}")
    
    return {"message": "Therapist account created", "user_id": user.id}


# ==================== THERAPIST ROUTES ====================

@therapist_router.get("/profile")
async def get_therapist_profile(
    current_user: User = Depends(get_therapist_user),
    db: AsyncSession = Depends(get_db)
):
    """Get current therapist's profile"""
    result = await db.execute(
        select(TherapistProfile).where(TherapistProfile.user_id == current_user.id)
    )
    profile = result.scalar_one_or_none()
    
    if not profile:
        raise HTTPException(status_code=404, detail="Therapist profile not found")
    
    return TherapistProfileResponse(
        id=profile.id,
        user_id=profile.user_id,
        name=current_user.name,
        email=current_user.email,
        specialization=profile.specialization,
        bio=profile.bio,
        experience_years=profile.experience_years,
        skills=json.loads(profile.skills) if profile.skills else [],
        image_url=profile.image_url,
        is_available=profile.is_available
    )

@therapist_router.put("/profile")
async def update_therapist_profile(
    profile_data: TherapistProfileCreate,
    current_user: User = Depends(get_therapist_user),
    db: AsyncSession = Depends(get_db)
):
    """Update therapist profile"""
    result = await db.execute(
        select(TherapistProfile).where(TherapistProfile.user_id == current_user.id)
    )
    profile = result.scalar_one_or_none()
    
    if not profile:
        # Create profile if doesn't exist
        profile = TherapistProfile(user_id=current_user.id)
        db.add(profile)
    
    profile.specialization = profile_data.specialization
    profile.bio = profile_data.bio
    profile.experience_years = profile_data.experience_years
    profile.skills = json.dumps(profile_data.skills)
    profile.image_url = profile_data.image_url
    
    await db.commit()
    
    return {"message": "Profile updated successfully"}

@therapist_router.get("/availability")
async def get_therapist_availability(
    current_user: User = Depends(get_therapist_user),
    db: AsyncSession = Depends(get_db)
):
    """Get therapist's availability slots"""
    result = await db.execute(
        select(TherapistProfile).where(TherapistProfile.user_id == current_user.id)
    )
    profile = result.scalar_one_or_none()
    
    if not profile:
        raise HTTPException(status_code=404, detail="Therapist profile not found")
    
    result = await db.execute(
        select(AvailabilitySlot)
        .where(AvailabilitySlot.therapist_id == profile.id)
        .order_by(AvailabilitySlot.date)
    )
    slots = result.scalars().all()
    
    return [
        AvailabilitySlotResponse(
            id=s.id,
            therapist_id=s.therapist_id,
            date=s.date.strftime("%Y-%m-%d") if s.date else "",
            start_time=s.start_time,
            end_time=s.end_time,
            is_booked=s.is_booked
        )
        for s in slots
    ]

@therapist_router.post("/availability")
async def add_availability_slot(
    slot_data: AvailabilitySlotCreate,
    current_user: User = Depends(get_therapist_user),
    db: AsyncSession = Depends(get_db)
):
    """Add availability slot"""
    result = await db.execute(
        select(TherapistProfile).where(TherapistProfile.user_id == current_user.id)
    )
    profile = result.scalar_one_or_none()
    
    if not profile:
        raise HTTPException(status_code=404, detail="Therapist profile not found")
    
    slot = AvailabilitySlot(
        therapist_id=profile.id,
        date=datetime.strptime(slot_data.date, "%Y-%m-%d").replace(tzinfo=timezone.utc),
        start_time=slot_data.start_time,
        end_time=slot_data.end_time
    )
    db.add(slot)
    await db.commit()
    await db.refresh(slot)
    
    return {"message": "Availability slot added", "id": slot.id}

@therapist_router.delete("/availability/{slot_id}")
async def delete_availability_slot(
    slot_id: str,
    current_user: User = Depends(get_therapist_user),
    db: AsyncSession = Depends(get_db)
):
    """Delete availability slot"""
    result = await db.execute(
        select(TherapistProfile).where(TherapistProfile.user_id == current_user.id)
    )
    profile = result.scalar_one_or_none()
    
    if not profile:
        raise HTTPException(status_code=404, detail="Therapist profile not found")
    
    result = await db.execute(
        select(AvailabilitySlot).where(
            AvailabilitySlot.id == slot_id,
            AvailabilitySlot.therapist_id == profile.id
        )
    )
    slot = result.scalar_one_or_none()
    
    if not slot:
        raise HTTPException(status_code=404, detail="Slot not found")
    
    if slot.is_booked:
        raise HTTPException(status_code=400, detail="Cannot delete booked slot")
    
    await db.delete(slot)
    await db.commit()
    
    return {"message": "Slot deleted"}


# ==================== PUBLIC THERAPIST ROUTES ====================

@api_router.get("/therapists")
async def get_public_therapists(db: AsyncSession = Depends(get_db)):
    """Get list of available therapists (public)"""
    result = await db.execute(
        select(TherapistProfile, User)
        .join(User, TherapistProfile.user_id == User.id)
        .where(TherapistProfile.is_available == True)
    )
    therapists = result.all()
    
    return [
        {
            "id": profile.id,
            "name": user.name,
            "specialization": profile.specialization,
            "bio": profile.bio,
            "experience_years": profile.experience_years,
            "skills": json.loads(profile.skills) if profile.skills else [],
            "image_url": profile.image_url
        }
        for profile, user in therapists
    ]

@api_router.get("/therapists/{therapist_id}/availability")
async def get_therapist_public_availability(
    therapist_id: str,
    db: AsyncSession = Depends(get_db)
):
    """Get therapist's available slots (public)"""
    result = await db.execute(
        select(AvailabilitySlot)
        .where(
            AvailabilitySlot.therapist_id == therapist_id,
            AvailabilitySlot.is_booked == False,
            AvailabilitySlot.date >= datetime.now(timezone.utc)
        )
        .order_by(AvailabilitySlot.date)
    )
    slots = result.scalars().all()
    
    return [
        {
            "id": s.id,
            "date": s.date.strftime("%Y-%m-%d") if s.date else "",
            "start_time": s.start_time,
            "end_time": s.end_time
        }
        for s in slots
    ]


# ==================== COMMUNITY ROUTES ====================

@community_router.get("/posts")
async def get_community_posts(
    limit: int = 50,
    skip: int = 0,
    category: Optional[str] = None,
    db: AsyncSession = Depends(get_db)
):
    """Get community posts (public read)"""
    query = select(CommunityPostModel, User).join(User, CommunityPostModel.author_id == User.id)
    
    if category:
        query = query.where(CommunityPostModel.category == category)
    
    query = query.where(CommunityPostModel.is_published == True).order_by(CommunityPostModel.created_at.desc()).offset(skip).limit(limit)
    
    result = await db.execute(query)
    posts = result.all()
    
    return [
        CommunityPostResponse(
            id=post.id,
            author_name="Anonymous" if post.is_anonymous else user.name,
            title=post.title,
            content=post.content,
            category=post.category or "General",
            is_anonymous=post.is_anonymous,
            likes_count=post.likes_count,
            comments_count=post.comments_count,
            created_at=post.created_at.isoformat() if post.created_at else ""
        )
        for post, user in posts
    ]

@community_router.post("/posts")
async def create_community_post(
    post_data: CommunityPostCreate,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """Create community post (authenticated users only)"""
    post = CommunityPostModel(
        author_id=current_user.id,
        title=post_data.title,
        content=post_data.content,
        category=post_data.category,
        is_anonymous=post_data.is_anonymous
    )
    db.add(post)
    await db.commit()
    await db.refresh(post)
    
    logger.info(f"Community post created by {current_user.email}")
    
    return {"message": "Post created", "id": post.id}


# ==================== BLOG ROUTES ====================

@blog_router.get("")
async def get_blogs(
    limit: int = 20,
    skip: int = 0,
    category: Optional[str] = None,
    db: AsyncSession = Depends(get_db)
):
    """Get published blogs (public)"""
    query = select(Blog, User).join(User, Blog.author_id == User.id).where(Blog.is_published == True)
    
    if category:
        query = query.where(Blog.category == category)
    
    query = query.order_by(Blog.published_at.desc()).offset(skip).limit(limit)
    
    result = await db.execute(query)
    blogs = result.all()
    
    return [
        {
            "id": blog.id,
            "author_name": user.name,
            "title": blog.title,
            "slug": blog.slug,
            "excerpt": blog.excerpt,
            "featured_image": blog.featured_image,
            "category": blog.category,
            "tags": json.loads(blog.tags) if blog.tags else [],
            "views_count": blog.views_count,
            "published_at": blog.published_at.isoformat() if blog.published_at else None
        }
        for blog, user in blogs
    ]

@blog_router.get("/{slug}")
async def get_blog_by_slug(slug: str, db: AsyncSession = Depends(get_db)):
    """Get single blog by slug"""
    result = await db.execute(
        select(Blog, User)
        .join(User, Blog.author_id == User.id)
        .where(Blog.slug == slug, Blog.is_published == True)
    )
    row = result.first()
    
    if not row:
        raise HTTPException(status_code=404, detail="Blog not found")
    
    blog, user = row
    
    # Increment view count
    blog.views_count += 1
    await db.commit()
    
    return {
        "id": blog.id,
        "author_name": user.name,
        "title": blog.title,
        "slug": blog.slug,
        "content": blog.content,
        "excerpt": blog.excerpt,
        "featured_image": blog.featured_image,
        "category": blog.category,
        "tags": json.loads(blog.tags) if blog.tags else [],
        "views_count": blog.views_count,
        "created_at": blog.created_at.isoformat() if blog.created_at else None,
        "published_at": blog.published_at.isoformat() if blog.published_at else None
    }

@admin_router.get("/blogs")
async def get_admin_blogs(
    current_user: User = Depends(get_admin_user),
    db: AsyncSession = Depends(get_db)
):
    """Get all blogs (admin)"""
    result = await db.execute(
        select(Blog).order_by(Blog.created_at.desc())
    )
    blogs = result.scalars().all()
    
    return [
        {
            "id": b.id,
            "title": b.title,
            "slug": b.slug,
            "category": b.category,
            "is_published": b.is_published,
            "views_count": b.views_count,
            "created_at": b.created_at.isoformat() if b.created_at else None
        }
        for b in blogs
    ]

@admin_router.post("/blogs")
async def create_blog(
    blog_data: BlogCreate,
    current_user: User = Depends(get_admin_user),
    db: AsyncSession = Depends(get_db)
):
    """Create blog (admin only)"""
    blog = Blog(
        author_id=current_user.id,
        title=blog_data.title,
        slug=generate_slug(blog_data.title),
        content=blog_data.content,
        excerpt=blog_data.excerpt,
        featured_image=blog_data.featured_image,
        category=blog_data.category,
        tags=json.dumps(blog_data.tags),
        is_published=blog_data.is_published,
        published_at=datetime.now(timezone.utc) if blog_data.is_published else None
    )
    db.add(blog)
    await db.commit()
    await db.refresh(blog)
    
    logger.info(f"Blog created: {blog.title}")
    
    return {"message": "Blog created", "id": blog.id, "slug": blog.slug}

@admin_router.put("/blogs/{blog_id}")
async def update_blog(
    blog_id: str,
    blog_data: BlogCreate,
    current_user: User = Depends(get_admin_user),
    db: AsyncSession = Depends(get_db)
):
    """Update blog (admin only)"""
    result = await db.execute(select(Blog).where(Blog.id == blog_id))
    blog = result.scalar_one_or_none()
    
    if not blog:
        raise HTTPException(status_code=404, detail="Blog not found")
    
    blog.title = blog_data.title
    blog.content = blog_data.content
    blog.excerpt = blog_data.excerpt
    blog.featured_image = blog_data.featured_image
    blog.category = blog_data.category
    blog.tags = json.dumps(blog_data.tags)
    
    if blog_data.is_published and not blog.is_published:
        blog.published_at = datetime.now(timezone.utc)
    blog.is_published = blog_data.is_published
    
    await db.commit()
    
    return {"message": "Blog updated"}

@admin_router.delete("/blogs/{blog_id}")
async def delete_blog(
    blog_id: str,
    current_user: User = Depends(get_admin_user),
    db: AsyncSession = Depends(get_db)
):
    """Delete blog (admin only)"""
    result = await db.execute(select(Blog).where(Blog.id == blog_id))
    blog = result.scalar_one_or_none()
    
    if not blog:
        raise HTTPException(status_code=404, detail="Blog not found")
    
    await db.delete(blog)
    await db.commit()
    
    return {"message": "Blog deleted"}


# ==================== EXISTING MONGODB ROUTES ====================

@api_router.get("/")
async def root():
    return {"message": "Aashwashan API v2.0"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.model_dump()
    status_obj = StatusCheck(**status_dict)
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    await mongo_db.status_checks.insert_one(doc)
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await mongo_db.status_checks.find({}, {"_id": 0}).to_list(1000)
    for check in status_checks:
        if isinstance(check['timestamp'], str):
            check['timestamp'] = datetime.fromisoformat(check['timestamp'])
    return status_checks

@api_router.post("/appointments", response_model=Appointment)
async def create_appointment(request: AppointmentRequest):
    try:
        appointment = Appointment(**request.model_dump())
        doc = appointment.model_dump()
        doc['created_at'] = doc['created_at'].isoformat()
        await mongo_db.appointments.insert_one(doc)
        email_sent = send_appointment_email(request.model_dump())
        logger.info(f"Appointment created for {request.name} - Email sent: {email_sent}")
        return appointment
    except Exception as e:
        logger.error(f"Error creating appointment: {str(e)}")
        raise

@api_router.get("/appointments", response_model=List[Appointment])
async def get_appointments():
    appointments = await mongo_db.appointments.find({}, {"_id": 0}).sort("created_at", -1).to_list(1000)
    for appointment in appointments:
        if isinstance(appointment['created_at'], str):
            appointment['created_at'] = datetime.fromisoformat(appointment['created_at'])
    return appointments

@api_router.post("/contact")
async def submit_contact(request: ContactRequest):
    try:
        contact = Contact(**request.model_dump())
        doc = contact.model_dump()
        doc['created_at'] = doc['created_at'].isoformat()
        await mongo_db.contacts.insert_one(doc)
        email_sent = send_contact_email(request.model_dump())
        logger.info(f"Contact form submitted by {request.name} - Email sent: {email_sent}")
        return {"message": "Contact form submitted successfully", "id": contact.id}
    except Exception as e:
        logger.error(f"Error submitting contact form: {str(e)}")
        raise

@api_router.post("/create-order")
async def create_razorpay_order(request: CreateOrderRequest):
    try:
        if not razorpay_client:
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
        
        order_data = {
            "amount": request.amount,
            "currency": "INR",
            "receipt": f"receipt_{request.appointment_id}",
            "notes": {
                "appointment_id": request.appointment_id,
                "customer_name": request.customer_name,
                "customer_email": request.customer_email
            }
        }
        
        order = razorpay_client.order.create(data=order_data)
        
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
        await mongo_db.payment_orders.insert_one(order_doc)
        
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
    try:
        if not razorpay_client:
            logger.warning("Razorpay not configured - mock payment verification")
            meeting_link = generate_jitsi_meeting_link(request.appointment_id)
            
            await mongo_db.appointments.update_one(
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
        
        meeting_link = generate_jitsi_meeting_link(request.appointment_id)
        
        await mongo_db.payment_orders.update_one(
            {"order_id": request.razorpay_order_id},
            {
                "$set": {
                    "status": "paid",
                    "payment_id": request.razorpay_payment_id,
                    "verified_at": datetime.now(timezone.utc).isoformat()
                }
            }
        )
        
        await mongo_db.appointments.update_one(
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

# Legacy community posts endpoint (MongoDB)
@api_router.post("/community-posts")
async def create_legacy_community_post(request: dict):
    try:
        post = {
            "id": str(uuid.uuid4()),
            "category": request.get("category", "General"),
            "content": request.get("content", ""),
            "created_at": datetime.now(timezone.utc).isoformat()
        }
        await mongo_db.community_posts.insert_one(post)
        logger.info(f"Legacy community post created: {post['id']}")
        return {"message": "Post created successfully", "id": post["id"]}
    except Exception as e:
        logger.error(f"Error creating community post: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@api_router.get("/community-posts")
async def get_legacy_community_posts(limit: int = 50, skip: int = 0):
    try:
        posts = await mongo_db.community_posts.find({}, {"_id": 0}).sort("created_at", -1).skip(skip).limit(limit).to_list(limit)
        return {"posts": posts, "count": len(posts)}
    except Exception as e:
        logger.error(f"Error fetching community posts: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))


# ==================== INCLUDE ALL ROUTERS ====================

app.include_router(api_router)
app.include_router(auth_router)
app.include_router(admin_router)
app.include_router(therapist_router)
app.include_router(community_router)
app.include_router(blog_router)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("shutdown")
async def shutdown_db_client():
    mongo_client.close()
