# Aashwashan - Emotional Operating System

## Original Problem Statement
A mental health platform that goes beyond therapy booking - building an Emotional Operating System (EOS) that helps users understand themselves, build confidence, and break free from limiting patterns. The vision: Be better than WYSA. Sell the experience, not the therapy.

## Core Philosophy
- **"Aashwashan is of the people, by the people, for the people."**
- Only 1% of people actively work on emotional growth. Be part of the difference makers.
- We don't sell sessions. We build emotional intelligence.

## User Personas
1. **Individuals seeking emotional growth** - Use self-help tools, take assessments, chat with AI
2. **Patients needing therapy** - Book sessions, receive daily AI check-ins via WhatsApp
3. **Therapists** - Prakhar Tiwari, Sonali Mishra
4. **Administrators** - Ishan Goyal (Founder)

## Core Features

### ✅ Completed

#### Emotional Operating System (EOS) - 4 Modules
1. **Self-Worth Reset** (4-Week Journey)
   - Week 1: Identify self-talk patterns
   - Week 2: Separate identity from achievement
   - Week 3: Strength mapping
   - Week 4: Self-validation habits
   - AI prompts: "When do you feel 'not enough'?", "Whose standard are you measuring against?"

2. **Internal Clarity Engine** (Values Discovery)
   - Guided reflections: What actually matters to you? What feels aligned vs impressive?
   - AI analyzes responses to reveal core values pattern

3. **Confidence Builder** (Evidence-Based)
   - Principle: "Confidence = Evidence, Not Affirmation"
   - Micro-actions: Small discomfort challenge, Decision journal, Daily win log

4. **Anti-Comparison Tracker**
   - Daily check-in: "Did you compare yourself today?"
   - Follow-up: Who? Why? What did it trigger?
   - AI reframe: "Comparison detected. Is this your goal or theirs?"
   - Stats: "Only 1% actively work on breaking comparison habits"

#### Therapist Profiles (Updated)
- **Prakhar Tiwari** - Clinical Psychologist
  - Skills: Empathy, Grief, Active Listening, Career Problems (colorful tags)
  - Experience: 1+ years
  - Member, American Psychological Association (APA)
  - Pricing: ₹999/45min, ₹1249/60min

- **Sonali Mishra** - Licensed Therapist
  - Skills: Stress Management, Relationship Issues, Self-Esteem, Anxiety
  - Experience: 3+ years
  - Pricing: ₹1499/45min only

- **Shweta Bramhankar**: REMOVED

#### UI/UX Improvements
- White box bug in hero section: FIXED
- Navbar logo reflection: FIXED (rounded container)
- "Resources" → "Self-Help Tools" in navbar
- Colorful skill tags on therapist cards
- Orange accent sections throughout for scrolling engagement
- "We Are Human" section: White background with colored text
- Tagline displayed prominently
- Quote attribution: "Ishan Goyal, Founder"

#### AI Chatbot "Aasha"
- OpenAI GPT-4o-mini powered
- Compassionate mental health support
- Crisis detection with Tele MANAS reference

#### Self-Assessment Tools
- 6 validated scales (PHQ-9, GAD-7, DASS-21, K6, PSS, WHO-5)
- Credits shown only AFTER completing assessment
- Legal disclaimer visible on main page

### 🔄 In Progress / Upcoming

#### P0 - High Priority
1. **WhatsApp Daily Messaging System**
   - Morning (8 AM): "You have to do good today" + personalized based on profession
   - Afternoon: "What steps did you take today?"
   - Evening (5 PM): Check-in on therapist recommendations
   - Only for users who provide phone number
   - Uses patient name + therapist recommendations

2. **Therapist Calendar System** - Availability management dashboard

#### P1 - Medium Priority
3. **Patient-Therapist Messaging** - Secure in-app messaging

#### P2 - Lower Priority
4. **Email Notifications** - SendGrid/Resend configuration

### 🚫 Deferred
- Razorpay Payments (post-launch)

## Technical Architecture

### Backend (FastAPI)
- Database: Supabase PostgreSQL + MongoDB (legacy)
- AI: OpenAI GPT-4o-mini via Emergent LLM Key
- Authentication: JWT with role-based access

### Frontend (React)
- TailwindCSS with teal/cyan/orange theme
- Fonts: Playfair Display (headings), DM Sans (body)
- Routes: /eos, /self-assessment, /team, /community, /blog

### Key Routes
| Route | Page |
|-------|------|
| `/` | Homepage |
| `/eos` or `/resources` | Emotional Operating System (4 modules) |
| `/self-assessment` | Clinical assessments |
| `/team` | Therapist profiles |
| `/community` | User forum |
| `/admin/dashboard` | Admin panel |

## Credentials
- Admin: admin@aashwashan.com / Admin123!
- Therapist: therapist@aashwashan.com / Therapist123!

## Founder
**Ishan Goyal** - Building an Emotional Operating System for the 1% who want to make a difference.

## Last Updated
December 2025
