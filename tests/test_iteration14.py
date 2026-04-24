"""
Iteration 14 Backend Tests - Aashwashan Mental Health Platform
Testing: Auth, Admin, Chatbot, Blog APIs
"""
import pytest
import requests
import os

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', 'https://emotional-os-9.preview.emergentagent.com')

# Test credentials from test_credentials.md
ADMIN_EMAIL = "admin@aashwashan.com"
ADMIN_PASSWORD = "Admin123!"
TEST_USER_EMAIL = "test_user_feb@test.com"
TEST_USER_PASSWORD = "TestPass123"


class TestHealthCheck:
    """API Health Check Tests"""
    
    def test_api_root(self):
        """Test API root endpoint"""
        response = requests.get(f"{BASE_URL}/api/")
        assert response.status_code == 200
        data = response.json()
        assert data["message"] == "Aashwashan API v2.0"
        print("✓ API root endpoint working")


class TestUserAuth:
    """User Authentication Tests"""
    
    def test_user_login_success(self):
        """Test user login with valid credentials"""
        response = requests.post(f"{BASE_URL}/api/auth/login", json={
            "email": TEST_USER_EMAIL,
            "password": TEST_USER_PASSWORD
        })
        assert response.status_code == 200
        data = response.json()
        assert "access_token" in data
        assert data["user"]["email"] == TEST_USER_EMAIL
        assert data["user"]["role"] == "user"
        print(f"✓ User login successful: {TEST_USER_EMAIL}")
    
    def test_user_login_invalid_credentials(self):
        """Test user login with invalid credentials"""
        response = requests.post(f"{BASE_URL}/api/auth/login", json={
            "email": "wrong@email.com",
            "password": "wrongpassword"
        })
        assert response.status_code == 401
        print("✓ Invalid credentials correctly rejected")
    
    def test_user_registration_duplicate_email(self):
        """Test registration with existing email fails"""
        response = requests.post(f"{BASE_URL}/api/auth/register", json={
            "email": TEST_USER_EMAIL,
            "password": "TestPass123",
            "name": "Duplicate User"
        })
        assert response.status_code == 400
        data = response.json()
        assert "already registered" in data["detail"].lower()
        print("✓ Duplicate email registration correctly rejected")


class TestAdminAuth:
    """Admin Authentication Tests"""
    
    def test_admin_login_success(self):
        """Test admin login with valid credentials"""
        response = requests.post(f"{BASE_URL}/api/auth/login", json={
            "email": ADMIN_EMAIL,
            "password": ADMIN_PASSWORD
        })
        assert response.status_code == 200
        data = response.json()
        assert "access_token" in data
        assert data["user"]["email"] == ADMIN_EMAIL
        assert data["user"]["role"] == "admin"
        print(f"✓ Admin login successful: {ADMIN_EMAIL}")
        return data["access_token"]
    
    def test_admin_stats_endpoint(self):
        """Test admin stats endpoint with auth"""
        # First login to get token
        login_response = requests.post(f"{BASE_URL}/api/auth/login", json={
            "email": ADMIN_EMAIL,
            "password": ADMIN_PASSWORD
        })
        token = login_response.json()["access_token"]
        
        # Get stats
        response = requests.get(
            f"{BASE_URL}/api/admin/stats",
            headers={"Authorization": f"Bearer {token}"}
        )
        assert response.status_code == 200
        data = response.json()
        
        # Verify stats structure
        assert "total_users" in data
        assert "total_therapists" in data
        assert "total_appointments" in data
        assert "total_blogs" in data
        print(f"✓ Admin stats: Users={data['total_users']}, Therapists={data['total_therapists']}, Appointments={data['total_appointments']}, Blogs={data['total_blogs']}")
    
    def test_admin_users_endpoint(self):
        """Test admin users list endpoint"""
        login_response = requests.post(f"{BASE_URL}/api/auth/login", json={
            "email": ADMIN_EMAIL,
            "password": ADMIN_PASSWORD
        })
        token = login_response.json()["access_token"]
        
        response = requests.get(
            f"{BASE_URL}/api/admin/users",
            headers={"Authorization": f"Bearer {token}"}
        )
        assert response.status_code == 200
        data = response.json()
        assert isinstance(data, list)
        print(f"✓ Admin users endpoint: {len(data)} users found")
    
    def test_admin_stats_unauthorized(self):
        """Test admin stats without auth fails"""
        response = requests.get(f"{BASE_URL}/api/admin/stats")
        assert response.status_code in [401, 403]
        print("✓ Admin stats correctly requires authentication")


