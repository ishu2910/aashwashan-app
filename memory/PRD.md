# Aashwashan - Mental Health Website

## Original Problem Statement
Create a pixel-perfect clone of the "Nuro Psychology" website from Envato market, rebranded as "Aashwashan" with a custom logo. The website has evolved significantly based on user feedback to become a unique mental health platform focused on the Indian market.

## Core Mission
"Mental Health for All" - Providing high-quality mental health treatment at the comfort zone of those who need it, with a goal to change how India sees mental health and decrease suicide rates.

## Target Audience
- Adults seeking mental health support in India
- Those looking for anonymous, judgment-free therapy
- People experiencing anxiety, depression, mood disorders, or fatigue

## Tech Stack
- **Frontend**: React, TailwindCSS, shadcn/ui, React Router, react-razorpay
- **Backend**: FastAPI (Python), Motor (async MongoDB), Razorpay SDK
- **Database**: MongoDB
- **Video Conferencing**: Jitsi Meet (free, no API keys)

## What's Been Implemented (as of Feb 3, 2026)

### ✅ COMPLETED - Session Duration Pricing (P0)
- Booking modal shows 30 min (₹999), 45 min (₹1400), 60 min (₹1600) instead of service dropdown
- Works on both Homepage and TeamPage
- Dynamic price calculation

### ✅ COMPLETED - Coupon Code System (P0)
- First-time user coupon: `Aashwashan20` for 20% discount
- Real-time price recalculation
- Visual feedback on coupon application

### ✅ COMPLETED - Payment Integration (P1)
- Razorpay backend endpoints implemented (`/api/create-order`, `/api/verify-payment`)
- **MOCKED** - Returns mock orders since no real Razorpay API keys configured
- Ready for production with real keys

### ✅ COMPLETED - Video Meeting Links (P1)
- Jitsi Meet integration
- Automatic link generation after payment verification
- Format: `https://meet.jit.si/aashwashan-session-{id}`

### ✅ COMPLETED - Community Page Backend (P2)
- `POST /api/community-posts` - Create anonymous posts
- `GET /api/community-posts` - Fetch posts
- Frontend connected and working

### ✅ COMPLETED - UI/UX Updates
- "Ignoring the signs" section restructured with numbered signs list and CTA button
- "Why Aashwashan" section updated with after-therapy services:
  - Weekly Schedule Planning
  - Find Your Triggers
  - Execution Plan
  - Emotional Healing
- "Spending ₹1000 on mental health can give you a 4x return of ₹4000" text
- Footer with PNG logo image (transparent)
- Email changed to: care@aashwashan.com

### Homepage Sections (in order)
1. ✅ "Ignoring the signs of mental illness..." - Structured with signs list
2. ✅ "How Life Feels Better After Therapy" - 5 benefits cards
3. ✅ "Booking a Therapist is now just one step away" - with "It is Anonymous" badge
4. ✅ "Meet Our Expert Therapists" - 3 therapists with expertise tags
5. ✅ "How We Support You" - 4 service cards with symptom modals
6. ✅ "How It Works" - 4-step cycle process
7. ✅ "Why Aashwashan?" - After-therapy services
8. ✅ "Self-Help Tools" - Breathing exercise, Gratitude Journal, Exercise tip
9. ✅ "What Our Clients Say" - Testimonials with icons
10. ✅ FAQ section
11. ✅ "Spending ₹1000 on mental health can give 4x return of ₹4000"

### Backend API Endpoints
- `GET /api/` - Health check
- `POST /api/appointments` - Create appointment with session duration
- `GET /api/appointments` - List appointments
- `POST /api/contact` - Submit contact form
- `POST /api/create-order` - Create Razorpay order (MOCKED)
- `POST /api/verify-payment` - Verify payment and get meeting link (MOCKED)
- `POST /api/community-posts` - Create anonymous post
- `GET /api/community-posts` - Fetch community posts

### Database Collections
- `appointments`: {name, email, phone, sessionDuration, price, date, time, message, meeting_link, payment_status}
- `contacts`: {name, email, subject, message}
- `community_posts`: {id, category, content, created_at}
- `payment_orders`: {order_id, appointment_id, amount, status}

## Known Limitations / MOCKED Features
- ⚠️ **Razorpay Payments** - Returns mock orders (no real API keys configured)
- ⚠️ **Email notifications** - Logs only, no actual SMTP configured
- ⚠️ **UPI payment** - Manual confirmation flow, no actual payment processing

## To Make Payments Live
1. Get Razorpay API keys from https://dashboard.razorpay.com/
2. Add to `/app/backend/.env`:
   ```
   RAZORPAY_KEY_ID=rzp_live_xxxxx
   RAZORPAY_KEY_SECRET=your_secret
   ```
3. Add to `/app/frontend/.env`:
   ```
   REACT_APP_RAZORPAY_KEY_ID=rzp_live_xxxxx
   ```
4. Restart backend

## Pending / Future Tasks

### P2 - Medium Priority
- Email notifications via SendGrid
- Therapist calendar/availability system
- Admin panel for managing appointments

### P3 - Lower Priority
- AI Chatbot with voice integration
- Real-time messaging between client and therapist
- Session recording/notes feature

### Refactoring Needed
- Break down Homepage.jsx into smaller components
- Create reusable Booking Modal component
- Move content from mockData.js to MongoDB

## File Structure
```
/app
├── backend
│   ├── server.py (FastAPI endpoints with Razorpay, Jitsi)
│   ├── email_service.py
│   ├── requirements.txt
│   └── tests/test_aashwashan_features.py
└── frontend
    └── src
        ├── components/
        │   ├── Navbar.jsx
        │   ├── Footer.jsx (with logo PNG)
        │   └── ui/ (shadcn)
        ├── data/
        │   └── mockData.js
        └── pages/
            ├── Homepage.jsx (session pricing, coupon code)
            ├── TeamPage.jsx (session pricing, coupon code)
            ├── CommunityPage.jsx (backend connected)
            ├── ResourcesPage.jsx
            └── ...
```

## Test Reports
- `/app/test_reports/iteration_1.json`
- `/app/test_reports/iteration_2.json`
- `/app/test_reports/iteration_3.json` (Latest - All tests passed)
