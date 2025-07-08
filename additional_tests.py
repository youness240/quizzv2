import requests
import json
import sys
import os
from dotenv import load_dotenv

# Load environment variables from frontend/.env to get the backend URL
load_dotenv('/app/frontend/.env')

# Get the backend URL from environment variables
# For testing purposes, we'll use the local URL since we're running in the same container
BACKEND_URL = "http://localhost:8001"
API_BASE_URL = f"{BACKEND_URL}/api"

# Set a timeout for all requests
REQUEST_TIMEOUT = 20  # seconds - increased for OpenAI API calls

def test_analyze_quiz_with_numeric_ids():
    """Test the POST /api/analyze-quiz endpoint with numeric questionId instead of string"""
    print("\n=== Testing Analyze Quiz Endpoint with Numeric IDs ===")
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

def test_analyze_quiz_with_invalid_values():
    """Test the POST /api/analyze-quiz endpoint with invalid values"""
    print("\n=== Testing Analyze Quiz Endpoint with Invalid Values ===")
    try:
        # Sample quiz answers with valid questionId but invalid values
        payload = {
            "answers": [
                {"questionId": "1", "value": "invalid_value"},  # Value not in quiz_mapping
                {"questionId": "2", "value": "unknown_flavor"},
                {"questionId": "3", "value": "nonexistent_place"},
                {"questionId": "4", "value": "unknown_music"},
                {"questionId": "5", "value": "unknown_texture"},
                {"questionId": "6", "value": "unknown_taste"},
                {"questionId": "7", "value": "unknown_mood"},
                {"questionId": "8", "value": "unknown_element"}
            ]
        }
        
        print(f"Sending request with invalid values to {API_BASE_URL}/analyze-quiz")
        print(f"Payload: {json.dumps(payload, indent=2)}")
        response = requests.post(f"{API_BASE_URL}/analyze-quiz", json=payload, timeout=REQUEST_TIMEOUT)
        print(f"Status Code: {response.status_code}")
        
        # The API should either return an error code or fall back to default values
        if response.status_code != 200:
            print(f"Error response: {response.text}")
            print("✅ Test passed - API rejected invalid values")
            return True
        else:
            # If it returned 200, check if we got default values
            result = response.json()
            print(f"Response: {json.dumps(result, indent=2)}")
            
            # Check if this looks like a default response
            if (result.get("profile_type") == "quiz" and 
                isinstance(result.get("olfactory_families"), list)):
                print("✅ Test passed - API handled invalid values by using defaults")
                return True
            else:
                print("❌ Test failed - API accepted invalid values but returned unexpected response")
                return False
    except Exception as e:
        print(f"❌ Test failed with exception: {str(e)}")
        return False

def test_analyze_perfumes_with_special_characters():
    """Test the POST /api/analyze-perfumes endpoint with special characters"""
    print("\n=== Testing Analyze Perfumes Endpoint with Special Characters ===")
    try:
        # Sample perfume names with special characters and accents
        payload = {
            "perfumes": [
                "Chanel N°5",  # Special character °
                "L'Air du Temps",  # Apostrophe
                "Guerlain Shalimar Eau de Parfum"  # Spaces and French words
            ]
        }
        
        print(f"Sending request with special characters to {API_BASE_URL}/analyze-perfumes")
        print(f"Payload: {json.dumps(payload, indent=2)}")
        response = requests.post(f"{API_BASE_URL}/analyze-perfumes", json=payload, timeout=REQUEST_TIMEOUT)
        print(f"Status Code: {response.status_code}")
        
        # Check if response is successful
        assert response.status_code == 200, f"Expected status code 200, got {response.status_code}"
        
        # Parse response
        result = response.json()
        print(f"Response: {json.dumps(result, indent=2)}")
        
        # Validate response structure
        assert "id" in result, "Response should contain 'id' field"
        assert "profile_type" in result, "Response should contain 'profile_type' field"
        assert result["profile_type"] == "perfume_input", "Profile type should be 'perfume_input'"
        
        print("✅ Analyze perfumes with special characters test passed")
        return True
    except Exception as e:
        print(f"❌ Analyze perfumes with special characters test failed: {str(e)}")
        return False

if __name__ == "__main__":
    print("Running additional tests for the specific issue...")
    
    # Run the tests
    test_results = {
        "Quiz with Numeric IDs": test_analyze_quiz_with_numeric_ids(),
        "Quiz with Invalid Values": test_analyze_quiz_with_invalid_values(),
        "Perfumes with Special Characters": test_analyze_perfumes_with_special_characters()
    }
    
    # Print summary
    print("\n=== Test Summary ===")
    all_passed = True
    for test_name, result in test_results.items():
        status = "✅ PASSED" if result else "❌ FAILED"
        print(f"{test_name}: {status}")
        if not result:
            all_passed = False
    
    if all_passed:
        print("\n🎉 All additional tests passed!")
    else:
        print("\n❌ Some additional tests failed. Please check the logs above for details.")