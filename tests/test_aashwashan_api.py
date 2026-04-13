"""
Aashwashan Mental Health Website - Backend API Tests
Tests for appointments, contact forms, and status endpoints
"""
import pytest
import requests
import os
from datetime import datetime, timedelta

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', '').rstrip('/')

class TestHealthEndpoints:
    """Health check and basic API tests"""
    
    def test_api_root_returns_hello_world(self):
        """Test that API root endpoint returns expected message"""
        response = requests.get(f"{BASE_URL}/api/")
        assert response.status_code == 200
        data = response.json()
        assert "message" in data
        assert data["message"] == "Hello World"
    
    def test_status_endpoint_returns_list(self):
        """Test that status endpoint returns a list"""
        response = requests.get(f"{BASE_URL}/api/status")
        assert response.status_code == 200
        data = response.json()
        assert isinstance(data, list)


class TestAppointmentEndpoints:
    """Tests for appointment booking functionality"""
    
    def test_create_appointment_success(self):
        """Test creating a new appointment with valid data"""
        tomorrow = (datetime.now() + timedelta(days=1)).strftime("%Y-%m-%d")
        appointment_data = {
            "name": "TEST_John Doe",
            "email": "test_john@example.com",
            "phone": "+91 98765 43210",
            "service": "Mood Disorder",
            "date": tomorrow,
            "time": "10:00",
            "message": "Test appointment message"
        }
        
        response = requests.post(f"{BASE_URL}/api/appointments", json=appointment_data)
        assert response.status_code == 200
        
        data = response.json()
        assert data["name"] == appointment_data["name"]
        assert data["email"] == appointment_data["email"]
        assert data["phone"] == appointment_data["phone"]
        assert data["service"] == appointment_data["service"]
        assert data["date"] == appointment_data["date"]
        assert data["time"] == appointment_data["time"]
        assert "id" in data
        assert data["status"] == "pending"
    
    def test_create_appointment_without_message(self):
        """Test creating appointment without optional message field"""
        tomorrow = (datetime.now() + timedelta(days=1)).strftime("%Y-%m-%d")
        appointment_data = {
            "name": "TEST_Jane Smith",
            "email": "test_jane@example.com",
            "phone": "+91 87654 32109",
            "service": "Anxiety Disorder",
            "date": tomorrow,
            "time": "14:00"
        }
        
        response = requests.post(f"{BASE_URL}/api/appointments", json=appointment_data)
        assert response.status_code == 200
        
        data = response.json()
        assert data["name"] == appointment_data["name"]
        assert data["email"] == appointment_data["email"]
    
    def test_create_appointment_invalid_email(self):
        """Test that invalid email returns validation error"""
        tomorrow = (datetime.now() + timedelta(days=1)).strftime("%Y-%m-%d")
        appointment_data = {
            "name": "TEST_Invalid Email",
            "email": "invalid-email",  # Invalid email format
            "phone": "+91 98765 43210",
            "service": "Mood Disorder",
            "date": tomorrow,
            "time": "10:00"
        }
        
        response = requests.post(f"{BASE_URL}/api/appointments", json=appointment_data)
        assert response.status_code == 422  # Validation error
    
    def test_create_appointment_missing_required_fields(self):
        """Test that missing required fields returns validation error"""
        appointment_data = {
            "name": "TEST_Missing Fields"
            # Missing email, phone, service, date, time
        }
        
        response = requests.post(f"{BASE_URL}/api/appointments", json=appointment_data)
        assert response.status_code == 422  # Validation error
    
    def test_get_appointments_returns_list(self):
        """Test that GET appointments returns a list"""
        response = requests.get(f"{BASE_URL}/api/appointments")
        assert response.status_code == 200
        
        data = response.json()
        assert isinstance(data, list)
    
    def test_appointment_persistence(self):
        """Test that created appointment appears in GET list"""
        tomorrow = (datetime.now() + timedelta(days=2)).strftime("%Y-%m-%d")
        unique_name = f"TEST_Persistence_{datetime.now().timestamp()}"
        appointment_data = {
            "name": unique_name,
            "email": "test_persist@example.com",
            "phone": "+91 11111 11111",
            "service": "Low Energy & Fatigue",
            "date": tomorrow,
            "time": "15:00",
            "message": "Testing persistence"
        }
        
        # Create appointment
        create_response = requests.post(f"{BASE_URL}/api/appointments", json=appointment_data)
        assert create_response.status_code == 200
        created_id = create_response.json()["id"]
        
        # Verify it appears in list
        get_response = requests.get(f"{BASE_URL}/api/appointments")
        assert get_response.status_code == 200
        
        appointments = get_response.json()
        found = any(apt["id"] == created_id for apt in appointments)
        assert found, f"Created appointment {created_id} not found in appointments list"


