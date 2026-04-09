# Aashwashan - Emotional Operating System

## Original Problem Statement
A mental health platform that goes beyond therapy booking - building an Emotional Operating System (EOS) that helps users understand themselves, build confidence, and break free from limiting patterns.

## Core Philosophy
- **Tagline: "A Safe Place to Start"**
- Target Audience: 18-30 year olds, students & early working professionals, silent overthinkers
- **Founder**: Ishan Goyal

## Latest Updates (December 2025 - Iteration 13)

### Saathi Chatbot
- ✅ **SHORT responses** - 1-2 lines only, asks questions
- ✅ **Simple words** - No "areas", "aspects", "domains" - uses "things", "parts of your life"
- ✅ **Psychologist approach** - Helps users discover their own feelings
- ✅ **Session booking prompt** - "We can help you fix a time that works for you"

### Therapist Pricing (FIXED)
| Therapist | 45 min | 60 min |
|-----------|--------|--------|
| Prakhar Tiwari | ₹999 | ₹1249 |
| Sonali Mishra | ₹1299 | ❌ N/A |
| Anushka | ₹1199 | ❌ N/A |

### Blog Page
- ✅ **50 real articles** from March/April 2025
- ✅ **Sources**: Business Standard, Economic Times, The Hindu, Times of India, etc.
- ✅ **Search functionality**
- ✅ **Category filtering**: Research (18), Policy (10), Healthcare (12), Workplace (5), Self-Care (3), Trends (2)

### Global Animations
- ✅ fadeIn, fadeInUp, fadeInDown, fadeInLeft, fadeInRight
- ✅ slideUp, slideDown, scaleIn
- ✅ hover-lift, hover-scale, hover-glow
- ✅ Animated skills marquee

### Forms
- ✅ **Emergency Contact Number** field in all booking forms
- ✅ **"Submit Request"** button (NOT "Proceed to Payment")
- ✅ Sends to care@aashwashan.com

## How to Use Admin Panel

### Login
1. Go to: `/admin/login`
2. Email: `admin@aashwashan.com`
3. Password: `Admin123!`

### Write a Blog
1. Login to Admin Panel
2. Click "Blogs" in sidebar
3. Click "Create New Post"
4. Fill: Title, Excerpt, Content, Category, Image URL
5. Toggle "Published"
6. Click "Save"

## Technical Stack
- Frontend: React + TailwindCSS + Shadcn/UI
- Backend: FastAPI + Supabase PostgreSQL + MongoDB
- AI: OpenAI GPT-4o-mini (via Emergent LLM Key)
- WhatsApp: Twilio (user to configure)

## Testing
- **Iteration 13**: 100% pass rate (13/13 tests)
- All features verified working

## Remaining Tasks

### P1 - Important
1. Configure Twilio for WhatsApp
2. Therapist Calendar System
3. Resources page breathing game fix

### P2 - Nice to Have
4. Patient-Therapist messaging
5. Email notifications

## GitHub Push
Click **"Create Branch & Push"** in Emergent to avoid old commit secrets.

## Vercel Deployment
Make sure REACT_APP_BACKEND_URL is set to your backend API URL in Vercel environment variables.

## Last Updated
December 2025 - Iteration 13 completed (100% test pass)
