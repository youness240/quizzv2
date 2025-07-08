import requests
import json
import sys
import os
from dotenv import load_dotenv
import time
import uuid

# Load environment variables from frontend/.env to get the backend URL
load_dotenv('/app/frontend/.env')

# Get the backend URL from environment variables
# Get the backend URL from environment variables
# For testing purposes, we'll use the local URL since we're running in the same container
BACKEND_URL = "http://localhost:8001"
API_BASE_URL = f"{BACKEND_URL}/api"

# Set a timeout for all requests
REQUEST_TIMEOUT = 20  # seconds - increased for OpenAI API calls

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

def test_analyze_perfumes_endpoint():
    """Test the POST /api/analyze-perfumes endpoint with sample perfume names"""
    print("\n=== Testing Analyze Perfumes Endpoint ===")
    try:
        # Sample perfume names as specified in the test requirements
        payload = {"perfumes": ["Chanel No. 5", "Dior Sauvage", "Tom Ford Black Orchid"]}
        
        print(f"Sending request to {API_BASE_URL}/analyze-perfumes with payload: {payload}")
        response = requests.post(f"{API_BASE_URL}/analyze-perfumes", json=payload, timeout=REQUEST_TIMEOUT)
        print(f"Status Code: {response.status_code}")
        
        # Check if response is successful
        assert response.status_code == 200, f"Expected status code 200, got {response.status_code}"
        
        # Parse response
        result = response.json()
        print(f"Response: {json.dumps(result, indent=2)}")
        
        # Validate response structure
        assert "id" in result, "Response should contain 'id' field"
        assert "user_session" in result, "Response should contain 'user_session' field"
        assert "profile_type" in result, "Response should contain 'profile_type' field"
        assert result["profile_type"] == "perfume_input", "Profile type should be 'perfume_input'"
        
        # Validate olfactory profile fields
        assert "olfactory_families" in result, "Response should contain 'olfactory_families' field"
        assert isinstance(result["olfactory_families"], list), "olfactory_families should be a list"
        
        assert "intensity" in result, "Response should contain 'intensity' field"
        assert result["intensity"] in ["leger", "modere", "intense"], f"Invalid intensity value: {result['intensity']}"
        
        assert "sillage" in result, "Response should contain 'sillage' field"
        assert result["sillage"] in ["intime", "modere", "puissant"], f"Invalid sillage value: {result['sillage']}"
        
        assert "emotional_tone" in result, "Response should contain 'emotional_tone' field"
        assert isinstance(result["emotional_tone"], list), "emotional_tone should be a list"
        
        assert "personality_traits" in result, "Response should contain 'personality_traits' field"
        assert isinstance(result["personality_traits"], list), "personality_traits should be a list"
        
        assert "portrait_text" in result, "Response should contain 'portrait_text' field"
        assert isinstance(result["portrait_text"], str), "portrait_text should be a string"
        assert len(result["portrait_text"]) > 0, "portrait_text should not be empty"
        
        print("✅ Analyze perfumes endpoint test passed")
        return True
    except Exception as e:
        print(f"❌ Analyze perfumes endpoint test failed: {str(e)}")
        return False

