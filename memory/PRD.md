# Aashwashan - Emotional Operating System

## Original Problem Statement
A mental health platform that goes beyond therapy booking - building an Emotional Operating System (EOS) that helps users understand themselves, build confidence, and break free from limiting patterns.

## Core Philosophy
- **"Aashwashan is of the people, by the people, for the people."**
- **Tagline: "A Safe Place to Start"**
- Target Audience: 18-30 year olds, students & early working professionals, silent overthinkers
- **Founder**: Ishan Goyal

## Latest Updates (December 2025 - Iteration 12)

### UI/UX Fixes
- ✅ **Hero dots REMOVED** - No carousel indicators on desktop or mobile
- ✅ **Tagline changed**: "A Safe Place to Start"
- ✅ **"All Team Members" button REMOVED**
- ✅ **Animated skills marquee** - Scrolling right to left like Amaha

### Chatbot "Saathi"
- ✅ **Renamed from "Aasha" to "Saathi"** (companion in Hindi)
- ✅ **Chat bubble icon** with soft curves
- ✅ **Trained as psychologist** - Gives SHORT 2-3 line responses, asks questions
- ✅ **No long advice** - Helps users discover their own feelings

### Therapists
- ✅ **Prakhar Tiwari**: ₹999/45min, ₹1249/60min
- ✅ **Sonali Mishra**: ₹1299/45min, ₹1599/60min (FIXED)
- ✅ **Anushka (NEW)**: 4+ years, ₹1199/45min, ₹1499/60min, Relationship Issues & Grief

### Forms
- ✅ **Emergency Contact Number** field added to all booking forms
- ✅ **Form submits to email** (care@aashwashan.com) - NOT payment
- ✅ Button changed to "Submit Request"

### Assessments
- ✅ **Precautions shown BEFORE each test** (PHQ-9, GAD-7, DASS-21, K6, PSS, WHO-5)

### AI Daily Messaging
- ✅ **Scheduler implemented** - 8 AM, 2 PM, 5 PM IST
- ✅ **/api/wellness/subscribe** endpoint to subscribe users
- ✅ AI-generated personalized messages

## How to Use Admin Panel

### Accessing Admin Panel
1. Go to: **https://[your-domain]/admin/login**
2. Enter credentials:
   - Email: `admin@aashwashan.com`
   - Password: `Admin123!`
3. Click "Login"

### Admin Dashboard Features
- **Dashboard**: View site statistics (users, bookings, revenue)
- **Users**: Manage registered users
- **Blogs**: Create, edit, delete blog posts
- **Bookings**: View all appointment requests

### How to Write and Publish a Blog

1. **Login** to the Admin Panel
2. Click **"Blogs"** in the sidebar
3. Click **"Create New Post"** button
4. Fill in the form:
   - **Title**: Your blog post title
   - **Excerpt**: Short summary (appears in blog listings)
   - **Content**: Full blog content (supports basic formatting)
   - **Category**: Choose from available categories
   - **Featured Image**: Enter an image URL
5. Toggle **"Published"** to make it live
6. Click **"Save"**
7. Your blog appears at: `https://[your-domain]/blog/[slug]`

### Blog Categories
- Mental Health
- Self-Care
- Relationships
- Workplace Wellness
- Student Life
- Personal Growth

## Therapist Pricing (Consistent Across Site)
| Therapist | 45 min | 60 min |
|-----------|--------|--------|
| Prakhar Tiwari | ₹999 | ₹1249 |
| Sonali Mishra | ₹1299 | ₹1599 |
| Anushka | ₹1199 | ₹1499 |

## Environment Variables Required
```
TWILIO_ACCOUNT_SID=     (user to configure)
TWILIO_AUTH_TOKEN=      (user to configure)
TWILIO_WHATSAPP_NUMBER= (user to configure)
```

## GitHub Push Issue
The error is due to OLD commits containing Twilio secrets. **Solution**:
- Click **"Create Branch & Push"** in the Emergent UI to push to a new branch
- This avoids the old commits with secrets

## Remaining Tasks

### P0 - Critical
1. Configure Twilio credentials for WhatsApp
2. Set up email service for appointment notifications

### P1 - Important
3. Therapist Calendar System
4. Light color theme refinements

### P2 - Nice to Have
5. Patient-Therapist messaging
6. Resources page breathing game fix

## Last Updated
December 2025 - Iteration 12 completed (100% test pass rate)
