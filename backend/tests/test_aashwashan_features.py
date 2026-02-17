"""
Backend API Tests for Aashwashan Mental Health Website
Tests: Payment endpoints, Community posts, Appointments with session pricing
"""
import pytest
import requests
import os
import uuid

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', '').rstrip('/')

class TestHealthEndpoints:
    """Basic health check tests"""
    
    def test_api_root(self):
        """Test API root endpoint"""
        response = requests.get(f"{BASE_URL}/api/")
        assert response.status_code == 200
        data = response.json()
        assert "message" in data
        print(f"✓ API root working: {data}")


class TestPaymentEndpoints:
    """Tests for Razorpay payment integration (MOCKED)"""
    
    def test_create_order_success(self):
        """Test creating a Razorpay order"""
        payload = {
            "amount": 99900,  # Rs 999 in paise
            "appointment_id": f"TEST_apt_{uuid.uuid4().hex[:8]}",
            "customer_name": "Test User",
            "customer_email": "test@example.com",
            "customer_phone": "+919876543210"
        }
        response = requests.post(f"{BASE_URL}/api/create-order", json=payload)
        assert response.status_code == 200
        
        data = response.json()
        assert "order_id" in data
        assert data["amount"] == 99900
        assert data["currency"] == "INR"
        assert data["mock"] == True  # Razorpay not configured
        print(f"✓ Create order working (mock): {data['order_id']}")
    
    def test_create_order_30min_session(self):
        """Test creating order for 30 min session (Rs 999)"""
        payload = {
            "amount": 99900,
            "appointment_id": f"TEST_30min_{uuid.uuid4().hex[:8]}",
            "customer_name": "Test User 30min",
            "customer_email": "test30@example.com",
            "customer_phone": "+919876543210"
        }
        response = requests.post(f"{BASE_URL}/api/create-order", json=payload)
        assert response.status_code == 200
        data = response.json()
        assert data["amount"] == 99900
        print(f"✓ 30 min session order: Rs {data['amount']/100}")
    
    def test_create_order_45min_session(self):
        """Test creating order for 45 min session (Rs 1400)"""
        payload = {
            "amount": 140000,
            "appointment_id": f"TEST_45min_{uuid.uuid4().hex[:8]}",
            "customer_name": "Test User 45min",
            "customer_email": "test45@example.com",
            "customer_phone": "+919876543210"
        }
        response = requests.post(f"{BASE_URL}/api/create-order", json=payload)
        assert response.status_code == 200
        data = response.json()
        assert data["amount"] == 140000
        print(f"✓ 45 min session order: Rs {data['amount']/100}")
    
    def test_create_order_60min_session(self):
        """Test creating order for 60 min session (Rs 1600)"""
        payload = {
            "amount": 160000,
            "appointment_id": f"TEST_60min_{uuid.uuid4().hex[:8]}",
            "customer_name": "Test User 60min",
            "customer_email": "test60@example.com",
            "customer_phone": "+919876543210"
        }
        response = requests.post(f"{BASE_URL}/api/create-order", json=payload)
        assert response.status_code == 200
        data = response.json()
        assert data["amount"] == 160000
        print(f"✓ 60 min session order: Rs {data['amount']/100}")
    
    def test_verify_payment_returns_meeting_link(self):
        """Test payment verification returns Jitsi Meet link"""
        appointment_id = f"TEST_verify_{uuid.uuid4().hex[:8]}"
        payload = {
            "razorpay_order_id": f"order_mock_{uuid.uuid4().hex[:16]}",
            "razorpay_payment_id": f"pay_mock_{uuid.uuid4().hex[:16]}",
            "razorpay_signature": "mock_signature",
            "appointment_id": appointment_id
        }
        response = requests.post(f"{BASE_URL}/api/verify-payment", json=payload)
        assert response.status_code == 200
        
        data = response.json()
        assert data["success"] == True
        assert "meeting_link" in data
        assert "meet.jit.si" in data["meeting_link"]
        assert "aashwashan-session" in data["meeting_link"]
        print(f"✓ Payment verification returns Jitsi link: {data['meeting_link']}")


