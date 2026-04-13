"""
Backend API Tests for Aashwashan Auth, Admin, and Community Features
Tests: User Registration, Login, Admin Dashboard, Blog Management, Community Posts
"""
import pytest
import requests
import os
import uuid

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', '').rstrip('/')

# Test credentials
ADMIN_EMAIL = "admin@aashwashan.com"
ADMIN_PASSWORD = "Admin123!"
TEST_USER_EMAIL = f"testuser_{uuid.uuid4().hex[:8]}@example.com"
TEST_USER_PASSWORD = "TestPass123!"
TEST_USER_NAME = "Test User"


class TestHealthEndpoints:
    """Basic health check tests"""
    
    def test_api_root(self):
        """Test API root endpoint"""
        response = requests.get(f"{BASE_URL}/api/")
        assert response.status_code == 200
        data = response.json()
        assert "message" in data
        assert "Aashwashan API" in data["message"]
        print(f"✓ API root working: {data}")


class TestUserRegistration:
    """Tests for user registration endpoint"""
    
    def test_register_new_user(self):
        """Test registering a new user"""
        payload = {
            "email": TEST_USER_EMAIL,
            "password": TEST_USER_PASSWORD,
            "name": TEST_USER_NAME,
            "role": "user"
        }
        response = requests.post(f"{BASE_URL}/api/auth/register", json=payload)
        assert response.status_code == 200
        
        data = response.json()
        assert "access_token" in data
        assert "user" in data
        assert data["user"]["email"] == TEST_USER_EMAIL
        assert data["user"]["name"] == TEST_USER_NAME
        assert data["user"]["role"] == "user"
        print(f"✓ User registered: {data['user']['email']}")
        return data["access_token"]
    
    def test_register_duplicate_email(self):
        """Test registering with duplicate email fails"""
        payload = {
            "email": ADMIN_EMAIL,  # Admin already exists
            "password": "SomePassword123",
            "name": "Duplicate User",
            "role": "user"
        }
        response = requests.post(f"{BASE_URL}/api/auth/register", json=payload)
        assert response.status_code == 400
        data = response.json()
        assert "already registered" in data["detail"].lower()
        print(f"✓ Duplicate email rejected correctly")


class TestUserLogin:
    """Tests for user login endpoint"""
    
    def test_admin_login_success(self):
        """Test admin login with correct credentials"""
        payload = {
            "email": ADMIN_EMAIL,
            "password": ADMIN_PASSWORD
        }
        response = requests.post(f"{BASE_URL}/api/auth/login", json=payload)
        assert response.status_code == 200
        
        data = response.json()
        assert "access_token" in data
        assert "user" in data
        assert data["user"]["email"] == ADMIN_EMAIL
        assert data["user"]["role"] == "admin"
        print(f"✓ Admin login successful: {data['user']['email']}")
        return data["access_token"]
    
    def test_login_invalid_credentials(self):
        """Test login with invalid credentials fails"""
        payload = {
            "email": ADMIN_EMAIL,
            "password": "WrongPassword123"
        }
        response = requests.post(f"{BASE_URL}/api/auth/login", json=payload)
        assert response.status_code == 401
        data = response.json()
        assert "invalid" in data["detail"].lower()
        print(f"✓ Invalid credentials rejected correctly")
    
    def test_login_nonexistent_user(self):
        """Test login with non-existent user fails"""
        payload = {
            "email": "nonexistent@example.com",
            "password": "SomePassword123"
        }
        response = requests.post(f"{BASE_URL}/api/auth/login", json=payload)
        assert response.status_code == 401
        print(f"✓ Non-existent user rejected correctly")


class TestAuthMe:
    """Tests for /auth/me endpoint"""
    
    @pytest.fixture
    def admin_token(self):
        """Get admin token"""
        payload = {"email": ADMIN_EMAIL, "password": ADMIN_PASSWORD}
        response = requests.post(f"{BASE_URL}/api/auth/login", json=payload)
        return response.json()["access_token"]
    
    def test_get_current_user(self, admin_token):
        """Test getting current user info"""
        headers = {"Authorization": f"Bearer {admin_token}"}
        response = requests.get(f"{BASE_URL}/api/auth/me", headers=headers)
        assert response.status_code == 200
        
        data = response.json()
        assert data["email"] == ADMIN_EMAIL
        assert data["role"] == "admin"
        assert data["is_active"] == True
        print(f"✓ Current user info retrieved: {data['email']}")
    
    def test_get_current_user_no_token(self):
        """Test getting current user without token fails"""
        response = requests.get(f"{BASE_URL}/api/auth/me")
        assert response.status_code in [401, 403]
        print(f"✓ Unauthorized access rejected correctly")
    
    def test_get_current_user_invalid_token(self):
        """Test getting current user with invalid token fails"""
        headers = {"Authorization": "Bearer invalid_token_here"}
        response = requests.get(f"{BASE_URL}/api/auth/me", headers=headers)
        assert response.status_code == 401
        print(f"✓ Invalid token rejected correctly")


