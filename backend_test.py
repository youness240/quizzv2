import requests
import json
import sys
import os
from dotenv import load_dotenv
import time

# Load environment variables from frontend/.env to get the backend URL
load_dotenv('/app/frontend/.env')

# Get the backend URL from environment variables
BACKEND_URL = os.environ.get('REACT_APP_BACKEND_URL')
API_BASE_URL = f"{BACKEND_URL}/api"

# Set a timeout for all requests
REQUEST_TIMEOUT = 10  # seconds

def test_root_endpoint():
    """Test the root endpoint GET /api/"""
    print("\n=== Testing Root Endpoint ===")
    try:
        response = requests.get(f"{API_BASE_URL}/", timeout=REQUEST_TIMEOUT)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.json()}")
        
        assert response.status_code == 200, f"Expected status code 200, got {response.status_code}"
        assert "message" in response.json(), "Response should contain 'message' field"
        assert response.json()["message"] == "Hello World", f"Expected 'Hello World', got {response.json()['message']}"
        
        print("✅ Root endpoint test passed")
        return True
    except Exception as e:
        print(f"❌ Root endpoint test failed: {str(e)}")
        return False

def test_create_status_check():
    """Test the POST /api/status endpoint"""
    print("\n=== Testing Create Status Check ===")
    try:
        payload = {"client_name": "backend_test_client"}
        response = requests.post(f"{API_BASE_URL}/status", json=payload, timeout=REQUEST_TIMEOUT)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.json()}")
        
        assert response.status_code == 200, f"Expected status code 200, got {response.status_code}"
        assert "id" in response.json(), "Response should contain 'id' field"
        assert "client_name" in response.json(), "Response should contain 'client_name' field"
        assert "timestamp" in response.json(), "Response should contain 'timestamp' field"
        assert response.json()["client_name"] == "backend_test_client", "Client name doesn't match"
        
        print("✅ Create status check test passed")
        return True
    except Exception as e:
        print(f"❌ Create status check test failed: {str(e)}")
        return False

def test_get_status_checks():
    """Test the GET /api/status endpoint"""
    print("\n=== Testing Get Status Checks ===")
    try:
        response = requests.get(f"{API_BASE_URL}/status", timeout=REQUEST_TIMEOUT)
        print(f"Status Code: {response.status_code}")
        print(f"Response contains {len(response.json())} status checks")
        
        assert response.status_code == 200, f"Expected status code 200, got {response.status_code}"
        assert isinstance(response.json(), list), "Response should be a list"
        
        # Check if we have at least one status check (we should have created one in the previous test)
        if len(response.json()) > 0:
            status_check = response.json()[0]
            assert "id" in status_check, "Status check should contain 'id' field"
            assert "client_name" in status_check, "Status check should contain 'client_name' field"
            assert "timestamp" in status_check, "Status check should contain 'timestamp' field"
        
        print("✅ Get status checks test passed")
        return True
    except Exception as e:
        print(f"❌ Get status checks test failed: {str(e)}")
        return False

def test_mongodb_connection():
    """Test MongoDB connection by checking if data persists between requests"""
    print("\n=== Testing MongoDB Connection ===")
    try:
        # Create a unique client name to identify our test entry
        unique_client_name = f"mongodb_test_client_{int(time.time())}"
        
        # Create a new status check
        create_payload = {"client_name": unique_client_name}
        create_response = requests.post(f"{API_BASE_URL}/status", json=create_payload, timeout=REQUEST_TIMEOUT)
        assert create_response.status_code == 200, "Failed to create status check"
        
        # Get all status checks and verify our entry exists
        get_response = requests.get(f"{API_BASE_URL}/status", timeout=REQUEST_TIMEOUT)
        assert get_response.status_code == 200, "Failed to get status checks"
        
        # Find our test entry in the response
        found = False
        for status_check in get_response.json():
            if status_check["client_name"] == unique_client_name:
                found = True
                break
        
        assert found, f"Could not find our test entry with client_name: {unique_client_name}"
        
        print("✅ MongoDB connection test passed")
        return True
    except Exception as e:
        print(f"❌ MongoDB connection test failed: {str(e)}")
        return False

def test_cors_configuration():
    """Test CORS configuration by sending a preflight request"""
    print("\n=== Testing CORS Configuration ===")
    try:
        headers = {
            "Origin": "http://example.com",
            "Access-Control-Request-Method": "GET",
            "Access-Control-Request-Headers": "Content-Type"
        }
        response = requests.options(f"{API_BASE_URL}/", headers=headers, timeout=REQUEST_TIMEOUT)
        print(f"Status Code: {response.status_code}")
        print(f"Access-Control-Allow-Origin: {response.headers.get('Access-Control-Allow-Origin')}")
        
        assert response.status_code == 200, f"Expected status code 200, got {response.status_code}"
        assert "Access-Control-Allow-Origin" in response.headers, "CORS headers not found"
        assert response.headers.get("Access-Control-Allow-Origin") == "*", "CORS not properly configured"
        
        print("✅ CORS configuration test passed")
        return True
    except Exception as e:
        print(f"❌ CORS configuration test failed: {str(e)}")
        return False

def run_all_tests():
    """Run all tests and return overall result"""
    print(f"Testing backend API at: {API_BASE_URL}")
    
    test_results = {
        "Root Endpoint": test_root_endpoint(),
        "Create Status Check": test_create_status_check(),
        "Get Status Checks": test_get_status_checks(),
        "MongoDB Connection": test_mongodb_connection(),
        "CORS Configuration": test_cors_configuration()
    }
    
    print("\n=== Test Summary ===")
    all_passed = True
    for test_name, result in test_results.items():
        status = "✅ PASSED" if result else "❌ FAILED"
        print(f"{test_name}: {status}")
        if not result:
            all_passed = False
    
    if all_passed:
        print("\n🎉 All tests passed! The backend API is working correctly.")
    else:
        print("\n❌ Some tests failed. Please check the logs above for details.")
    
    return all_passed

if __name__ == "__main__":
    run_all_tests()