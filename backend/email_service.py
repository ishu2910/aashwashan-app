import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from typing import Dict
import logging

logger = logging.getLogger(__name__)

ADMIN_EMAIL = "ishangoel001@gmail.com"

def send_appointment_email(appointment_data: Dict) -> bool:
    """
    Send appointment notification emails to admin, patient, and doctor
    """
    try:
        # Create email content
        subject = f"New Appointment Request - {appointment_data['name']}"
        
        # Admin email body
        admin_body = f"""
        <html>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
            <h2 style="color: #2563eb;">New Appointment Request</h2>
            <p>A new appointment has been requested through the Aashwashan website.</p>
            
            <h3>Patient Information:</h3>
            <ul>
                <li><strong>Name:</strong> {appointment_data['name']}</li>
                <li><strong>Email:</strong> {appointment_data['email']}</li>
                <li><strong>Phone:</strong> {appointment_data['phone']}</li>
            </ul>
            
            <h3>Appointment Details:</h3>
            <ul>
                <li><strong>Service:</strong> {appointment_data['service']}</li>
                <li><strong>Date:</strong> {appointment_data['date']}</li>
                <li><strong>Time:</strong> {appointment_data['time']}</li>
            </ul>
            
            {f"<h3>Additional Information:</h3><p>{appointment_data['message']}</p>" if appointment_data.get('message') else ""}
            
            <p style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ccc; color: #666;">
                This is an automated message from Aashwashan Mental Health Services.
            </p>
        </body>
        </html>
        """
        
        # Patient confirmation email body
        patient_body = f"""
        <html>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
            <h2 style="color: #2563eb;">Appointment Request Received</h2>
            <p>Dear {appointment_data['name']},</p>
            
            <p>Thank you for requesting an appointment with Aashwashan Mental Health Services. We have received your request and will contact you within 24 hours to confirm your appointment.</p>
            
            <h3>Your Appointment Details:</h3>
            <ul>
                <li><strong>Service:</strong> {appointment_data['service']}</li>
                <li><strong>Preferred Date:</strong> {appointment_data['date']}</li>
                <li><strong>Preferred Time:</strong> {appointment_data['time']}</li>
            </ul>
            
            <p>If you have any questions or need to make changes to your request, please contact us at:</p>
            <ul>
                <li><strong>Email:</strong> info@aashwashan.com</li>
                <li><strong>Phone:</strong> (555) 123-4567</li>
            </ul>
            
            <p><strong>Important:</strong> If you're experiencing a mental health emergency, please call 988 (Crisis Hotline) or 911 immediately.</p>
            
            <p style="margin-top: 30px;">
                Best regards,<br>
                <strong>Aashwashan Mental Health Services</strong><br>
                123 Serenity Lane, Blissfield, CA 90210
            </p>
            
            <p style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ccc; color: #666; font-size: 12px;">
                This is an automated message from Aashwashan Mental Health Services.
            </p>
        </body>
        </html>
        """
        
        # Log the email (since we don't have SMTP configured)
        logger.info(f"Appointment email would be sent to: {ADMIN_EMAIL}")
        logger.info(f"Patient confirmation email would be sent to: {appointment_data['email']}")
        logger.info(f"Appointment Details: {appointment_data}")
        
        # In production, you would configure SMTP here:
        # smtp_server = "smtp.gmail.com"
        # smtp_port = 587
        # sender_email = "your-email@gmail.com"
        # sender_password = "your-app-password"
        
        # msg_admin = MIMEMultipart('alternative')
        # msg_admin['Subject'] = subject
        # msg_admin['From'] = sender_email
        # msg_admin['To'] = ADMIN_EMAIL
        # msg_admin.attach(MIMEText(admin_body, 'html'))
        
        # msg_patient = MIMEMultipart('alternative')
        # msg_patient['Subject'] = "Appointment Request Confirmed"
        # msg_patient['From'] = sender_email
        # msg_patient['To'] = appointment_data['email']
        # msg_patient.attach(MIMEText(patient_body, 'html'))
        
        # with smtplib.SMTP(smtp_server, smtp_port) as server:
        #     server.starttls()
        #     server.login(sender_email, sender_password)
        #     server.send_message(msg_admin)
        #     server.send_message(msg_patient)
        
        return True
        
    except Exception as e:
        logger.error(f"Error sending appointment email: {str(e)}")
        return False


def send_contact_email(contact_data: Dict) -> bool:
    """
    Send contact form submission to admin
    """
    try:
        subject = f"Contact Form Submission - {contact_data['name']}"
        
        body = f"""
        <html>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
            <h2 style="color: #2563eb;">New Contact Form Submission</h2>
            
            <h3>Contact Information:</h3>
            <ul>
                <li><strong>Name:</strong> {contact_data['name']}</li>
                <li><strong>Email:</strong> {contact_data['email']}</li>
                <li><strong>Phone:</strong> {contact_data.get('phone', 'Not provided')}</li>
                <li><strong>Subject:</strong> {contact_data['subject']}</li>
            </ul>
            
            <h3>Message:</h3>
            <p style="background-color: #f5f5f5; padding: 15px; border-left: 4px solid #2563eb;">
                {contact_data['message']}
            </p>
            
            <p style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ccc; color: #666;">
                This is an automated message from Aashwashan Mental Health Services website.
            </p>
        </body>
        </html>
        """
        
        logger.info(f"Contact form email would be sent to: {ADMIN_EMAIL}")
        logger.info(f"Contact Details: {contact_data}")
        
        return True
        
    except Exception as e:
        logger.error(f"Error sending contact email: {str(e)}")
        return False