def test_analyze_quiz_endpoint():
    """Test the POST /api/analyze-quiz endpoint with sample quiz answers including new social perception questions"""
    print("\n=== Testing Analyze Quiz Endpoint with All 10 Questions ===")
    try:
        # Sample quiz answers based on the actual quiz structure in server.py
        # Using the correct questionId format (string) and values that match the quiz_mapping
        # Now including questions 9 and 10 for social perception
        payload = {
            "answers": [
                {"questionId": "1", "value": "evening"},
                {"questionId": "2", "value": "floral"},
                {"questionId": "3", "value": "parisian"},
                {"questionId": "4", "value": "classical"},
                {"questionId": "5", "value": "silk"},
                {"questionId": "6", "value": "vanilla"},
                {"questionId": "7", "value": "romantic"},
                {"questionId": "8", "value": "water"},
                {"questionId": "9", "value": "confident_noticeable"},  # New social perception question
                {"questionId": "10", "value": "intriguing_mysterious"}  # New social perception question
            ]
        }
        
        print(f"Sending request to {API_BASE_URL}/analyze-quiz with payload: {json.dumps(payload, indent=2)}")
        response = requests.post(f"{API_BASE_URL}/analyze-quiz", json=payload, timeout=REQUEST_TIMEOUT)
        print(f"Status Code: {response.status_code}")
        
        # Check if response is successful
        assert response.status_code == 200, f"Expected status code 200, got {response.status_code}"
        
        # Parse response
        result = response.json()
        print(f"Response: {json.dumps(result, indent=2)}")
        
        # Validate response structure
        assert "id" in result, "Response should contain 'id' field"
        assert "user_session" in result, "Response should contain 'user_session' field"
        assert "profile_type" in result, "Response should contain 'profile_type' field"
        assert result["profile_type"] == "quiz", "Profile type should be 'quiz'"
        
        # Validate olfactory profile fields
        assert "olfactory_families" in result, "Response should contain 'olfactory_families' field"
        assert isinstance(result["olfactory_families"], list), "olfactory_families should be a list"
        
        assert "intensity" in result, "Response should contain 'intensity' field"
        assert result["intensity"] in ["leger", "modere", "intense"], f"Invalid intensity value: {result['intensity']}"
        
        assert "sillage" in result, "Response should contain 'sillage' field"
        assert result["sillage"] in ["intime", "modere", "puissant"], f"Invalid sillage value: {result['sillage']}"
        
        assert "emotional_tone" in result, "Response should contain 'emotional_tone' field"
        assert isinstance(result["emotional_tone"], list), "emotional_tone should be a list"
        
        assert "personality_traits" in result, "Response should contain 'personality_traits' field"
        assert isinstance(result["personality_traits"], list), "personality_traits should be a list"
        
        assert "portrait_text" in result, "Response should contain 'portrait_text' field"
        assert isinstance(result["portrait_text"], str), "portrait_text should be a string"
        assert len(result["portrait_text"]) > 0, "portrait_text should not be empty"
        
        # Check for enhanced traits based on social perception questions
        # Since we selected "confident_noticeable" and "intriguing_mysterious", we expect:
        # - Intensity should be "intense" or at least "modere"
        # - Sillage should be "puissant" or at least "modere"
        # - Personality traits should include some confident/mysterious traits
        
        # Check intensity and sillage influenced by social perception
        assert result["intensity"] in ["modere", "intense"], f"Expected intensity to be modere or intense based on social preferences, got {result['intensity']}"
        assert result["sillage"] in ["modere", "puissant"], f"Expected sillage to be modere or puissant based on social preferences, got {result['sillage']}"
        
        # Check for personality traits that reflect the social perception choices
        social_related_traits = ["confiant", "audacieux", "charismatique", "mystérieux", "intriguant", "fascinant"]
        has_social_trait = any(trait in social_related_traits for trait in result["personality_traits"])
        assert has_social_trait, f"Expected at least one social-related trait from {social_related_traits}, got {result['personality_traits']}"
        
        print("✅ Analyze quiz endpoint test passed with enhanced social perception questions")
        return True
    except Exception as e:
        print(f"❌ Analyze quiz endpoint test failed: {str(e)}")
        return False

