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

### Latest Updates (December 2025 - Iteration 10)
- ✅ **Tagline Change**: "Mental Health for ALL" → "You're Not Alone Anymore"
- ✅ **Hero Button**: "One Conversation Can Change Your Day" → "Just talk. No pressure."
- ✅ **Mobile White Box Fix**: Decorative wave hidden on mobile (`hidden md:block`)
- ✅ **Chatbot Icon Redesign**: New heart-based icon with orange/teal gradient (not alien-looking)
- ✅ **Empathetic Chatbot System**: 
  - Validates feelings first
  - Asks gentle follow-up questions
  - Warm, conversational tone for 18-30 age group
  - Knows when to suggest professional help
  - Crisis protocol for self-harm mentions (Tele MANAS: 14416)
- ✅ **Quick Actions Updated**: "I'm feeling low", "Just need to vent", "Feeling anxious", "Can't sleep well"
- ✅ **Twilio Credentials Removed**: Empty in .env for safe GitHub push

### Previous Updates
- ✅ Booking Modal Redesign (human-made feel)
- ✅ Orange accent colors throughout
- ✅ Trust indicators on hero
- ✅ Self-Assessment page
- ✅ Emotional Operating System (EOS) page with 4 modules

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

### AI Chatbot "Aasha"
- OpenAI GPT-4o-mini powered (via Emergent LLM Key)
- Deeply empathetic for 18-30 age group
- Heart-based icon design
- Quick action buttons for common feelings
- Knows when to suggest seeing a therapist
- Crisis resource provision (Tele MANAS: 14416)

## How to Access Admin Panel

### Admin Login
1. Go to: **https://[your-domain]/admin/login**
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
2. Click on "Blogs" tab
3. Click "Create New Post"
4. Fill in: Title, Content, Excerpt, Category, Featured Image URL
5. Toggle "Publish" to make it live
6. Click "Save"

## Technical Stack
- Frontend: React + TailwindCSS + Shadcn/UI
- Backend: FastAPI + Supabase PostgreSQL + MongoDB
- AI: OpenAI GPT-4o-mini (via Emergent LLM Key)
- WhatsApp: Twilio API (credentials to be configured)

## Credentials
- **Admin**: admin@aashwashan.com / Admin123!
- **Therapist**: therapist@aashwashan.com / Therapist123!

## Therapist Pricing (Consistent Across Site)
- **Prakhar Tiwari** (Counselling Psychologist): ₹999/45min, ₹1249/60min
- **Sonali Mishra** (Licensed Therapist): ₹1499/45min

## WhatsApp Configuration
**Credentials are empty in .env - user needs to add their own:**
```
TWILIO_ACCOUNT_SID=
TWILIO_AUTH_TOKEN=
TWILIO_WHATSAPP_NUMBER=
```

## Remaining Tasks (Prioritized)

### P0 - Critical
1. **Twilio Configuration** - User needs to add their own Twilio credentials
2. **AI Daily Patient Messaging System** - Scheduled wellness messages (requires Twilio)

### P1 - Important
3. **Therapist Calendar System** - Therapist login to set availability
4. **Light Color Theme** - Shift to lighter palette (Amaha/Glass Onion inspired)

### P2 - Nice to Have
5. **Patient-Therapist Messaging** - In-app secure messaging

### P3 - Future/Backlog
6. Email Notifications (SendGrid/Resend)
7. Google Analytics Integration
8. Razorpay Payment Integration

## Known Issues Fixed
- ✅ Mobile white box glitch - FIXED (wave hidden on mobile)
- ✅ Chatbot alien icon - FIXED (new heart design)
- ✅ Generic chatbot responses - FIXED (empathetic system prompt)
- ✅ Twilio credentials in repo - FIXED (emptied)

## Last Updated
December 2025 - Iteration 10 completed
