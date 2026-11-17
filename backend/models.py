# /app/backend/models.py
import uuid
from datetime import datetime, timezone
from sqlalchemy import Column, String, Date, Text, DateTime, Boolean, Integer, ForeignKey, Enum as SQLEnum
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from database import Base
import enum

def generate_uuid():
    return str(uuid.uuid4())

def utc_now():
    return datetime.now(timezone.utc)

class UserRole(enum.Enum):
    ADMIN = "admin"
    THERAPIST = "therapist"
    USER = "user"

class User(Base):
    __tablename__ = 'users'
    
    id = Column(String(36), primary_key=True, default=generate_uuid)
    email = Column(String(255), unique=True, nullable=False, index=True)
    password_hash = Column(String(255), nullable=False)
    name = Column(String(255), nullable=False)
    role = Column(SQLEnum(UserRole), default=UserRole.USER, nullable=False, index=True)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), default=utc_now)
    updated_at = Column(DateTime(timezone=True), default=utc_now, onupdate=utc_now)
    
    # Relationships
    therapist_profile = relationship('TherapistProfile', back_populates='user', uselist=False, cascade='all, delete-orphan')
    community_posts = relationship('CommunityPost', back_populates='author', cascade='all, delete-orphan')
    blogs = relationship('Blog', back_populates='author', cascade='all, delete-orphan')

class TherapistProfile(Base):
    __tablename__ = 'therapist_profiles'
    
    id = Column(String(36), primary_key=True, default=generate_uuid)
    user_id = Column(String(36), ForeignKey('users.id', ondelete='CASCADE'), unique=True, nullable=False)
    specialization = Column(String(255))
    bio = Column(Text)
    experience_years = Column(Integer, default=0)
    skills = Column(Text)  # JSON string of skills array
    image_url = Column(String(500))
    is_available = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), default=utc_now)
    updated_at = Column(DateTime(timezone=True), default=utc_now, onupdate=utc_now)
    
    # Relationships
    user = relationship('User', back_populates='therapist_profile')
    availability_slots = relationship('AvailabilitySlot', back_populates='therapist', cascade='all, delete-orphan')
    bookings = relationship('Booking', back_populates='therapist', cascade='all, delete-orphan')

class AvailabilitySlot(Base):
    __tablename__ = 'availability_slots'
    
    id = Column(String(36), primary_key=True, default=generate_uuid)
    therapist_id = Column(String(36), ForeignKey('therapist_profiles.id', ondelete='CASCADE'), nullable=False, index=True)
    date = Column(DateTime(timezone=True), nullable=False, index=True)
    start_time = Column(String(10), nullable=False)  # Format: "09:00"
    end_time = Column(String(10), nullable=False)    # Format: "10:00"
    is_booked = Column(Boolean, default=False)
    created_at = Column(DateTime(timezone=True), default=utc_now)
    
    # Relationships
    therapist = relationship('TherapistProfile', back_populates='availability_slots')

class Booking(Base):
    __tablename__ = 'bookings'
    
    id = Column(String(36), primary_key=True, default=generate_uuid)
    therapist_id = Column(String(36), ForeignKey('therapist_profiles.id', ondelete='CASCADE'), nullable=False, index=True)
    user_id = Column(String(36), ForeignKey('users.id', ondelete='SET NULL'), nullable=True, index=True)
    client_name = Column(String(255), nullable=False)
    client_email = Column(String(255), nullable=False)
    client_phone = Column(String(20))
    date = Column(DateTime(timezone=True), nullable=False)
    time_slot = Column(String(20), nullable=False)
    duration_minutes = Column(Integer, nullable=False)
    price = Column(Integer, nullable=False)
    status = Column(String(50), default='pending', index=True)  # pending, confirmed, completed, cancelled
    meeting_link = Column(String(500))
    notes = Column(Text)
    created_at = Column(DateTime(timezone=True), default=utc_now)
    updated_at = Column(DateTime(timezone=True), default=utc_now, onupdate=utc_now)
    
    # Relationships
    therapist = relationship('TherapistProfile', back_populates='bookings')

class CommunityPost(Base):
    __tablename__ = 'community_posts'
    
    id = Column(String(36), primary_key=True, default=generate_uuid)
    author_id = Column(String(36), ForeignKey('users.id', ondelete='CASCADE'), nullable=False, index=True)
    title = Column(String(255), nullable=False)
    content = Column(Text, nullable=False)
    category = Column(String(100), index=True)
    is_anonymous = Column(Boolean, default=False)
    likes_count = Column(Integer, default=0)
    comments_count = Column(Integer, default=0)
    is_published = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), default=utc_now)
    updated_at = Column(DateTime(timezone=True), default=utc_now, onupdate=utc_now)
    
    # Relationships
    author = relationship('User', back_populates='community_posts')

