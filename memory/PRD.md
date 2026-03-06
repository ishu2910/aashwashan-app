# Aashwashan - Emotional Operating System

## Original Problem Statement
A mental health platform that goes beyond therapy booking - building an Emotional Operating System (EOS) that helps users understand themselves, build confidence, and break free from limiting patterns.

## Core Philosophy
- **"Aashwashan is of the people, by the people, for the people."**
- Only 1% of people actively work on emotional growth
- We sell the experience, not the therapy
- **Founder**: Ishan Goyal

## What's Been Completed

### Latest Updates (December 2025)
- ✅ **AI Chatbot "Aasha" Redesign**
  - Custom teal/cyan gradient icon (friendly wellness face)
  - Quick action buttons: "I'm feeling anxious", "Need to talk", "Self-help tips"
  - Structured chat interface with avatar indicators
  - Online status with animated pulse
  - "New conversation" reset button
  - Disclaimer: "Aasha is here to support, not replace professional help"

- ✅ **Booking Modal Redesign (Human-Made Feel)**
  - Gradient teal/cyan header
  - "100% Confidential" badge with animated dot
  - Encouragement message: "Taking this step takes courage..."
  - Improved form fields with focus rings
  - Session duration cards with "Most popular" badge
  - Orange "Continue to Payment" button
  - Privacy reassurance footer

- ✅ **Mobile Logo Fix**
  - Logo container has clean white/semi-transparent background
  - No visual glitch on mobile

- ✅ **CTA Button Updates**
  - "I Wanna Feel Good Too" CTA button
  - "One Conversation Can Change Your Day" hero button
  - "Help Me Feel Better" hero button

### UI/UX Fixes
- ✅ Orange top banner: "Hey! Wanna try our FREE Self-Help Tools?"
- ✅ "Resources" in navbar
- ✅ White box bug in hero - FIXED
- ✅ Chatbot and WhatsApp buttons redesigned (cleaner)
- ✅ "Building Confidence" now goes to /team (not mood swings modal)
- ✅ All category buttons go to /team page
- ✅ Prakhar Tiwari = "Counselling Psychologist"

### Therapist Profiles
- **Prakhar Tiwari** - Counselling Psychologist, APA Member
  - ₹999/45min, ₹1249/60min
- **Sonali Mishra** - Licensed Therapist
  - ₹1499/45min, ₹1899/60min

### Twilio WhatsApp Integration
- ✅ Credentials configured
- ✅ Welcome message on contact
- ✅ Booking confirmation
- ✅ Session reminder (1 hour before)
- ✅ Post-session follow-up
- ✅ Next-day wellness check-in
- ✅ Morning/Afternoon/Evening messages
- **API Endpoints:**
  - POST /api/whatsapp/send
  - POST /api/whatsapp/webhook

### Emotional Operating System (4 Modules)
1. Self-Worth Reset (4-week journey)
2. Internal Clarity Engine
3. Confidence Builder
4. Anti-Comparison Tracker

### AI Chatbot "Aasha"
- OpenAI GPT-4o-mini powered (via Emergent LLM Key)
- Compassionate mental health support
- Session-based conversation history
- Crisis resource provision (Tele MANAS: 14416)

## How to Access Admin Panel

### Admin Login
1. Go to: **https://emotional-os-8.preview.emergentagent.com/admin/login**
2. Login with:
   - Email: `admin@aashwashan.com`
   - Password: `Admin123!`

### Admin Dashboard Features
- View site statistics
- Manage users
- **Add/Edit/Delete Blog Posts**
- View bookings

### Adding a Blog Post
1. Login to Admin Panel
2. Click on "Manage Blogs"
3. Click "Create New Post"
4. Fill in:
   - Title
   - Content (supports markdown)
   - Category
   - Featured Image URL
5. Click "Publish"
6. Share the blog link: `https://emotional-os-8.preview.emergentagent.com/blog/[slug]`

## Technical Stack
- Frontend: React + TailwindCSS + Shadcn/UI
- Backend: FastAPI + Supabase PostgreSQL + MongoDB
- AI: OpenAI GPT-4o-mini (via Emergent LLM Key)
- WhatsApp: Twilio API

## Credentials
- **Admin**: admin@aashwashan.com / Admin123!
- **Therapist**: therapist@aashwashan.com / Therapist123!

## WhatsApp Configuration
- Account SID: ACfb3b1022092c7e978b18c84ece6e8f70
- WhatsApp Number: +14155238886 (Twilio Sandbox)
- Users must first message the sandbox to opt-in

## Remaining Tasks (Prioritized)

### P0 - Critical
1. **AI Daily Patient Messaging System**
   - Scheduled wellness messages at 8 AM, afternoon, 5 PM
   - Requires APScheduler or similar cron job system
   - Personalized based on user profession/preferences

### P1 - Important
2. **Therapist Calendar System**
   - Therapist login to set availability
   - User-facing availability display in booking
   
3. **Light Color Theme Implementation**
   - Shift to lighter palette (Amaha/Glass Onion inspired)
   - Retain orange accents

### P2 - Nice to Have
4. **Patient-Therapist Messaging**
   - In-app secure messaging post-booking

### P3 - Future/Backlog
5. Email Notifications (SendGrid/Resend)
6. Google Analytics Integration
7. Razorpay Payment Integration (currently using UPI mock)

## Last Updated
December 2025 - Iteration 9 completed