class TestContactEndpoints:
    """Tests for contact form functionality"""
    
    def test_submit_contact_form_success(self):
        """Test submitting contact form with valid data"""
        contact_data = {
            "name": "TEST_Contact User",
            "email": "test_contact@example.com",
            "phone": "+91 99999 88888",
            "subject": "Test Inquiry",
            "message": "This is a test message for the contact form."
        }
        
        response = requests.post(f"{BASE_URL}/api/contact", json=contact_data)
        assert response.status_code == 200
        
        data = response.json()
        assert "message" in data
        assert data["message"] == "Contact form submitted successfully"
        assert "id" in data
    
    def test_submit_contact_form_without_phone(self):
        """Test submitting contact form without optional phone field"""
        contact_data = {
            "name": "TEST_No Phone User",
            "email": "test_nophone@example.com",
            "subject": "Test Without Phone",
            "message": "Testing contact form without phone number."
        }
        
        response = requests.post(f"{BASE_URL}/api/contact", json=contact_data)
        assert response.status_code == 200
        
        data = response.json()
        assert "message" in data
        assert "id" in data
    
    def test_submit_contact_form_invalid_email(self):
        """Test that invalid email returns validation error"""
        contact_data = {
            "name": "TEST_Invalid Contact",
            "email": "not-an-email",  # Invalid email
            "subject": "Test Subject",
            "message": "Test message"
        }
        
        response = requests.post(f"{BASE_URL}/api/contact", json=contact_data)
        assert response.status_code == 422  # Validation error
    
    def test_submit_contact_form_missing_required_fields(self):
        """Test that missing required fields returns validation error"""
        contact_data = {
            "name": "TEST_Missing Contact Fields"
            # Missing email, subject, message
        }
        
        response = requests.post(f"{BASE_URL}/api/contact", json=contact_data)
        assert response.status_code == 422  # Validation error


class TestStatusEndpoints:
    """Tests for status check functionality"""
    
    def test_create_status_check(self):
        """Test creating a status check"""
        status_data = {
            "client_name": "TEST_Status_Client"
        }
        
        response = requests.post(f"{BASE_URL}/api/status", json=status_data)
        assert response.status_code == 200
        
        data = response.json()
        assert data["client_name"] == status_data["client_name"]
        assert "id" in data
        assert "timestamp" in data
    
    def test_status_check_persistence(self):
        """Test that created status check appears in GET list"""
        unique_name = f"TEST_StatusPersist_{datetime.now().timestamp()}"
        status_data = {
            "client_name": unique_name
        }
        
        # Create status check
        create_response = requests.post(f"{BASE_URL}/api/status", json=status_data)
        assert create_response.status_code == 200
        created_id = create_response.json()["id"]
        
        # Verify it appears in list
        get_response = requests.get(f"{BASE_URL}/api/status")
        assert get_response.status_code == 200
        
        status_checks = get_response.json()
        found = any(sc["id"] == created_id for sc in status_checks)
        assert found, f"Created status check {created_id} not found in list"


if __name__ == "__main__":
    pytest.main([__file__, "-v"])