class TestChatbot:
    """AI Chatbot (Saathi) Tests"""
    
    def test_create_new_session(self):
        """Test creating a new chat session"""
        response = requests.post(f"{BASE_URL}/api/chatbot/new-session")
        assert response.status_code == 200
        data = response.json()
        assert "session_id" in data
        print(f"✓ New chat session created: {data['session_id'][:8]}...")
        return data["session_id"]
    
    def test_chat_message(self):
        """Test sending a chat message and getting AI response"""
        # Create session first
        session_response = requests.post(f"{BASE_URL}/api/chatbot/new-session")
        session_id = session_response.json()["session_id"]
        
        # Send message
        response = requests.post(f"{BASE_URL}/api/chatbot/chat", json={
            "message": "I'm feeling stressed today",
            "session_id": session_id
        })
        assert response.status_code == 200
        data = response.json()
        assert "response" in data
        assert "session_id" in data
        assert len(data["response"]) > 0
        print(f"✓ Chatbot response received: '{data['response'][:50]}...'")


class TestBlogAPI:
    """Blog API Tests"""
    
    def test_get_blogs_public(self):
        """Test public blogs endpoint"""
        response = requests.get(f"{BASE_URL}/api/blogs")
        assert response.status_code == 200
        data = response.json()
        assert isinstance(data, list)
        print(f"✓ Public blogs endpoint: {len(data)} blogs found")
    
    def test_admin_blogs_endpoint(self):
        """Test admin blogs management endpoint"""
        login_response = requests.post(f"{BASE_URL}/api/auth/login", json={
            "email": ADMIN_EMAIL,
            "password": ADMIN_PASSWORD
        })
        token = login_response.json()["access_token"]
        
        response = requests.get(
            f"{BASE_URL}/api/admin/blogs",
            headers={"Authorization": f"Bearer {token}"}
        )
        assert response.status_code == 200
        data = response.json()
        assert isinstance(data, list)
        print(f"✓ Admin blogs endpoint: {len(data)} blogs found")


class TestCommunityAPI:
    """Community Posts API Tests"""
    
    def test_get_community_posts(self):
        """Test public community posts endpoint"""
        response = requests.get(f"{BASE_URL}/api/community/posts")
        assert response.status_code == 200
        data = response.json()
        assert isinstance(data, list)
        print(f"✓ Community posts endpoint: {len(data)} posts found")


class TestAppointmentsAPI:
    """Appointments API Tests"""
    
    def test_get_appointments(self):
        """Test appointments list endpoint"""
        response = requests.get(f"{BASE_URL}/api/appointments")
        assert response.status_code == 200
        data = response.json()
        assert isinstance(data, list)
        print(f"✓ Appointments endpoint: {len(data)} appointments found")


class TestTherapistsAPI:
    """Therapists API Tests"""
    
    def test_get_public_therapists(self):
        """Test public therapists list endpoint"""
        response = requests.get(f"{BASE_URL}/api/therapists")
        assert response.status_code == 200
        data = response.json()
        assert isinstance(data, list)
        print(f"✓ Public therapists endpoint: {len(data)} therapists found")


if __name__ == "__main__":
    pytest.main([__file__, "-v", "--tb=short"])
