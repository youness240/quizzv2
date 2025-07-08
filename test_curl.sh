#!/bin/bash

# Set the backend URL
BACKEND_URL="http://localhost:8001"
API_BASE_URL="${BACKEND_URL}/api"

echo "Testing backend API at: ${API_BASE_URL}"

# Test root endpoint
echo -e "\n=== Testing Root Endpoint ==="
ROOT_RESPONSE=$(curl -s "${API_BASE_URL}/")
echo "Response: ${ROOT_RESPONSE}"
if [[ "${ROOT_RESPONSE}" == *"Hello World"* ]]; then
    echo "✅ Root endpoint test passed"
else
    echo "❌ Root endpoint test failed"
fi

# Test analyze-perfumes endpoint
echo -e "\n=== Testing Analyze Perfumes Endpoint ==="
PERFUMES_PAYLOAD='{"perfumes": ["Chanel No. 5", "Dior Sauvage", "Tom Ford Black Orchid"]}'
echo "Sending request with payload: ${PERFUMES_PAYLOAD}"
PERFUMES_RESPONSE=$(curl -s -X POST "${API_BASE_URL}/analyze-perfumes" \
    -H "Content-Type: application/json" \
    -d "${PERFUMES_PAYLOAD}")
echo "Response: ${PERFUMES_RESPONSE}"

if [[ "${PERFUMES_RESPONSE}" == *"olfactory_families"* && "${PERFUMES_RESPONSE}" == *"intensity"* && "${PERFUMES_RESPONSE}" == *"sillage"* ]]; then
    echo "✅ Analyze perfumes endpoint test passed"
else
    echo "❌ Analyze perfumes endpoint test failed"
fi

# Test analyze-quiz endpoint
echo -e "\n=== Testing Analyze Quiz Endpoint ==="
QUIZ_PAYLOAD='{"answers": [{"questionId": "q1", "value": "Nature and outdoors"}, {"questionId": "q2", "value": "Evening"}, {"questionId": "q3", "value": "Elegant and sophisticated"}, {"questionId": "q4", "value": "Warm and cozy"}, {"questionId": "q5", "value": "Citrus"}]}'
echo "Sending request with payload: ${QUIZ_PAYLOAD}"
QUIZ_RESPONSE=$(curl -s -X POST "${API_BASE_URL}/analyze-quiz" \
    -H "Content-Type: application/json" \
    -d "${QUIZ_PAYLOAD}")
echo "Response: ${QUIZ_RESPONSE}"

if [[ "${QUIZ_RESPONSE}" == *"olfactory_families"* && "${QUIZ_RESPONSE}" == *"intensity"* && "${QUIZ_RESPONSE}" == *"sillage"* ]]; then
    echo "✅ Analyze quiz endpoint test passed"
else
    echo "❌ Analyze quiz endpoint test failed"
fi

# Test input validation
echo -e "\n=== Testing Input Validation ==="
EMPTY_PAYLOAD='{"perfumes": []}'
EMPTY_RESPONSE=$(curl -s -X POST "${API_BASE_URL}/analyze-perfumes" \
    -H "Content-Type: application/json" \
    -d "${EMPTY_PAYLOAD}")
echo "Empty payload response: ${EMPTY_RESPONSE}"

INVALID_PAYLOAD='{"invalid_field": "test"}'
INVALID_RESPONSE=$(curl -s -X POST "${API_BASE_URL}/analyze-perfumes" \
    -H "Content-Type: application/json" \
    -d "${INVALID_PAYLOAD}")
echo "Invalid payload response: ${INVALID_RESPONSE}"

if [[ "${EMPTY_RESPONSE}" == *"olfactory_families"* || "${INVALID_RESPONSE}" != *"olfactory_families"* ]]; then
    echo "✅ Input validation test passed"
else
    echo "❌ Input validation test failed"
fi

# Test error handling
echo -e "\n=== Testing Error Handling ==="
LONG_PAYLOAD='{"perfumes": ["'$(printf 'A%.0s' {1..1000})'", "'$(printf 'B%.0s' {1..1000})'", "'$(printf 'C%.0s' {1..1000})'"]}'
ERROR_RESPONSE=$(curl -s -X POST "${API_BASE_URL}/analyze-perfumes" \
    -H "Content-Type: application/json" \
    -d "${LONG_PAYLOAD}")
echo "Error handling response: ${ERROR_RESPONSE}"

if [[ "${ERROR_RESPONSE}" == *"olfactory_families"* ]]; then
    echo "✅ Error handling test passed - API returned default values"
else
    echo "❌ Error handling test failed"
fi

# Test MongoDB storage
echo -e "\n=== Testing MongoDB Storage ==="
UNIQUE_ID=$(date +%s)
STORAGE_PAYLOAD='{"perfumes": ["Test Perfume '"${UNIQUE_ID}"'", "Dior Sauvage"]}'
STORAGE_RESPONSE1=$(curl -s -X POST "${API_BASE_URL}/analyze-perfumes" \
    -H "Content-Type: application/json" \
    -d "${STORAGE_PAYLOAD}")
STORAGE_RESPONSE2=$(curl -s -X POST "${API_BASE_URL}/analyze-perfumes" \
    -H "Content-Type: application/json" \
    -d "${STORAGE_PAYLOAD}")

ID1=$(echo "${STORAGE_RESPONSE1}" | grep -o '"id":"[^"]*"' | cut -d'"' -f4)
ID2=$(echo "${STORAGE_RESPONSE2}" | grep -o '"id":"[^"]*"' | cut -d'"' -f4)

if [[ "${ID1}" != "${ID2}" ]]; then
    echo "✅ MongoDB storage test passed - Different IDs for same input"
else
    echo "❌ MongoDB storage test failed - Same IDs for different requests"
fi

echo -e "\n=== Test Summary ==="
echo "All tests completed. Check the results above for details."