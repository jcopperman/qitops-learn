#!/bin/bash
# Test script for QitOps Learn deployment

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Default URL
URL=${1:-"http://localhost:8080"}

echo -e "${YELLOW}Testing QitOps Learn deployment at $URL${NC}"
echo "----------------------------------------"

# Function to test an endpoint
test_endpoint() {
  local endpoint=$1
  local expected_status=$2
  local description=$3
  
  echo -n "Testing $description ($URL$endpoint)... "
  
  # Make the request and capture status code
  status=$(curl -s -o /dev/null -w "%{http_code}" "$URL$endpoint")
  
  if [ "$status" -eq "$expected_status" ]; then
    echo -e "${GREEN}OK ($status)${NC}"
    return 0
  else
    echo -e "${RED}FAILED (Expected: $expected_status, Got: $status)${NC}"
    return 1
  fi
}

# Test health endpoint
test_endpoint "/health" 200 "Health check endpoint"

# Test home page
test_endpoint "/" 200 "Home page"

# Test basic test page
test_endpoint "/basic-test" 200 "Basic test page"

# Test static asset (this might need adjustment based on your actual asset paths)
test_endpoint "/assets/tailwind-RFcWCXZ3.css" 200 "Static CSS asset" || echo -e "${YELLOW}Note: Asset hash might be different, this is not necessarily an error${NC}"

# Test non-existent page (should return 404 or redirect to home)
test_endpoint "/non-existent-page" 404 "Non-existent page" || test_endpoint "/non-existent-page" 200 "Non-existent page (with fallback)"

echo "----------------------------------------"
echo -e "${YELLOW}Testing complete!${NC}"
