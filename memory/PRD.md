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

---

## What's Been Implemented (as of Feb 4, 2026)

### ✅ HOMEPAGE UPDATES (Latest Session)
1. **"How are you Feeling Today?"** - New section at the top with emotion buttons (Sad, Anxious, Stressed, Lost)
2. **"Do you want to feel like this?"** - CTA section under "How Life Feels Better" with "Book a Therapist Now" button
3. **"We're Human, Just Like You"** - Section added after "Meet Our Experts"
4. **"Why You Can't Ignore Mental Health Symptoms Anymore?"** - Updated heading (was "Ignoring the signs")
5. **Session Pricing on Therapist Cards** - Shows 30 min (₹999) and 60 min (₹1600) with "Coupon auto-applied!" message
6. **Professional Worksheets** - Exposure Tracking Form & Hourly Exposure Tracking PDFs added
7. **"Remember: Therapy takes 3-4 sessions"** - Message added to Self-Help Tools section
8. **"Start Writing for Clarity"** - Added to Self-Help Tools subtitle
9. **ROI Section** - Changed to GREEN text on WHITE background

### ✅ NAVBAR UPDATES
- "Book a Therapist" button (was "Get Counselling")
- "Resources" link (not "Services")

### ✅ FOOTER UPDATES
- PNG logo from user's uploaded file
- Quick Links show "Resources"
- Email: care@aashwashan.com

### ✅ BOOKING SYSTEM (P0) - COMPLETED
- Session duration selection: 30 min (₹999), 45 min (₹1400), 60 min (₹1600)
- Coupon code "AASHWASHAN20" auto-applied for 20% discount
- Dynamic price calculation
- Works on Homepage, TeamPage, and ResourcesPage

### ✅ PAYMENT INTEGRATION (P1) - MOCKED
- Razorpay backend endpoints implemented (`/api/create-order`, `/api/verify-payment`)
- Returns mock orders until real API keys are added
- Ready for production with real keys

### ✅ VIDEO MEETING (P1) - COMPLETED
- Jitsi Meet integration
- Automatic link generation after payment
- Format: `https://meet.jit.si/aashwashan-session-{id}`

### ✅ COMMUNITY PAGE (P2) - COMPLETED
- Backend connected (`POST/GET /api/community-posts`)
- Anonymous posts saved to MongoDB

---

## Homepage Section Order (Top to Bottom)
1. ✅ "How are you Feeling Today?" (NEW)
2. ✅ "How Life Feels Better After Therapy" + "Do you want to feel like this?" CTA
3. ✅ "Booking a Therapist is now just one step away"
4. ✅ "Meet Our Expert Therapists" (with pricing)
5. ✅ "We're Human, Just Like You" (NEW)
6. ✅ "Why You Can't Ignore Mental Health Symptoms Anymore?" (UPDATED)
7. ✅ "How We Support You"
8. ✅ "How It Works"
9. ✅ "Why Aashwashan?" (After-therapy services)
10. ✅ "Take Care of Yourself" (Self-Help Tools + Worksheets)
11. ✅ "What Our Clients Say" (Testimonials)
12. ✅ "Frequently Asked Questions"
13. ✅ "Spending ₹1000..." (GREEN text on WHITE bg)

---

## Known Limitations / MOCKED Features
- ⚠️ **Razorpay Payments** - Returns mock orders (no real API keys configured)
- ⚠️ **Email notifications** - Logs only, no actual SMTP configured
- ⚠️ **UPI payment** - Manual confirmation flow

## To Make Payments Live
1. Get Razorpay API keys from https://dashboard.razorpay.com/
2. Add to `/app/backend/.env`:
   ```
   RAZORPAY_KEY_ID=rzp_live_xxxxx
   RAZORPAY_KEY_SECRET=your_secret
   ```
3. Restart backend

---

## Backend API Endpoints
- `GET /api/` - Health check
- `POST /api/appointments` - Create appointment with session duration
- `GET /api/appointments` - List appointments
- `POST /api/contact` - Submit contact form
- `POST /api/create-order` - Create Razorpay order (MOCKED)
- `POST /api/verify-payment` - Verify payment and get meeting link (MOCKED)
- `POST /api/community-posts` - Create anonymous post
- `GET /api/community-posts` - Fetch community posts

## File Structure
```
/app
├── backend
│   ├── server.py
│   ├── email_service.py
│   └── requirements.txt
└── frontend
    └── src
        ├── components/
        │   ├── Navbar.jsx (Book a Therapist)
        │   ├── Footer.jsx (PNG logo)
        │   └── ui/ (shadcn)
        ├── data/mockData.js
        └── pages/
            ├── Homepage.jsx (All new sections)
            ├── TeamPage.jsx (Session pricing)
            ├── ResourcesPage.jsx (Auto-coupon)
            ├── BlogPage.jsx (Load More fix)
            └── CommunityPage.jsx
```

---

## Test Reports
- `/app/test_reports/iteration_1.json`
- `/app/test_reports/iteration_2.json`
- `/app/test_reports/iteration_3.json`

## User-Uploaded Assets
- Logo PNG: `https://customer-assets.emergentagent.com/job_0ea42f9a-ec24-4349-8b7e-7c4b2ee7febf/artifacts/utz6qiri_Untitled%20design.png`
- Exposure Tracking Form: `https://customer-assets.emergentagent.com/.../3n3ef6hu_Exposure-Tracking-Form.pdf`
- Hourly Exposure Tracking: `https://customer-assets.emergentagent.com/.../romg4s32_Exposure-Tracking-Form-Hourly-Exposure.pdf`
