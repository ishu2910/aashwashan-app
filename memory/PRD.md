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
- **Frontend**: React, TailwindCSS, shadcn/ui, React Router
- **Backend**: FastAPI (Python), Motor (async MongoDB)
- **Database**: MongoDB

## What's Been Implemented (as of Jan 16, 2026)

### Homepage Sections (in order)
1. ✅ "How Life Feels Better After Therapy" - 5 benefits cards
2. ✅ "Booking a Therapist is now just one step away" - with "It is Anonymous" badge
3. ✅ "Meet Our Expert Therapists" - 3 therapists with expertise tags
4. ✅ "Ignoring the signs of mental illness..." warning section
5. ✅ "How We Support You" - 4 service cards with symptom modals
6. ✅ "How It Works" - 3-step process
7. ✅ "Why Aashwashan?" - 4 value propositions
8. ✅ "Self-Help Tools" - Breathing exercise, Gratitude Journal, Exercise tip
9. ✅ "What Our Clients Say" - Testimonials with icons (no images)
10. ✅ FAQ section
11. ✅ "Spending Rs 1 on mental health can give 4x return" line

### Header/Navigation
- ✅ Logo with "Aashwashan" and "Mental Health for All" tagline
- ✅ Navigation: Home, About Us, When You're Ready, Blog, Join Our Team, Contact Us
- ✅ "Get Counselling" CTA button linking to Team page

### Therapists
- ✅ Prakhar Tiwari - Clinical Psychologist
- ✅ Sonali Mishra - Licensed Therapist  
- ✅ Shweta Bramhankar - Counseling Psychologist
- All priced at Rs 1500

### Testimonials (Indian names, icons only)
- ✅ Priya Sharma
- ✅ Rahul & Neha Gupta
- ✅ Amit Verma

### Contact Information
- ✅ Address: 1289/6 Near Market Committee, Ambala City
- ✅ Email: care@aashwashan.com
- ✅ Google Maps link integration
- ✅ No office hours displayed

### Self-Help Tools
- ✅ 4-4-4 Breathing Exercise (interactive modal)
- ✅ Gratitude Journal (3 entries modal)
- ✅ Physical Exercise tip for anxiety

### About Page
- ✅ Pledge to provide high-quality mental health treatment
- ✅ "Change the way India sees mental health"
- ✅ Goal: Decrease suicide rates in India
- ✅ Human touch messaging

### Forms (all with "It is Anonymous" badge)
- ✅ Booking/Appointment modal
- ✅ Contact form
- ✅ Feedback form

### Other Features
- ✅ WhatsApp floating button
- ✅ Scroll to top on navigation
- ✅ Mobile responsive design
- ✅ Footer with services list (not crisis intervention)

## Backend API Endpoints
- `POST /api/appointments` - Submit booking requests
- `POST /api/contact` - Submit contact inquiries
- `POST /api/feedback` - Submit feedback

## Database Collections
- `appointments`: {name, email, phone, date, message}
- `contacts`: {name, email, subject, message}
- `feedback`: {name, email, feedback}

## Known Limitations / MOCKED
- ⚠️ All content is MOCKED in `/app/frontend/src/data/mockData.js`
- ⚠️ Email notifications not configured (backend saves to DB only)
- ⚠️ WhatsApp number is placeholder

## Pending / Future Tasks

### P2 - Medium Priority
- Create "What is therapy?" carousel modal
- Update blog post images to be more relevant
- Add admin panel for managing appointments

### P3 - Lower Priority
- AI Chatbot with voice integration for therapist matching
- 24/7 Messaging platform feature
- Configure email service (SendGrid/Mailgun)

### Refactoring Needed
- Break down Homepage.jsx into smaller components
- Create reusable Modal component
- Move mockData.js content to MongoDB

## File Structure
```
/app
├── backend
│   ├── server.py (FastAPI endpoints)
│   ├── email_service.py (not configured)
│   └── requirements.txt
└── frontend
    └── src
        ├── components/
        │   ├── Navbar.jsx
        │   ├── Footer.jsx
        │   ├── WhatsAppButton.jsx
        │   └── ui/ (shadcn)
        ├── data/
        │   └── mockData.js
        └── pages/
            ├── Homepage.jsx
            ├── AboutPage.jsx
            ├── ContactPage.jsx
            ├── TeamPage.jsx
            ├── BlogPage.jsx
            └── ...
```
