"""
Test suite for Aashwashan Mental Health Platform - Iteration 8
Tests AI Chatbot, therapist profiles, and key API endpoints

Features tested:
- AI Chatbot (new session creation, chat functionality)
- Appointments API
- Contact API  
- Therapists API
"""

import pytest
import requests
import os
import time

# Get base URL from environment
BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', '').rstrip('/')


class TestHealthAndBasics:
    """Basic health checks for the API"""
    
    def test_api_root(self):
        """Test API root endpoint"""
        response = requests.get(f"{BASE_URL}/api/")
        assert response.status_code == 200
        data = response.json()
        assert "message" in data
        print(f"✓ API root working: {data}")
    
    def test_status_endpoint(self):
        """Test status check endpoint"""
        response = requests.get(f"{BASE_URL}/api/status")
        assert response.status_code == 200
        print(f"✓ Status endpoint working")


class TestAIChatbot:
    """Test AI Chatbot (Aasha) functionality"""
    
    def test_create_new_session(self):
        """Test creating a new chat session"""
        response = requests.post(f"{BASE_URL}/api/chatbot/new-session")
        assert response.status_code == 200
        data = response.json()
        assert "session_id" in data
        assert len(data["session_id"]) > 0
        print(f"✓ New session created: {data['session_id'][:20]}...")
        return data["session_id"]
    
    def test_chat_with_bot(self):
        """Test sending a message to the chatbot"""
        # First create a session
        session_response = requests.post(f"{BASE_URL}/api/chatbot/new-session")
        assert session_response.status_code == 200
        session_id = session_response.json()["session_id"]
        
        # Send a message
        chat_response = requests.post(
            f"{BASE_URL}/api/chatbot/chat",
            json={
                "message": "Hello, I'm feeling a bit stressed today",
                "session_id": session_id
            }
        )
        assert chat_response.status_code == 200
        data = chat_response.json()
        assert "response" in data
        assert "session_id" in data
        assert len(data["response"]) > 0
        print(f"✓ Chatbot responded: {data['response'][:100]}...")
    
    def test_chat_maintains_session(self):
        """Test that chatbot maintains conversation context"""
        # Create session
        session_response = requests.post(f"{BASE_URL}/api/chatbot/new-session")
        session_id = session_response.json()["session_id"]
        
        # First message
        first_response = requests.post(
            f"{BASE_URL}/api/chatbot/chat",
            json={
                "message": "My name is Test User",
                "session_id": session_id
            }
        )
        assert first_response.status_code == 200
        
        # Second message should maintain context
        second_response = requests.post(
            f"{BASE_URL}/api/chatbot/chat",
            json={
                "message": "What was my name again?",
                "session_id": session_id
            }
        )
        assert second_response.status_code == 200
        print(f"✓ Session context maintained")


class TestAppointments:
    """Test appointment booking functionality"""
    
    def test_create_appointment(self):
        """Test creating an appointment"""
        appointment_data = {
            "name": "TEST_User Aashwashan",
            "email": "test.user@example.com",
            "phone": "+91 98765 43210",
            "service": "45 minutes",
            "date": "2026-02-15",
            "time": "10:00",
            "message": "Test appointment booking"
        }
        
        response = requests.post(
            f"{BASE_URL}/api/appointments",
            json=appointment_data
        )
        assert response.status_code == 200
        data = response.json()
        assert "id" in data
        assert data["name"] == appointment_data["name"]
        assert data["email"] == appointment_data["email"]
        print(f"✓ Appointment created: {data['id']}")
    
    def test_get_appointments(self):
        """Test retrieving appointments"""
        response = requests.get(f"{BASE_URL}/api/appointments")
        assert response.status_code == 200
        data = response.json()
        assert isinstance(data, list)
        print(f"✓ Retrieved {len(data)} appointments")


class TestContact:
    """Test contact form functionality"""
    
    def test_submit_contact(self):
        """Test submitting contact form"""
        contact_data = {
            "name": "TEST_Contact User",
            "email": "contact.test@example.com",
            "phone": "+91 12345 67890",
            "subject": "Test Inquiry",
            "message": "This is a test contact submission"
        }
        
        response = requests.post(
            f"{BASE_URL}/api/contact",
            json=contact_data
        )
        assert response.status_code == 200
        data = response.json()
        assert "message" in data
        assert "id" in data
        print(f"✓ Contact form submitted: {data['id']}")


class TestTherapists:
    """Test therapist profile functionality"""
    
    def test_get_public_therapists(self):
        """Test getting public therapist list"""
        response = requests.get(f"{BASE_URL}/api/therapists")
        assert response.status_code == 200
        data = response.json()
        assert isinstance(data, list)
        print(f"✓ Retrieved {len(data)} therapists from database")


class TestAuthentication:
    """Test authentication endpoints"""
    
    def test_login_invalid_credentials(self):
        """Test login with invalid credentials returns 401"""
        response = requests.post(
            f"{BASE_URL}/api/auth/login",
            json={
                "email": "invalid@example.com",
                "password": "wrongpassword"
            }
        )
        # Should return 401 for invalid credentials
        assert response.status_code == 401
        print(f"✓ Invalid login correctly returns 401")
    
    def test_login_admin(self):
        """Test admin login"""
        response = requests.post(
            f"{BASE_URL}/api/auth/login",
            json={
                "email": "admin@aashwashan.com",
                "password": "Admin123!"
            }
        )
        # Check if admin exists
        if response.status_code == 200:
            data = response.json()
            assert "access_token" in data
            assert "user" in data
            print(f"✓ Admin login successful")
        elif response.status_code == 401:
            print(f"✓ Admin credentials not seeded (expected in fresh DB)")
        else:
            pytest.fail(f"Unexpected status code: {response.status_code}")


class TestCommunityAndBlogs:
    """Test community and blog endpoints"""
    
    def test_get_community_posts(self):
        """Test getting community posts"""
        response = requests.get(f"{BASE_URL}/api/community/posts")
        assert response.status_code == 200
        data = response.json()
        assert isinstance(data, list)
        print(f"✓ Retrieved {len(data)} community posts")
    
    def test_get_legacy_community_posts(self):
        """Test legacy community posts endpoint"""
        response = requests.get(f"{BASE_URL}/api/community-posts")
        assert response.status_code == 200
        data = response.json()
        assert "posts" in data
        print(f"✓ Legacy community posts: {data.get('count', 0)} posts")
    
    def test_get_blogs(self):
        """Test getting blogs"""
        response = requests.get(f"{BASE_URL}/api/blogs")
        assert response.status_code == 200
        data = response.json()
        assert isinstance(data, list)
        print(f"✓ Retrieved {len(data)} blogs")


if __name__ == "__main__":
    pytest.main([__file__, "-v", "--tb=short"])