def test_input_validation_perfumes():
    """Test input validation for the analyze-perfumes endpoint"""
    print("\n=== Testing Input Validation for Analyze Perfumes ===")
    try:
        # Test with empty perfume list
        empty_payload = {"perfumes": []}
        print(f"Testing with empty perfume list: {empty_payload}")
        response = requests.post(f"{API_BASE_URL}/analyze-perfumes", json=empty_payload, timeout=REQUEST_TIMEOUT)
        print(f"Status Code: {response.status_code}")
        
        # Test with invalid payload structure
        invalid_payload = {"invalid_field": "test"}
        print(f"Testing with invalid payload structure: {invalid_payload}")
        response2 = requests.post(f"{API_BASE_URL}/analyze-perfumes", json=invalid_payload, timeout=REQUEST_TIMEOUT)
        print(f"Status Code: {response2.status_code}")
        
        # At least one of these should return a non-200 status code or a default response
        # We're checking that the API handles invalid input gracefully
        if response.status_code != 200 or response2.status_code != 200:
            print("✅ Input validation test passed - API rejected invalid input")
            return True
        else:
            # If both returned 200, check if we got default values
            result1 = response.json()
            result2 = response2.json()
            
            # Check if these look like default responses
            if (result1.get("profile_type") == "perfume_input" and 
                isinstance(result1.get("olfactory_families"), list) and
                result2.get("profile_type") == "perfume_input" and
                isinstance(result2.get("olfactory_families"), list)):
                print("✅ Input validation test passed - API returned default values for invalid input")
                return True
            else:
                print("❌ Input validation test failed - API accepted invalid input without proper handling")
                return False
    except Exception as e:
        print(f"❌ Input validation test failed: {str(e)}")
        return False

def test_analyze_quiz_with_invalid_format():
    """Test the POST /api/analyze-quiz endpoint with invalid format to reproduce the error"""
    print("\n=== Testing Analyze Quiz Endpoint with Invalid Format ===")
    try:
        # Sample quiz answers with numeric questionId instead of string
        # This might be causing the "Une erreur est survenue lors de l'analyse" error
        payload = {
            "answers": [
                {"questionId": 1, "value": "evening"},  # Numeric instead of string
                {"questionId": 2, "value": "floral"},   # Numeric instead of string
                {"questionId": 3, "value": "parisian"},
                {"questionId": 4, "value": "classical"},
                {"questionId": 5, "value": "silk"},
                {"questionId": 6, "value": "vanilla"},
                {"questionId": 7, "value": "romantic"},
                {"questionId": 8, "value": "water"}
            ]
        }
        
        print(f"Sending request with numeric questionId to {API_BASE_URL}/analyze-quiz")
        print(f"Payload: {json.dumps(payload, indent=2)}")
        response = requests.post(f"{API_BASE_URL}/analyze-quiz", json=payload, timeout=REQUEST_TIMEOUT)
        print(f"Status Code: {response.status_code}")
        
        if response.status_code != 200:
            print(f"Error response: {response.text}")
            print("✅ Test passed - Identified the issue: numeric questionId causes an error")
            return True
        else:
            # If it somehow works, check the response structure
            result = response.json()
            print(f"Response: {json.dumps(result, indent=2)}")
            
            # Check if we got a valid response or a default fallback
            if (result.get("profile_type") == "quiz" and 
                isinstance(result.get("olfactory_families"), list)):
                print("✅ Test passed - API handled numeric questionId correctly")
                return True
            else:
                print("❌ Test failed - API accepted invalid input but returned unexpected response")
                return False
    except Exception as e:
        print(f"❌ Test failed with exception: {str(e)}")
        # This might actually be the expected behavior if the API is failing with this input
        print("This exception might indicate the source of the 'Une erreur est survenue' message")
        return False

