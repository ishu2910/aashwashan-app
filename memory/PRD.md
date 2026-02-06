# Aashwashan - Mental Health Website

## Original Problem Statement
Create a professional mental health website "Aashwashan" with a welcoming, human-touch design inspired by mindfulcare.figma.site.

## Design Philosophy
- **Professional & Welcoming**: Clean design that makes people feel comfortable seeking help
- **Teal/Cyan Color Scheme**: Consistent gradient throughout (teal-500 to cyan-600)
- **Minimal Cursive**: Only used for the main hero headline, not everywhere
- **No Negative Emojis**: Removed sad/anxious emojis that create negative impact
- **Human Touch**: Focus on compassion and emotional healing

## Tech Stack
- **Frontend**: React, TailwindCSS, shadcn/ui
- **Backend**: FastAPI, Motor (MongoDB)
- **Video**: Jitsi Meet (free)
- **Payments**: Razorpay (MOCKED - needs real keys)

---

## What's Been Implemented

### ✅ HERO SECTION
- Elegant italic headline: "How are you feeling today?"
- Subtext: "You don't have to face this alone. Our compassionate therapists are here to listen, understand, and guide you towards a healthier mind."
- Two CTAs: "Book a Session" (orange) + "Help Me Find a Therapist" (glass)

### ✅ HOMEPAGE SECTIONS (Professional Design)
1. "How Life Feels Better After Therapy" + "Do you want to feel like this?" CTA
2. "Booking a therapist is now just one step away"
3. "Meet Our Expert Therapists" with session pricing (30 min ₹999, 60 min ₹1600)
4. "We're Human, Just Like You"
5. "Why You Can't Ignore Mental Health Symptoms Anymore"
6. "How We Support You"
7. "How It Works"
8. "Why Aashwashan?" (After-therapy services)
9. "Take Care of Yourself" (Self-Help Tools + Worksheets)
10. "What Our Clients Say"
11. "Frequently Asked Questions"
12. "Spending ₹1000 on mental health can give you a 4x return of ₹4000"

### ✅ BOOKING SYSTEM
- Session duration: 30 min (₹999), 45 min (₹1400), 60 min (₹1600)
- Coupon code "AASHWASHAN20" auto-applied for 20% discount
- Works on Homepage, TeamPage, ResourcesPage

### ✅ PROFESSIONAL WORKSHEETS
- Exposure Tracking Form (PDF)
- Hourly Exposure Tracking (PDF)

### ⚠️ MOCKED FEATURES
- Razorpay Payments (returns mock orders)
- Email notifications (logs only)

---

## File Structure
```
/app
├── backend/server.py
└── frontend/src
    ├── components/
    │   ├── Navbar.jsx
    │   └── Footer.jsx
    └── pages/
        ├── Homepage.jsx
        ├── TeamPage.jsx
        ├── ResourcesPage.jsx
        ├── CommunityPage.jsx
        └── ...
```

## To Make Payments Live
Add to backend/.env:
```
RAZORPAY_KEY_ID=rzp_live_xxxxx
RAZORPAY_KEY_SECRET=your_secret
```

## Email
All emails: care@aashwashan.com
