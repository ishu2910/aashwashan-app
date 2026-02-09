# Aashwashan - Mental Health Website

## Original Problem Statement
A mental health website clone of "Nuro Psychology", rebranded as "Aashwashan" with professional teal/cyan theme, time-based booking system, community forum with user authentication, admin panel for content management, and therapist calendar system.

## User Personas
1. **Patients/Users**: Individuals seeking mental health support - can book sessions, join community, access resources
2. **Therapists**: Mental health professionals - can manage availability, view bookings
3. **Administrators**: Site owners - can manage content, blogs, therapists, view statistics

## Core Requirements

### ✅ Completed Requirements

#### P0 - Critical (Completed)
1. **Time-Based Booking System**
   - 30 min session: ₹999
   - 45 min session: ₹1400
   - 60 min session: ₹1600
   - No coupon codes (removed)

2. **Consistent Teal/Cyan Theme**
   - Applied across all pages (Homepage, About, Resources, Team, Community, Blog, Contact, Join Team)
   - Teal gradient hero sections
   - Teal CTA buttons
   - Fixed footer logo (no white background)

3. **Admin Panel with Supabase Auth**
   - Admin login: `/admin/login`
   - Admin dashboard: `/admin/dashboard`
   - Blog management (CRUD)
   - User management view
   - Statistics dashboard
   - **Credentials**: admin@aashwashan.com / Admin123!

4. **User Authentication for Community**
   - User signup/login: `/auth`
   - JWT-based authentication
   - Community posts require login
   - Anonymous posting option available

5. **UI/UX Fixes**
   - "Additional Information" → "Do you want to tell more?"
   - "Working Hours" → "We're Here For You"
   - Removed all coupon code UI
   - Fixed footer logo
   - Consistent teal theme

### 🔄 In Progress / Upcoming

#### P1 - High Priority
1. **Therapist Calendar System**
   - Therapist login portal
   - Availability slot management
   - Real-time slot display on booking

2. **Razorpay Payment Integration** (Waiting for user to go live)
   - UPI payments
   - Order creation
   - Payment verification

3. **Google Analytics Integration**

#### P2 - Medium Priority
1. **Patient-Therapist Messaging System**
2. **Interactive Self-Help Tools** (convert PDFs to web forms)
3. **Jitsi Meet Video Call Generation**

#### P3 - Low Priority / Future
1. **AI Session Transcription/Summarization**
2. **Email Notifications Setup**
3. **Advanced Blog Features** (comments, likes)

## Technical Architecture

### Backend (FastAPI)
- **Database**: 
  - Supabase PostgreSQL (users, therapists, blogs, community posts, bookings)
  - MongoDB (legacy appointments, contacts, status checks)
- **Authentication**: JWT with bcrypt password hashing
- **Key Files**:
  - `/app/backend/server.py` - Main API routes
  - `/app/backend/auth.py` - JWT authentication
  - `/app/backend/models.py` - SQLAlchemy models
  - `/app/backend/database.py` - Supabase connection

### Frontend (React)
- **Styling**: TailwindCSS with teal/cyan theme
- **State Management**: React Context (AuthContext)
- **Routing**: React Router v6
- **Key Pages**:
  - `/app/frontend/src/pages/Homepage.jsx`
  - `/app/frontend/src/pages/AdminLoginPage.jsx`
  - `/app/frontend/src/pages/AdminDashboardPage.jsx`
  - `/app/frontend/src/pages/UserAuthPage.jsx`
  - `/app/frontend/src/pages/CommunityPage.jsx`

### Database Schema (Supabase)
```sql
users (id, email, password_hash, name, role, is_active, created_at)
therapist_profiles (id, user_id, specialization, bio, experience_years, skills, image_url)
availability_slots (id, therapist_id, date, start_time, end_time, is_booked)
bookings (id, therapist_id, user_id, client_name, client_email, date, time_slot, duration, price, status)
community_posts (id, author_id, title, content, category, is_anonymous, likes_count, comments_count)
blogs (id, author_id, title, slug, content, excerpt, featured_image, category, tags, is_published, views_count)
```

### API Endpoints

#### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user

#### Admin
- `GET /api/admin/stats` - Dashboard statistics
- `GET /api/admin/users` - All users
- `GET /api/admin/blogs` - All blogs
- `POST /api/admin/blogs` - Create blog
- `PUT /api/admin/blogs/:id` - Update blog
- `DELETE /api/admin/blogs/:id` - Delete blog

#### Community
- `GET /api/community/posts` - Get posts
- `POST /api/community/posts` - Create post (auth required)

#### Legacy (MongoDB)
- `POST /api/appointments` - Book appointment
- `POST /api/contact` - Submit contact form

## Environment Variables
```
# Backend (.env)
MONGO_URL=mongodb://localhost:27017
DB_NAME=test_database
DATABASE_URL=postgresql://... (Supabase)
JWT_SECRET_KEY=...

# Frontend (.env)
REACT_APP_BACKEND_URL=https://...
```

## Testing Results
- Backend: 100% (35/35 tests passed)
- Frontend: 100% (16/16 features verified)
- Test report: `/app/test_reports/iteration_5.json`

## Last Updated
February 9, 2025
