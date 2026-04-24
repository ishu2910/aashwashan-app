"""
WhatsApp Service for Aashwashan
Handles all WhatsApp messaging via Twilio API
"""

import os
import logging
from dotenv import load_dotenv
from twilio.rest import Client
from twilio.base.exceptions import TwilioRestException
from datetime import datetime, timedelta
import asyncio

# Load environment variables
load_dotenv()

logger = logging.getLogger(__name__)

class WhatsAppService:
    def __init__(self):
        self.account_sid = os.environ.get('TWILIO_ACCOUNT_SID')
        self.auth_token = os.environ.get('TWILIO_AUTH_TOKEN')
        self.from_number = os.environ.get('TWILIO_WHATSAPP_NUMBER', 'whatsapp:+14155238886')
        
        if self.account_sid and self.auth_token:
            self.client = Client(self.account_sid, self.auth_token)
            logger.info("WhatsApp service initialized successfully")
        else:
            self.client = None
            logger.warning("WhatsApp service not configured - missing credentials")
    
    def format_phone(self, phone: str) -> str:
        """Format phone number for WhatsApp"""
        # Remove any existing whatsapp: prefix
        phone = phone.replace('whatsapp:', '').strip()
        
        # Remove spaces, dashes, etc.
        phone = ''.join(filter(str.isdigit, phone))
        
        # Add India country code if not present
        if len(phone) == 10:
            phone = '91' + phone
        elif not phone.startswith('91') and len(phone) == 12:
            pass  # Already has country code
        
        return f'whatsapp:+{phone}'
    
    def send_message(self, to_phone: str, message: str) -> dict:
        """Send WhatsApp message"""
        if not self.client:
            logger.error("WhatsApp client not initialized")
            return {"success": False, "error": "WhatsApp not configured"}
        
        try:
            to_formatted = self.format_phone(to_phone)
            
            msg = self.client.messages.create(
                body=message,
                from_=self.from_number,
                to=to_formatted
            )
            
            logger.info(f"WhatsApp message sent to {to_formatted}: {msg.sid}")
            return {
                "success": True,
                "message_sid": msg.sid,
                "status": msg.status
            }
        except TwilioRestException as e:
            logger.error(f"Twilio error sending WhatsApp: {str(e)}")
            return {"success": False, "error": str(e)}
        except Exception as e:
            logger.error(f"Error sending WhatsApp: {str(e)}")
            return {"success": False, "error": str(e)}
    
    # ==================== MESSAGE TEMPLATES ====================
    
    def send_welcome_message(self, to_phone: str, user_name: str = "there") -> dict:
        """Send welcome message when user contacts us"""
        message = f"""🌟 *Welcome to Aashwashan!*

Hi {user_name}! 

We're so glad you reached out. At Aashwashan, we believe in you — not just as someone seeking help, but as someone with incredible potential for growth.

*"Aashwashan is of the people, by the people, for the people."*

How can we support you today?
• Take a free self-assessment
• Book a session with our therapists
• Explore our self-help tools

Reply with what's on your mind, and we'll guide you. 💚

— Team Aashwashan"""
        
        return self.send_message(to_phone, message)
    
    def send_booking_confirmation(self, to_phone: str, user_name: str, therapist_name: str, 
                                   date: str, time: str, duration: str, meeting_link: str = None) -> dict:
        """Send booking confirmation message"""
        message = f"""✅ *Booking Confirmed!*

Hi {user_name},

Your therapy session is booked! 🎉

📋 *Session Details:*
• Therapist: {therapist_name}
• Date: {date}
• Time: {time}
• Duration: {duration}

"""
        if meeting_link:
            message += f"""🔗 *Video Call Link:*
{meeting_link}

"""
        
        message += """*Before your session:*
• Find a quiet, private space
• Have water nearby
• Keep a notebook ready for reflections

We're proud of you for taking this step. Only 1% of people actively work on their mental health — you're part of that special group! 💪

— Team Aashwashan"""
        
        return self.send_message(to_phone, message)
    
    def send_session_reminder(self, to_phone: str, user_name: str, therapist_name: str, 
                              time: str, meeting_link: str = None) -> dict:
        """Send reminder 1 hour before session"""
        message = f"""⏰ *Session Reminder!*

Hi {user_name},

Your session with {therapist_name} starts in *1 hour* at {time}.

"""
        if meeting_link:
            message += f"""🔗 *Join here:*
{meeting_link}

"""
        
        message += """*Quick checklist:*
✓ Quiet space ready
✓ Good internet connection
✓ Water bottle nearby
✓ Notebook for notes

You've got this! We're rooting for you. 🌟

— Team Aashwashan"""
        
        return self.send_message(to_phone, message)
    
    def send_post_session_followup(self, to_phone: str, user_name: str, therapist_name: str) -> dict:
        """Send follow-up message after session"""
        message = f"""💚 *How Are You Feeling?*

Hi {user_name},

We hope your session with {therapist_name} went well!

Take a moment to reflect:
• What's one insight you gained today?
• What's one small step you can take this week?
• How are you feeling right now?

Remember: healing isn't linear. Some days will be harder than others, and that's okay. What matters is that you showed up for yourself today.

*"You have to do good today."* 🌅

Reply and share how you're feeling — we're here to listen.

— Team Aashwashan"""
        
        return self.send_message(to_phone, message)
    
    def send_next_day_checkin(self, to_phone: str, user_name: str, therapist_recommendations: str = None) -> dict:
        """Send next-day wellness check-in"""
        message = f"""🌅 *Good Morning, {user_name}!*

Yesterday, you took a brave step for your mental health. Today is a new opportunity to continue that journey.

*Your daily reflection:*
• What steps did you take today as discussed with your therapist?
• What's one thing you're grateful for?
• How can you be kind to yourself today?

"""
        if therapist_recommendations:
            message += f"""📝 *From your therapist:*
{therapist_recommendations}

"""
        
        message += """Remember: Only 1% of people actively work on their emotional growth. You're part of that special group.

*You have to do good today.* Let's make it count! 💪

— Team Aashwashan"""
        
        return self.send_message(to_phone, message)
    
    def send_morning_motivation(self, to_phone: str, user_name: str, profession: str = None) -> dict:
        """Send daily morning motivation (8 AM)"""
        base_message = f"""🌅 *Good Morning, {user_name}!*

*You have to do good today.*

"""
        
        # Personalize based on profession
        if profession and profession.lower() in ['working professional', 'corporate', 'office']:
            base_message += """Before you dive into work:
• Take 3 deep breaths
• Set one intention for today
• Remember: your worth isn't defined by your productivity

On your way home today, consider getting something nice for yourself or your loved ones. Small joys matter! 🎁

"""
        elif profession and profession.lower() in ['student']:
            base_message += """Before you start studying:
• Hydrate yourself
• Set a realistic goal for today
• Remember: progress over perfection

Take breaks, move your body, and be kind to yourself. You're doing great! 📚

"""
        else:
            base_message += """Start your day with:
• A moment of gratitude
• One small act of self-care
• A reminder that you matter

Today is a new opportunity to grow. Make it count! 

"""
        
        base_message += """Reply with how you're feeling today — we're here for you. 💚

— Team Aashwashan"""
        
        return self.send_message(to_phone, message=base_message)
    
    def send_afternoon_checkin(self, to_phone: str, user_name: str) -> dict:
        """Send afternoon check-in"""
        message = f"""☀️ *Afternoon Check-In*

Hi {user_name},

How's your day going so far?

*Quick reflection:*
• What steps have you taken today as prescribed by your therapist?
• Have you taken a break yet?
• Are you staying hydrated?

Remember: Small steps lead to big changes. Every positive action counts!

Reply and share your progress — we're cheering for you! 🎉

— Team Aashwashan"""
        
        return self.send_message(to_phone, message)
    
    def send_evening_reflection(self, to_phone: str, user_name: str) -> dict:
        """Send evening reflection (5 PM)"""
        message = f"""🌆 *Evening Reflection*

Hi {user_name},

As your day winds down, take a moment to reflect:

*How did your day go today?*
• What went well?
• What challenged you?
• What did you learn about yourself?

*Did you compare yourself to others today?*
If yes — that's okay. Comparison is human. But remember: their journey isn't yours. You're exactly where you need to be.

Only 1% of people take time to reflect daily. You're already ahead of 99%.

*Rest well tonight. Tomorrow is another opportunity to grow.* 🌙

— Team Aashwashan"""
        
        return self.send_message(to_phone, message)


# Create singleton instance
whatsapp_service = WhatsAppService()