class TestCommunityEndpoints:
    """Tests for Community page backend"""
    
    def test_create_community_post(self):
        """Test creating a community post"""
        payload = {
            "category": "Support",
            "content": f"TEST_post_{uuid.uuid4().hex[:8]} - This is a test community post"
        }
        response = requests.post(f"{BASE_URL}/api/community-posts", json=payload)
        assert response.status_code == 200
        
        data = response.json()
        assert "id" in data
        assert data["message"] == "Post created successfully"
        print(f"✓ Community post created: {data['id']}")
        return data["id"]
    
    def test_get_community_posts(self):
        """Test fetching community posts"""
        response = requests.get(f"{BASE_URL}/api/community-posts")
        assert response.status_code == 200
        
        data = response.json()
        assert "posts" in data
        assert "count" in data
        assert isinstance(data["posts"], list)
        print(f"✓ Community posts fetched: {data['count']} posts")
    
    def test_community_post_categories(self):
        """Test posting with different categories"""
        categories = ["General", "Anxiety", "Depression", "Sleep", "Stress"]
        
        for category in categories:
            payload = {
                "category": category,
                "content": f"TEST_{category}_{uuid.uuid4().hex[:8]} - Test post for {category}"
            }
            response = requests.post(f"{BASE_URL}/api/community-posts", json=payload)
            assert response.status_code == 200
            print(f"✓ Post created with category: {category}")


class TestAppointmentWithSessionPricing:
    """Tests for appointments with new session duration pricing"""
    
    def test_create_appointment_30min(self):
        """Test creating appointment with 30 min session"""
        payload = {
            "name": "TEST_User_30min",
            "email": "test30min@example.com",
            "phone": "+919876543210",
            "service": "30 minutes",
            "date": "2026-02-15",
            "time": "10:00",
            "message": "30 min session booking test"
        }
        response = requests.post(f"{BASE_URL}/api/appointments", json=payload)
        assert response.status_code == 200
        
        data = response.json()
        assert data["name"] == "TEST_User_30min"
        assert data["service"] == "30 minutes"
        print(f"✓ 30 min appointment created: {data['id']}")
    
    def test_create_appointment_45min(self):
        """Test creating appointment with 45 min session"""
        payload = {
            "name": "TEST_User_45min",
            "email": "test45min@example.com",
            "phone": "+919876543210",
            "service": "45 minutes",
            "date": "2026-02-15",
            "time": "11:00",
            "message": "45 min session booking test"
        }
        response = requests.post(f"{BASE_URL}/api/appointments", json=payload)
        assert response.status_code == 200
        
        data = response.json()
        assert data["service"] == "45 minutes"
        print(f"✓ 45 min appointment created: {data['id']}")
    
    def test_create_appointment_60min(self):
        """Test creating appointment with 60 min session"""
        payload = {
            "name": "TEST_User_60min",
            "email": "test60min@example.com",
            "phone": "+919876543210",
            "service": "60 minutes",
            "date": "2026-02-15",
            "time": "14:00",
            "message": "60 min session booking test"
        }
        response = requests.post(f"{BASE_URL}/api/appointments", json=payload)
        assert response.status_code == 200
        
        data = response.json()
        assert data["service"] == "60 minutes"
        print(f"✓ 60 min appointment created: {data['id']}")
    
    def test_get_appointments(self):
        """Test fetching all appointments"""
        response = requests.get(f"{BASE_URL}/api/appointments")
        assert response.status_code == 200
        
        data = response.json()
        assert isinstance(data, list)
        print(f"✓ Appointments fetched: {len(data)} appointments")


if __name__ == "__main__":
    pytest.main([__file__, "-v"])