class TestAdminStats:
    """Tests for admin stats endpoint"""
    
    @pytest.fixture
    def admin_token(self):
        """Get admin token"""
        payload = {"email": ADMIN_EMAIL, "password": ADMIN_PASSWORD}
        response = requests.post(f"{BASE_URL}/api/auth/login", json=payload)
        return response.json()["access_token"]
    
    def test_get_admin_stats(self, admin_token):
        """Test getting admin dashboard stats"""
        headers = {"Authorization": f"Bearer {admin_token}"}
        response = requests.get(f"{BASE_URL}/api/admin/stats", headers=headers)
        assert response.status_code == 200
        
        data = response.json()
        assert "total_users" in data
        assert "total_therapists" in data
        assert "total_appointments" in data
        assert "total_blogs" in data
        assert "total_posts" in data
        print(f"✓ Admin stats retrieved: Users={data['total_users']}, Blogs={data['total_blogs']}")
    
    def test_get_admin_stats_unauthorized(self):
        """Test getting admin stats without auth fails"""
        response = requests.get(f"{BASE_URL}/api/admin/stats")
        assert response.status_code in [401, 403]
        print(f"✓ Unauthorized admin stats access rejected")


class TestAdminBlogs:
    """Tests for admin blog management"""
    
    @pytest.fixture
    def admin_token(self):
        """Get admin token"""
        payload = {"email": ADMIN_EMAIL, "password": ADMIN_PASSWORD}
        response = requests.post(f"{BASE_URL}/api/auth/login", json=payload)
        return response.json()["access_token"]
    
    def test_get_admin_blogs(self, admin_token):
        """Test getting all blogs (admin)"""
        headers = {"Authorization": f"Bearer {admin_token}"}
        response = requests.get(f"{BASE_URL}/api/admin/blogs", headers=headers)
        assert response.status_code == 200
        
        data = response.json()
        assert isinstance(data, list)
        print(f"✓ Admin blogs retrieved: {len(data)} blogs")
    
    def test_create_blog(self, admin_token):
        """Test creating a new blog"""
        headers = {"Authorization": f"Bearer {admin_token}"}
        payload = {
            "title": f"TEST_Blog_{uuid.uuid4().hex[:8]}",
            "content": "This is test blog content for automated testing.",
            "excerpt": "Test blog excerpt",
            "category": "Mental Health",
            "featured_image": "",
            "tags": ["test", "automation"],
            "is_published": False
        }
        response = requests.post(f"{BASE_URL}/api/admin/blogs", json=payload, headers=headers)
        assert response.status_code == 200
        
        data = response.json()
        assert "id" in data
        assert "slug" in data
        print(f"✓ Blog created: {data['id']}, slug: {data['slug']}")
        return data["id"]
    
    def test_create_and_publish_blog(self, admin_token):
        """Test creating and publishing a blog"""
        headers = {"Authorization": f"Bearer {admin_token}"}
        payload = {
            "title": f"TEST_Published_Blog_{uuid.uuid4().hex[:8]}",
            "content": "This is a published test blog content.",
            "excerpt": "Published test blog",
            "category": "Self Care",
            "featured_image": "",
            "tags": ["published", "test"],
            "is_published": True
        }
        response = requests.post(f"{BASE_URL}/api/admin/blogs", json=payload, headers=headers)
        assert response.status_code == 200
        
        data = response.json()
        assert "id" in data
        print(f"✓ Published blog created: {data['id']}")
        return data["id"]
    
    def test_update_blog(self, admin_token):
        """Test updating a blog"""
        headers = {"Authorization": f"Bearer {admin_token}"}
        
        # First create a blog
        create_payload = {
            "title": f"TEST_Update_Blog_{uuid.uuid4().hex[:8]}",
            "content": "Original content",
            "excerpt": "Original excerpt",
            "category": "Mental Health",
            "tags": [],
            "is_published": False
        }
        create_response = requests.post(f"{BASE_URL}/api/admin/blogs", json=create_payload, headers=headers)
        blog_id = create_response.json()["id"]
        
        # Update the blog
        update_payload = {
            "title": "Updated Title",
            "content": "Updated content",
            "excerpt": "Updated excerpt",
            "category": "Relationships",
            "tags": ["updated"],
            "is_published": True
        }
        response = requests.put(f"{BASE_URL}/api/admin/blogs/{blog_id}", json=update_payload, headers=headers)
        assert response.status_code == 200
        print(f"✓ Blog updated: {blog_id}")
    
    def test_delete_blog(self, admin_token):
        """Test deleting a blog"""
        headers = {"Authorization": f"Bearer {admin_token}"}
        
        # First create a blog
        create_payload = {
            "title": f"TEST_Delete_Blog_{uuid.uuid4().hex[:8]}",
            "content": "To be deleted",
            "excerpt": "",
            "category": "Mental Health",
            "tags": [],
            "is_published": False
        }
        create_response = requests.post(f"{BASE_URL}/api/admin/blogs", json=create_payload, headers=headers)
        blog_id = create_response.json()["id"]
        
        # Delete the blog
        response = requests.delete(f"{BASE_URL}/api/admin/blogs/{blog_id}", headers=headers)
        assert response.status_code == 200
        print(f"✓ Blog deleted: {blog_id}")