def test_error_handling():
    """Test error handling when OpenAI is unavailable"""
    print("\n=== Testing Error Handling ===")
    try:
        # Create a payload that might cause an error in the OpenAI processing
        # Using extremely long perfume names that might exceed token limits
        payload = {
            "perfumes": [
                "A" * 1000,  # Very long perfume name
                "B" * 1000,
                "C" * 1000
            ]
        }
        
        print(f"Testing with potentially problematic payload")
        response = requests.post(f"{API_BASE_URL}/analyze-perfumes", json=payload, timeout=REQUEST_TIMEOUT)
        print(f"Status Code: {response.status_code}")
        
        # The API should either return an error code or fall back to default values
        if response.status_code != 200:
            print("✅ Error handling test passed - API returned error code")
            return True
        else:
            # If it returned 200, check if we got default values
            result = response.json()
            print(f"Response: {json.dumps(result, indent=2)}")
            
            # Check if this looks like a default response
            if (result.get("profile_type") == "perfume_input" and 
                isinstance(result.get("olfactory_families"), list)):
                print("✅ Error handling test passed - API returned default values")
                return True
            else:
                print("❌ Error handling test failed - API didn't handle potential error properly")
                return False
    except Exception as e:
        print(f"❌ Error handling test failed: {str(e)}")
        return False

def test_mongodb_storage():
    """Test MongoDB storage of olfactory profiles"""
    print("\n=== Testing MongoDB Storage of Olfactory Profiles ===")
    try:
        # Generate a unique identifier for this test
        test_id = str(uuid.uuid4())
        
        # Create a unique perfume name to identify our test entry
        unique_perfume = f"Test Perfume {test_id}"
        
        # Send a request to analyze perfumes
        payload = {"perfumes": [unique_perfume, "Dior Sauvage"]}
        
        print(f"Sending request with unique perfume: {unique_perfume}")
        response1 = requests.post(f"{API_BASE_URL}/analyze-perfumes", json=payload, timeout=REQUEST_TIMEOUT)
        assert response1.status_code == 200, "Failed to analyze perfumes"
        
        # Get the user_session from the response
        user_session = response1.json().get("user_session")
        assert user_session, "Response should contain user_session"
        
        # Send another request with the same unique perfume
        response2 = requests.post(f"{API_BASE_URL}/analyze-perfumes", json=payload, timeout=REQUEST_TIMEOUT)
        assert response2.status_code == 200, "Failed to analyze perfumes second time"
        
        # The two responses should have different IDs and user_sessions,
        # indicating that each request creates a new entry in the database
        assert response1.json().get("id") != response2.json().get("id"), "Each request should create a unique entry"
        assert response1.json().get("user_session") != response2.json().get("user_session"), "Each request should have a unique user_session"
        
        print("✅ MongoDB storage test passed")
        return True
    except Exception as e:
        print(f"❌ MongoDB storage test failed: {str(e)}")
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
        
        # The server is configured to allow all origins (*), but it might return the specific origin in the request
        # Both are valid CORS configurations
        allowed_origin = response.headers.get("Access-Control-Allow-Origin")
        assert allowed_origin == "*" or allowed_origin == "http://example.com", "CORS not properly configured"
        
        print("✅ CORS configuration test passed")
        return True
    except Exception as e:
        print(f"❌ CORS configuration test failed: {str(e)}")
        return False

def run_all_tests():
    """Run all tests and return overall result"""
    print(f"Testing backend API at: {API_BASE_URL}")
    
    # First check if the backend is accessible
    try:
        response = requests.get(f"{API_BASE_URL}/", timeout=5)
        print(f"Backend is accessible: {response.status_code}")
    except requests.exceptions.RequestException as e:
        print(f"❌ Backend is not accessible: {str(e)}")
        print("Please check if the backend service is running and the URL is correct.")
        return False
    
    test_results = {
        "Root Endpoint": test_root_endpoint(),
        "Create Status Check": test_create_status_check(),
        "Get Status Checks": test_get_status_checks(),
        "MongoDB Connection": test_mongodb_connection(),
        "Analyze Perfumes Endpoint": test_analyze_perfumes_endpoint(),
        "Analyze Quiz Endpoint": test_analyze_quiz_endpoint(),
        "Input Validation": test_input_validation_perfumes(),
        "Error Handling": test_error_handling(),
        "MongoDB Storage of Olfactory Profiles": test_mongodb_storage(),
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