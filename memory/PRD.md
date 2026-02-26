# Aashwashan - Mental Health Website

## Original Problem Statement
A mental health website clone of "Nuro Psychology", rebranded as "Aashwashan" with professional teal/cyan theme, time-based booking system, community forum with user authentication, admin panel for content management, therapist calendar system, self-assessment tools, video calls, and AI support.

## User Personas
1. **Patients/Users**: Individuals seeking mental health support - can book sessions, take self-assessments, join community, chat with AI companion
2. **Therapists**: Mental health professionals - can manage availability, view bookings
3. **Administrators**: Site owners - can manage content, blogs, therapists, view statistics

## Core Requirements

### ✅ Completed Requirements

#### AI Features (Latest - Dec 2025)
- **AI Chatbot "Aasha"**: Compassionate wellness companion using OpenAI GPT-4o-mini via Emergent LLM Key
  - Provides empathetic mental health support
  - Crisis detection with Tele MANAS helpline reference
  - Session-based conversation memory
  - Beautiful chat UI with teal theme

#### Therapist Profiles (Updated)
- **Prakhar Tiwari** (Clinical Psychologist)
  - Skills: Empathy, Grief, Active Listening, Career Problems
  - Experience: 1+ years
  - Member, American Psychological Association (APA)
  - Pricing: ₹999/45min, ₹1249/60min
  - Custom uploaded photo

- **Sonali Mishra** (Licensed Therapist)
  - Skills: Stress Management, Relationship Issues, Self-Esteem, Anxiety
  - Experience: 3+ years
  - Pricing: ₹1499/45min, ₹1899/60min
  - Custom uploaded photo

- **Shweta Bramhankar**: REMOVED

#### UI/UX Enhancements
- **Typography**: Playfair Display (headings), DM Sans (body)
- **Hero Section**: Rotating background images (5 images, 6-second crossfade)
- **Logo**: Fixed white box reflection issue with rounded container
- **Animations**: Fade-in, slide, pulse, float effects

#### Redesigned Sections
- **"We Are Human"**: White background with colored text (teal, cyan, orange accents)
- **Tagline Added**: "Aashwashan is of the people, by the people, for the people"
- **"How It Works"**: Professional 4-step timeline (Recognize → Connect → Match → Transform)
- **"Why Aashwashan"**: Emotional cards with family-focused messaging

#### Self-Assessment Tools (6 Validated Assessments)
1. **PHQ-9** - © Drs. Spitzer, Williams, Kroenke / Pfizer Inc.
2. **GAD-7** - © Drs. Spitzer, Kroenke, Williams, Löwe / Pfizer Inc.
3. **DASS-21** - Lovibond & Lovibond, University of New South Wales
4. **K6 Scale** - Kessler et al., Harvard Medical School
5. **PSS** - Cohen, Kamarck, Mermelstein (1983)
6. **WHO-5** - World Health Organization Regional Office, Europe

- **Legal Disclaimer Added**: Not medical diagnosis, crisis resources, data privacy

#### Booking System
- Dynamic pricing per therapist
- Jitsi Meet video links generated after booking
- No coupon codes

#### Authentication System
- **Admin Panel**: `/admin/login` → `/admin/dashboard`
- **Therapist Portal**: `/therapist/login` → `/therapist/dashboard`
- **User Auth**: `/auth` for sign-in/sign-up
- Community posts require login

### 🔄 Pending/Upcoming Tasks

#### P0 - High Priority
1. **Daily Patient Messaging System** - Morning encouragement + evening check-ins via AI
2. **Therapist Calendar System** - Build therapist availability management dashboard

#### P1 - Medium Priority
3. **Patient-Therapist Messaging** - Secure in-app messaging system

#### P2 - Lower Priority
4. **Interactive Self-Assessment** - Add scoring and feedback to assessments
5. **Email Notifications** - Configure SendGrid/Resend for transactional emails

### 🚫 Deferred (User Request)
- **Google Analytics** - Waiting for GA4 Measurement ID
- **Razorpay** - Waiting for live keys (post-launch)

## Technical Architecture

### Backend (FastAPI)
- **Database**: 
  - Supabase PostgreSQL (users, therapists, blogs, community posts, bookings)
  - MongoDB (legacy appointments, contacts)
- **Authentication**: JWT with bcrypt
- **Video Calls**: Jitsi Meet integration
- **AI**: OpenAI GPT-4o-mini via Emergent LLM Key

### Frontend (React)
- **Styling**: TailwindCSS with teal/cyan theme
- **Fonts**: Playfair Display (headings), DM Sans (body)
- **State Management**: React Context (AuthContext)
- **Routing**: React Router v6
- **Components**: Shadcn/UI

### Key Pages
| Page | Route | Description |
|------|-------|-------------|
| Homepage | `/` | Hero, therapists, AI chatbot |
| Self-Assessment | `/self-assessment` | 6 mental health assessments + credits/disclaimer |
| Team | `/team` | Prakhar & Sonali profiles |
| Community | `/community` | User forum (auth required) |
| Blog | `/blog` | Mental Health Updates India |
| Contact | `/contact` | Contact form |
| Admin Login | `/admin/login` | Admin authentication |
| Admin Dashboard | `/admin/dashboard` | Admin panel |
| Therapist Login | `/therapist/login` | Therapist authentication |
| Therapist Dashboard | `/therapist/dashboard` | Availability management |
| User Auth | `/auth` | User login/signup |

### API Endpoints

#### Chatbot
- `POST /api/chatbot/new-session` - Create new chat session
- `POST /api/chatbot/chat` - Send message to AI

#### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user

#### Admin
- `GET /api/admin/stats` - Dashboard statistics

#### Community
- `GET /api/community/posts` - Get posts
- `POST /api/community/posts` - Create post (auth required)

## Testing Results
- **Backend**: 100% (14/14 tests passed)
- **Frontend**: 100% (17/17 features verified)
- **Latest Test**: `/app/test_reports/iteration_8.json`

## Credentials
- **Admin**: admin@aashwashan.com / Admin123!
- **Therapist**: therapist@aashwashan.com / Therapist123!

## 3rd Party Integrations
- **Supabase (PostgreSQL)**: Database and authentication
- **Jitsi Meet**: Video call link generation
- **OpenAI GPT-4o-mini**: AI Chatbot via Emergent LLM Key

## Last Updated
December 2025
