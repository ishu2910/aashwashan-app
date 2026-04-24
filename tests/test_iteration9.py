"""
Iteration 9 Tests for Aashwashan Mental Health Platform
Tests the features specified in the review request:
- WhatsApp API endpoints
- Chatbot API endpoints
- API health checks
"""

import pytest
import requests
import os

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', 'https://emotional-os-9.preview.emergentagent.com')


class TestAPIHealth:
    """Basic API health tests"""
    
    def test_api_root(self):
        """Test API root endpoint"""
        response = requests.get(f"{BASE_URL}/api/")
        assert response.status_code == 200
        data = response.json()
        assert "message" in data
        assert "Aashwashan API" in data["message"]
        print(f"API Root: {data}")


class TestChatbotAPI:
    """AI Chatbot 'Aasha' API tests"""
    
    def test_create_new_session(self):
        """Test creating a new chat session"""
        response = requests.post(f"{BASE_URL}/api/chatbot/new-session")
        assert response.status_code == 200
        data = response.json()
        assert "session_id" in data
        assert len(data["session_id"]) > 0
        print(f"New Session ID: {data['session_id']}")
        return data["session_id"]
    
    def test_chat_with_bot(self):
        """Test chatting with Aasha bot"""
        # First create a session
        session_response = requests.post(f"{BASE_URL}/api/chatbot/new-session")
        session_id = session_response.json()["session_id"]
        
        # Now send a message
        chat_payload = {
            "message": "I'm feeling anxious today",
            "session_id": session_id
        }
        response = requests.post(
            f"{BASE_URL}/api/chatbot/chat",
            json=chat_payload,
            headers={"Content-Type": "application/json"}
        )
        assert response.status_code == 200
        data = response.json()
        assert "response" in data
        assert "session_id" in data
        assert len(data["response"]) > 0
        print(f"Chatbot Response: {data['response'][:100]}...")
    
    def test_chat_with_self_help_query(self):
        """Test chatbot with self-help tips query"""
        session_response = requests.post(f"{BASE_URL}/api/chatbot/new-session")
        session_id = session_response.json()["session_id"]
        
        chat_payload = {
            "message": "Can you share some self-help tips?",
            "session_id": session_id
        }
        response = requests.post(
            f"{BASE_URL}/api/chatbot/chat",
            json=chat_payload,
            headers={"Content-Type": "application/json"}
        )
        assert response.status_code == 200
        data = response.json()
        assert "response" in data
        print(f"Self-help tips response: {data['response'][:100]}...")


class TestWhatsAppAPI:
    """WhatsApp integration API tests"""
    
    def test_send_welcome_message(self):
        """Test sending WhatsApp welcome message"""
        payload = {
            "to_phone": "+919876543210",
            "message_type": "welcome",
            "user_name": "Test User"
        }
        response = requests.post(
            f"{BASE_URL}/api/whatsapp/send",
            json=payload,
            headers={"Content-Type": "application/json"}
        )
        assert response.status_code == 200
        data = response.json()
        assert "success" in data
        # Check if message was queued (Twilio returns success=true and status=queued)
        if data.get("success"):
            assert data.get("status") in ["queued", "sent"]
            print(f"WhatsApp welcome message: {data}")
        else:
            print(f"WhatsApp error: {data}")
    
    def test_send_booking_confirmation(self):
        """Test sending WhatsApp booking confirmation"""
        payload = {
            "to_phone": "+919876543210",
            "message_type": "booking",
            "user_name": "Test Patient",
            "therapist_name": "Prakhar Tiwari",
            "date": "2026-02-01",
            "time": "10:00 AM",
            "duration": "45 minutes",
            "meeting_link": "https://meet.jit.si/test-session"
        }
        response = requests.post(
            f"{BASE_URL}/api/whatsapp/send",
            json=payload,
            headers={"Content-Type": "application/json"}
        )
        assert response.status_code == 200
        data = response.json()
        print(f"WhatsApp booking confirmation: {data}")
    
    def test_send_session_reminder(self):
        """Test sending WhatsApp session reminder"""
        payload = {
            "to_phone": "+919876543210",
            "message_type": "reminder",
            "user_name": "Test User",
            "therapist_name": "Sonali Mishra",
            "time": "2:00 PM",
            "meeting_link": "https://meet.jit.si/test-session"
        }
        response = requests.post(
            f"{BASE_URL}/api/whatsapp/send",
            json=payload,
            headers={"Content-Type": "application/json"}
        )
        assert response.status_code == 200
        data = response.json()
        print(f"WhatsApp reminder: {data}")
    
    def test_send_morning_motivation(self):
        """Test sending WhatsApp morning motivation"""
        payload = {
            "to_phone": "+919876543210",
            "message_type": "morning",
            "user_name": "Test User",
            "profession": "working professional"
        }
        response = requests.post(
            f"{BASE_URL}/api/whatsapp/send",
            json=payload,
            headers={"Content-Type": "application/json"}
        )
        assert response.status_code == 200
        data = response.json()
        print(f"WhatsApp morning motivation: {data}")


class TestAppointmentsAPI:
    """Appointments CRUD tests"""
    
    def test_create_appointment(self):
        """Test creating an appointment"""
        payload = {
            "name": "TEST_User",
            "email": "test@example.com",
            "phone": "+919876543210",
            "service": "45 minutes",
            "date": "2026-02-01",
            "time": "10:00",
            "message": "Test appointment"
        }
        response = requests.post(
            f"{BASE_URL}/api/appointments",
            json=payload,
            headers={"Content-Type": "application/json"}
        )
        assert response.status_code == 200
        data = response.json()
        assert "id" in data
        assert data["name"] == "TEST_User"
        print(f"Created appointment: {data['id']}")
    
    def test_get_appointments(self):
        """Test fetching appointments list"""
        response = requests.get(f"{BASE_URL}/api/appointments")
        assert response.status_code == 200
        data = response.json()
        assert isinstance(data, list)
        print(f"Found {len(data)} appointments")


class TestContactAPI:
    """Contact form API tests"""
    
    def test_submit_contact(self):
        """Test contact form submission"""
        payload = {
            "name": "TEST_Contact",
            "email": "contact@example.com",
            "phone": "+919876543210",
            "subject": "Test inquiry",
            "message": "This is a test message"
        }
        response = requests.post(
            f"{BASE_URL}/api/contact",
            json=payload,
            headers={"Content-Type": "application/json"}
        )
        assert response.status_code == 200
        data = response.json()
        assert "id" in data or "message" in data
        print(f"Contact submission: {data}")


class TestTherapistsAPI:
    """Public therapists API tests"""
    
    def test_get_therapists(self):
        """Test fetching public therapists list"""
        response = requests.get(f"{BASE_URL}/api/therapists")
        assert response.status_code == 200
        data = response.json()
        assert isinstance(data, list)
        print(f"Found {len(data)} therapists")


if __name__ == "__main__":
    pytest.main([__file__, "-v", "--tb=short"])