class TestAdminUsers:
    """Tests for admin user management"""
    
    @pytest.fixture
    def admin_token(self):
        """Get admin token"""
        payload = {"email": ADMIN_EMAIL, "password": ADMIN_PASSWORD}
        response = requests.post(f"{BASE_URL}/api/auth/login", json=payload)
        return response.json()["access_token"]
    
    def test_get_all_users(self, admin_token):
        """Test getting all users (admin)"""
        headers = {"Authorization": f"Bearer {admin_token}"}
        response = requests.get(f"{BASE_URL}/api/admin/users", headers=headers)
        assert response.status_code == 200
        
        data = response.json()
        assert isinstance(data, list)
        assert len(data) > 0  # At least admin exists
        
        # Verify admin user is in the list
        admin_found = any(u["email"] == ADMIN_EMAIL for u in data)
        assert admin_found
        print(f"✓ Users retrieved: {len(data)} users")


class TestPublicBlogs:
    """Tests for public blog endpoints"""
    
    def test_get_public_blogs(self):
        """Test getting published blogs (public)"""
        response = requests.get(f"{BASE_URL}/api/blogs")
        assert response.status_code == 200
        
        data = response.json()
        assert isinstance(data, list)
        print(f"✓ Public blogs retrieved: {len(data)} blogs")


class TestCommunityPosts:
    """Tests for community posts endpoints"""
    
    @pytest.fixture
    def user_token(self):
        """Get or create user token"""
        # Try to login first
        login_payload = {"email": TEST_USER_EMAIL, "password": TEST_USER_PASSWORD}
        response = requests.post(f"{BASE_URL}/api/auth/login", json=login_payload)
        
        if response.status_code == 200:
            return response.json()["access_token"]
        
        # Register new user
        register_payload = {
            "email": f"community_test_{uuid.uuid4().hex[:8]}@example.com",
            "password": TEST_USER_PASSWORD,
            "name": "Community Test User",
            "role": "user"
        }
        response = requests.post(f"{BASE_URL}/api/auth/register", json=register_payload)
        return response.json()["access_token"]
    
    def test_get_community_posts_public(self):
        """Test getting community posts (public read)"""
        response = requests.get(f"{BASE_URL}/api/community/posts")
        assert response.status_code == 200
        
        data = response.json()
        assert isinstance(data, list)
        print(f"✓ Community posts retrieved: {len(data)} posts")
    
    def test_create_community_post_authenticated(self, user_token):
        """Test creating community post (authenticated)"""
        headers = {"Authorization": f"Bearer {user_token}"}
        payload = {
            "title": f"TEST_Post_{uuid.uuid4().hex[:8]}",
            "content": "This is a test community post from automated testing.",
            "category": "Support",
            "is_anonymous": True
        }
        response = requests.post(f"{BASE_URL}/api/community/posts", json=payload, headers=headers)
        assert response.status_code == 200
        
        data = response.json()
        assert "id" in data
        print(f"✓ Community post created: {data['id']}")
    
    def test_create_community_post_unauthenticated(self):
        """Test creating community post without auth fails"""
        payload = {
            "title": "Unauthorized Post",
            "content": "This should fail",
            "category": "General",
            "is_anonymous": True
        }
        response = requests.post(f"{BASE_URL}/api/community/posts", json=payload)
        assert response.status_code in [401, 403]
        print(f"✓ Unauthenticated post creation rejected correctly")


class TestTherapistEndpoints:
    """Tests for therapist-related endpoints"""
    
    def test_get_public_therapists(self):
        """Test getting public therapist list"""
        response = requests.get(f"{BASE_URL}/api/therapists")
        assert response.status_code == 200
        
        data = response.json()
        assert isinstance(data, list)
        print(f"✓ Public therapists retrieved: {len(data)} therapists")


if __name__ == "__main__":
    pytest.main([__file__, "-v"])