class Blog(Base):
    __tablename__ = 'blogs'
    
    id = Column(String(36), primary_key=True, default=generate_uuid)
    author_id = Column(String(36), ForeignKey('users.id', ondelete='CASCADE'), nullable=False, index=True)
    title = Column(String(255), nullable=False)
    slug = Column(String(255), unique=True, nullable=False, index=True)
    content = Column(Text, nullable=False)
    excerpt = Column(Text)
    featured_image = Column(String(500))
    category = Column(String(100), index=True)
    tags = Column(Text)  # JSON string of tags array
    is_published = Column(Boolean, default=False, index=True)
    views_count = Column(Integer, default=0)
    created_at = Column(DateTime(timezone=True), default=utc_now)
    updated_at = Column(DateTime(timezone=True), default=utc_now, onupdate=utc_now)
    published_at = Column(DateTime(timezone=True), nullable=True)
    
    # Relationships
    author = relationship('User', back_populates='blogs')




class AppointmentRequestModel(Base):
    __tablename__ = "appointment_requests"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)

    client_name = Column(String, nullable=False)
    client_email = Column(String)
    client_phone = Column(String)

    therapist_name = Column(String)
    therapist_id = Column(String)

    service = Column(String)
    session_mode = Column(String)

    appointment_date = Column(Date)
    appointment_time = Column(String)

    message = Column(Text)

    status = Column(String, default="Pending")

    payment_status = Column(String, nullable=True)
    payment_id = Column(String, nullable=True)
    order_id = Column(String, nullable=True)
    meeting_link = Column(String, nullable=True)
    payment_verified_at = Column(DateTime(timezone=True), nullable=True)

    created_at = Column(DateTime(timezone=True), default=utc_now)

    

class SelfAssessment(Base):
    __tablename__ = "self_assessments"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    assessment_type = Column(String(50), nullable=False, index=True)
    answers = Column(Text, nullable=False)
    score = Column(Integer, nullable=False)
    result_level = Column(String(100), nullable=False)
    result_message = Column(Text)
    name = Column(Text, nullable=True)
    age = Column(Integer, nullable=True)
    gender = Column(Text, nullable=True)
    city = Column(Text, nullable=True)
    phone = Column(Text, nullable=True)
    user_id = Column(Text, nullable=True)
    created_at = Column(DateTime(timezone=True), default=utc_now, nullable=False)



class ContactModel(Base):
    __tablename__ = "contacts"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = Column(String, nullable=True)
    email = Column(String, nullable=True)
    phone = Column(String, nullable=True)
    subject = Column(String, nullable=True)
    message = Column(Text, nullable=True)
    created_at = Column(DateTime(timezone=True), default=utc_now)


class PaymentOrder(Base):
    __tablename__ = "payment_orders"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    order_id = Column(String, unique=True, nullable=False, index=True)
    appointment_id = Column(String, nullable=True, index=True)
    amount = Column(Integer, nullable=False)
    currency = Column(String, default="INR")
    status = Column(String, default="created")
    payment_id = Column(String, nullable=True)
    customer_name = Column(String, nullable=True)
    customer_email = Column(String, nullable=True)
    customer_phone = Column(String, nullable=True)
    verified_at = Column(DateTime(timezone=True), nullable=True)
    created_at = Column(DateTime(timezone=True), default=utc_now)


class LegacyCommunityPost(Base):
    __tablename__ = "legacy_community_posts"

    id = Column(String, primary_key=True)
    category = Column(String, nullable=True)
    content = Column(Text, nullable=False)
    created_at = Column(DateTime(timezone=True), default=utc_now)


class WellnessSubscriber(Base):
    __tablename__ = "wellness_subscribers"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    phone = Column(String, unique=True, nullable=False, index=True)
    name = Column(String, nullable=True)
    opted_in = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), default=utc_now)
    updated_at = Column(DateTime(timezone=True), default=utc_now, onupdate=utc_now)


class StatusCheckModel(Base):
    __tablename__ = "status_checks"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    client_name = Column(String, nullable=True)
    created_at = Column(DateTime(timezone=True), default=utc_now)
