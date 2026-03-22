# Aashwashan - Emotional Operating System

## Original Problem Statement
A mental health platform that goes beyond therapy booking - building an Emotional Operating System (EOS) that helps users understand themselves, build confidence, and break free from limiting patterns.

## Core Philosophy
- **"Aashwashan is of the people, by the people, for the people."**
- **Tagline: "You're Not Alone Anymore"**
- Only 1% of people actively work on emotional growth
- We sell the experience, not the therapy
- **Founder**: Ishan Goyal
- **Target Audience**: 18-30 year olds, students & early working professionals, silent overthinkers who feel everything but don't always speak

## What's Been Completed

### Latest Updates (December 2025 - Iteration 11)
- ✅ **Chatbot Renamed**: "Aasha" → "Saathi" (means companion in Hindi)
- ✅ **New Chatbot Icon**: Chat bubble with soft curves (no longer heart/alien)
- ✅ **Mobile Dots Removed**: Carousel indicator dots hidden on mobile
- ✅ **Animations Added**: Site-wide animations for smooth UX
- ✅ **Secrets Removed**: All sensitive credentials removed from codebase

### Previous Updates
- ✅ Tagline: "You're Not Alone Anymore"
- ✅ Hero Button: "Just talk. No pressure."
- ✅ Mobile White Box Fix
- ✅ Empathetic Chatbot System for 18-30 age group
- ✅ Booking Modal Redesign
- ✅ Orange accent colors
- ✅ Self-Assessment page
- ✅ Emotional Operating System (EOS) page

### Pages Completed
1. Homepage
2. About Us
3. Team (Therapists)
4. Resources
5. Emotional OS (/eos)
6. Community Forum
7. Blog
8. Contact Us
9. Self-Assessment
10. Admin Dashboard
11. Therapist Login

### AI Chatbot "Saathi"
- OpenAI GPT-4o-mini powered (via Emergent LLM Key)
- "Saathi" = Companion/Friend in Hindi
- Chat bubble icon with soft curves (teal/cyan gradient)
- Deeply empathetic for 18-30 age group
- Quick action buttons: "I'm feeling low", "Just need to vent", "Feeling anxious", "Can't sleep well"
- Knows when to suggest seeing a therapist
- Crisis resource provision (Tele MANAS: 14416)

## How to Access Admin Panel

### Admin Login
1. Go to: `/admin/login`
2. Login with admin credentials (stored securely)

### Admin Dashboard Features
- View site statistics
- Manage users
- Add/Edit/Delete Blog Posts
- View bookings

## Technical Stack
- Frontend: React + TailwindCSS + Shadcn/UI
- Backend: FastAPI + Supabase PostgreSQL + MongoDB
- AI: OpenAI GPT-4o-mini (via Emergent LLM Key)
- WhatsApp: Twilio API (to be configured by user)

## Therapist Pricing (Consistent Across Site)
- **Prakhar Tiwari** (Counselling Psychologist): ₹999/45min, ₹1249/60min
- **Sonali Mishra** (Licensed Therapist): ₹1499/45min

## Environment Variables Required
User must configure these in backend/.env:
- TWILIO_ACCOUNT_SID
- TWILIO_AUTH_TOKEN
- TWILIO_WHATSAPP_NUMBER

## Remaining Tasks (Prioritized)

### P0 - Critical
1. **Twilio Configuration** - User needs to add their own Twilio credentials
2. **AI Daily Patient Messaging System** - Scheduled wellness messages

### P1 - Important
3. **Therapist Calendar System** - Therapist login to set availability
4. **Light Color Theme** - Shift to lighter palette

### P2 - Nice to Have
5. **Patient-Therapist Messaging** - In-app secure messaging

### P3 - Future/Backlog
6. Email Notifications
7. Google Analytics Integration
8. Razorpay Payment Integration

## Known Issues Fixed
- ✅ Mobile white box glitch - FIXED
- ✅ Mobile dots under hero - FIXED (hidden on mobile)
- ✅ Chatbot alien icon - FIXED (chat bubble design)
- ✅ Generic chatbot responses - FIXED (empathetic Saathi)
- ✅ Secrets in repo - FIXED (all removed)
- ✅ No animations - FIXED (site-wide animations added)

## Last Updated
December 2025 - Iteration 11 completed
