# Aashwashan - Mental Health Website

## Original Problem Statement
A mental health website clone of "Nuro Psychology", rebranded as "Aashwashan" with professional teal/cyan theme, time-based booking system, community forum with user authentication, admin panel for content management, therapist calendar system, self-assessment tools, and Jitsi video calls.

## User Personas
1. **Patients/Users**: Individuals seeking mental health support - can book sessions, take self-assessments, join community, access resources
2. **Therapists**: Mental health professionals - can manage availability, view bookings
3. **Administrators**: Site owners - can manage content, blogs, therapists, view statistics

## Core Requirements

### ✅ Completed Requirements (All Done!)

#### Self-Assessment Tools (6 Validated Assessments)
1. **PHQ-9 Depression Scale** - 9 questions
2. **GAD-7 Anxiety Scale** - 7 questions
3. **DASS-21 Scale** - 21 questions (depression, anxiety, stress)
4. **K6 Psychological Distress Scale** - 6 questions
5. **Perceived Stress Scale (PSS)** - 10 questions
6. **WHO-5 Well-Being Index** - 5 questions

#### Booking System
- 30 min session: ₹999
- 45 min session: ₹1400
- 60 min session: ₹1600
- No coupon codes
- **Jitsi Meet video links** generated after payment confirmation

#### Admin Panel (Supabase Auth)
- Admin login: `/admin/login`
- Admin dashboard: `/admin/dashboard`
- Blog management (CRUD)
- User management view
- Statistics dashboard
- **Credentials**: admin@aashwashan.com / Admin123!

#### Therapist Portal
- Therapist login: `/therapist/login`
- Therapist dashboard: `/therapist/dashboard`
- Availability calendar management
- Profile management
- **Credentials**: therapist@aashwashan.com / Therapist123!

#### User Authentication
- User signup/login: `/auth`
- Community posts require login
- Anonymous posting option

#### UI/UX Completed
- ✅ Consistent teal/cyan theme across ALL pages
- ✅ "Additional Information" → "Do you want to tell more?"
- ✅ "Working Hours" → "We're Here For You"
- ✅ Footer logo REMOVED (text only: "Aashwashan")
- ✅ Professional Worksheets section REMOVED
- ✅ "How We Help" restructured into 4 categories:
  - Emotional Challenges
  - Worry & Anxiety
  - Sleep & Energy Issues
  - Life & Relationships

#### Blog Page Redesigned
- "Mental Health Updates in India" focus
- Featured updates: Budget 2025-26, NIMHANS-2
- Categories: Policy & Budget, Healthcare News, Research & Studies
- India Mental Health statistics

### 🔄 Pending (User to Provide)

1. **Google Analytics** - Waiting for GA4 Measurement ID
2. **Razorpay** - Waiting for live keys (currently mocked)

## Technical Architecture

### Backend (FastAPI)
- **Database**: 
  - Supabase PostgreSQL (users, therapists, blogs, community posts, bookings, availability_slots)
  - MongoDB (legacy appointments, contacts)
- **Authentication**: JWT with bcrypt
- **Video Calls**: Jitsi Meet integration

### Frontend (React)
- **Styling**: TailwindCSS with teal/cyan theme
- **State Management**: React Context (AuthContext)
- **Routing**: React Router v6

### Key Pages
| Page | Route | Description |
|------|-------|-------------|
| Homepage | `/` | Hero, How We Help, Therapists, Self-Help Tools |
| Self-Assessment | `/self-assessment` | All 6 mental health assessments |
| Team | `/team` | Therapist profiles + booking |
| Community | `/community` | User forum (auth required) |
| Blog | `/blog` | Mental Health Updates India |
| Contact | `/contact` | Contact form |
| Admin Login | `/admin/login` | Admin authentication |
| Admin Dashboard | `/admin/dashboard` | Admin panel |
| Therapist Login | `/therapist/login` | Therapist authentication |
| Therapist Dashboard | `/therapist/dashboard` | Availability management |
| User Auth | `/auth` | User login/signup |

### Database Schema (Supabase)
```sql
users (id, email, password_hash, name, role, is_active, created_at)
therapist_profiles (id, user_id, specialization, bio, experience_years, skills, image_url)
availability_slots (id, therapist_id, date, start_time, end_time, is_booked)
bookings (id, therapist_id, user_id, client_name, client_email, date, time_slot, duration, price, status, meeting_link)
community_posts (id, author_id, title, content, category, is_anonymous, likes_count, comments_count)
blogs (id, author_id, title, slug, content, excerpt, featured_image, category, tags, is_published, views_count)
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user

### Admin
- `GET /api/admin/stats` - Dashboard statistics
- `GET /api/admin/users` - All users
- `GET /api/admin/blogs` - All blogs
- `POST /api/admin/blogs` - Create blog
- `PUT /api/admin/blogs/:id` - Update blog
- `DELETE /api/admin/blogs/:id` - Delete blog

### Therapist
- `GET /api/therapist/profile` - Get profile
- `PUT /api/therapist/profile` - Update profile
- `GET /api/therapist/availability` - Get slots
- `POST /api/therapist/availability` - Add slot
- `DELETE /api/therapist/availability/:id` - Delete slot

### Public
- `GET /api/therapists` - List therapists
- `GET /api/therapists/:id/availability` - Get available slots
- `GET /api/community/posts` - Get community posts
- `POST /api/community/posts` - Create post (auth)
- `GET /api/blogs` - Get published blogs
- `GET /api/blogs/:slug` - Get blog by slug

## Testing Results
- Backend: 100% (35/35 tests passed)
- Frontend: 100% (all features verified)
- Test report: `/app/test_reports/iteration_6.json`

## Credentials
- **Admin**: admin@aashwashan.com / Admin123!
- **Therapist**: therapist@aashwashan.com / Therapist123!

## Last Updated
February 14, 2025
