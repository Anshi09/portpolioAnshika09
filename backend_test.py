#!/usr/bin/env python3
"""
Backend API Testing for Anshika Rana's Portfolio Contact Form
Tests the contact form submission and retrieval APIs
"""

import requests
import json
import time
from datetime import datetime
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv('/app/frontend/.env')

# Get backend URL from environment
BACKEND_URL = os.getenv('REACT_APP_BACKEND_URL', 'http://localhost:8001')
API_BASE = f"{BACKEND_URL}/api"

print(f"Testing backend at: {API_BASE}")
print("=" * 60)

class ContactFormTester:
    def __init__(self):
        self.base_url = API_BASE
        self.created_submissions = []
        
    def test_valid_submission(self):
        """Test POST /api/contact with valid data"""
        print("\n🧪 Testing Valid Contact Form Submission")
        print("-" * 40)
        
        valid_data = {
            "name": "Anshika Rana",
            "email": "anshika.rana@example.com",
            "company": "Tech Solutions Inc",
            "projectType": "mobile",
            "budget": "10k-25k",
            "message": "I need a React Native app for my business with AI integration features."
        }
        
        try:
            response = requests.post(f"{self.base_url}/contact", json=valid_data)
            print(f"Status Code: {response.status_code}")
            print(f"Response: {response.text}")
            
            if response.status_code == 201:
                data = response.json()
                if data.get('success') and data.get('submissionId'):
                    self.created_submissions.append(data['submissionId'])
                    print("✅ Valid submission test PASSED")
                    return True
                else:
                    print("❌ Response missing required fields")
                    return False
            else:
                print(f"❌ Expected 201, got {response.status_code}")
                return False
                
        except Exception as e:
            print(f"❌ Request failed: {str(e)}")
            return False
    
    def test_missing_required_fields(self):
        """Test validation errors for missing required fields"""
        print("\n🧪 Testing Missing Required Fields")
        print("-" * 40)
        
        test_cases = [
            {"email": "test@example.com", "projectType": "web", "message": "Test message here"},  # Missing name
            {"name": "John Doe", "projectType": "web", "message": "Test message here"},  # Missing email
            {"name": "John Doe", "email": "test@example.com", "message": "Test message here"},  # Missing projectType
            {"name": "John Doe", "email": "test@example.com", "projectType": "web"},  # Missing message
        ]
        
        missing_fields = ["name", "email", "projectType", "message"]
        all_passed = True
        
        for i, test_data in enumerate(test_cases):
            try:
                response = requests.post(f"{self.base_url}/contact", json=test_data)
                print(f"Missing {missing_fields[i]} - Status: {response.status_code}")
                
                if response.status_code == 422:
                    print(f"✅ Correctly rejected missing {missing_fields[i]}")
                else:
                    print(f"❌ Should have returned 422 for missing {missing_fields[i]}")
                    all_passed = False
                    
            except Exception as e:
                print(f"❌ Request failed for missing {missing_fields[i]}: {str(e)}")
                all_passed = False
        
        return all_passed
    
    def test_invalid_email_format(self):
        """Test invalid email format validation"""
        print("\n🧪 Testing Invalid Email Format")
        print("-" * 40)
        
        invalid_emails = ["invalid-email", "test@", "@example.com", "test.example.com"]
        all_passed = True
        
        for email in invalid_emails:
            test_data = {
                "name": "Test User",
                "email": email,
                "projectType": "web",
                "message": "This is a test message with more than 10 characters"
            }
            
            try:
                response = requests.post(f"{self.base_url}/contact", json=test_data)
                print(f"Email '{email}' - Status: {response.status_code}")
                
                if response.status_code == 422:
                    print(f"✅ Correctly rejected invalid email: {email}")
                else:
                    print(f"❌ Should have rejected invalid email: {email}")
                    all_passed = False
                    
            except Exception as e:
                print(f"❌ Request failed for email {email}: {str(e)}")
                all_passed = False
        
        return all_passed
    
    def test_message_length_validation(self):
        """Test message minimum length validation"""
        print("\n🧪 Testing Message Length Validation")
        print("-" * 40)
        
        # Test message too short (less than 10 characters)
        short_message_data = {
            "name": "Test User",
            "email": "test@example.com",
            "projectType": "web",
            "message": "Short"  # Only 5 characters
        }
        
        try:
            response = requests.post(f"{self.base_url}/contact", json=short_message_data)
            print(f"Short message - Status: {response.status_code}")
            
            if response.status_code == 400:
                print("✅ Correctly rejected short message")
                return True
            else:
                print("❌ Should have rejected message less than 10 characters")
                return False
                
        except Exception as e:
            print(f"❌ Request failed: {str(e)}")
            return False
    
    def test_invalid_project_type(self):
        """Test invalid projectType validation"""
        print("\n🧪 Testing Invalid Project Type")
        print("-" * 40)
        
        invalid_data = {
            "name": "Test User",
            "email": "test@example.com",
            "projectType": "invalid_type",  # Not in allowed list
            "message": "This is a test message with more than 10 characters"
        }
        
        try:
            response = requests.post(f"{self.base_url}/contact", json=invalid_data)
            print(f"Invalid project type - Status: {response.status_code}")
            
            if response.status_code == 400:
                print("✅ Correctly rejected invalid project type")
                return True
            else:
                print("❌ Should have rejected invalid project type")
                return False
                
        except Exception as e:
            print(f"❌ Request failed: {str(e)}")
            return False
    
    def test_invalid_budget(self):
        """Test invalid budget validation"""
        print("\n🧪 Testing Invalid Budget")
        print("-" * 40)
        
        invalid_data = {
            "name": "Test User",
            "email": "test@example.com",
            "projectType": "web",
            "budget": "invalid_budget",  # Not in allowed list
            "message": "This is a test message with more than 10 characters"
        }
        
        try:
            response = requests.post(f"{self.base_url}/contact", json=invalid_data)
            print(f"Invalid budget - Status: {response.status_code}")
            
            if response.status_code == 400:
                print("✅ Correctly rejected invalid budget")
                return True
            else:
                print("❌ Should have rejected invalid budget")
                return False
                
        except Exception as e:
            print(f"❌ Request failed: {str(e)}")
            return False
    
    def create_multiple_submissions(self):
        """Create multiple submissions for GET endpoint testing"""
        print("\n🧪 Creating Multiple Submissions for GET Testing")
        print("-" * 40)
        
        submissions = [
            {
                "name": "Alice Johnson",
                "email": "alice@techcorp.com",
                "company": "TechCorp",
                "projectType": "web",
                "budget": "25k-50k",
                "message": "Need a comprehensive web application with dashboard features."
            },
            {
                "name": "Bob Smith",
                "email": "bob@startup.io",
                "projectType": "mobile",
                "budget": "5k-10k",
                "message": "Looking for a simple mobile app for our startup business."
            },
            {
                "name": "Carol Davis",
                "email": "carol@aicompany.com",
                "company": "AI Company",
                "projectType": "aiml",
                "budget": "over50k",
                "message": "We need advanced AI/ML integration for our existing platform."
            }
        ]
        
        created_count = 0
        for submission in submissions:
            try:
                response = requests.post(f"{self.base_url}/contact", json=submission)
                if response.status_code == 201:
                    data = response.json()
                    if data.get('submissionId'):
                        self.created_submissions.append(data['submissionId'])
                        created_count += 1
                        print(f"✅ Created submission for {submission['name']}")
                else:
                    print(f"❌ Failed to create submission for {submission['name']}")
            except Exception as e:
                print(f"❌ Error creating submission for {submission['name']}: {str(e)}")
        
        print(f"Created {created_count} additional submissions")
        return created_count > 0
    
    def test_get_all_submissions(self):
        """Test GET /api/contact to retrieve all submissions"""
        print("\n🧪 Testing GET All Submissions")
        print("-" * 40)
        
        try:
            response = requests.get(f"{self.base_url}/contact")
            print(f"Status Code: {response.status_code}")
            
            if response.status_code == 200:
                data = response.json()
                print(f"Response keys: {list(data.keys())}")
                
                if data.get('success') and 'count' in data and 'submissions' in data:
                    print(f"✅ GET endpoint working - Found {data['count']} submissions")
                    print(f"Submissions array length: {len(data['submissions'])}")
                    return True
                else:
                    print("❌ Response missing required fields (success, count, submissions)")
                    return False
            else:
                print(f"❌ Expected 200, got {response.status_code}")
                return False
                
        except Exception as e:
            print(f"❌ Request failed: {str(e)}")
            return False
    
    def test_get_submissions_with_filters(self):
        """Test GET /api/contact with status filter"""
        print("\n🧪 Testing GET Submissions with Status Filter")
        print("-" * 40)
        
        # Test filtering by status
        try:
            response = requests.get(f"{self.base_url}/contact?status=new")
            print(f"Filter by status=new - Status: {response.status_code}")
            
            if response.status_code == 200:
                data = response.json()
                if data.get('success'):
                    print(f"✅ Status filter working - Found {data['count']} new submissions")
                    return True
                else:
                    print("❌ Response missing success field")
                    return False
            else:
                print(f"❌ Expected 200, got {response.status_code}")
                return False
                
        except Exception as e:
            print(f"❌ Request failed: {str(e)}")
            return False
    
    def test_get_submissions_pagination(self):
        """Test GET /api/contact with pagination"""
        print("\n🧪 Testing GET Submissions with Pagination")
        print("-" * 40)
        
        try:
            response = requests.get(f"{self.base_url}/contact?limit=2&skip=0")
            print(f"Pagination (limit=2, skip=0) - Status: {response.status_code}")
            
            if response.status_code == 200:
                data = response.json()
                if data.get('success') and len(data.get('submissions', [])) <= 2:
                    print(f"✅ Pagination working - Returned {len(data['submissions'])} submissions")
                    return True
                else:
                    print("❌ Pagination not working correctly")
                    return False
            else:
                print(f"❌ Expected 200, got {response.status_code}")
                return False
                
        except Exception as e:
            print(f"❌ Request failed: {str(e)}")
            return False
    
    def test_database_verification(self):
        """Verify submissions are stored in database by retrieving them"""
        print("\n🧪 Testing Database Storage Verification")
        print("-" * 40)
        
        if not self.created_submissions:
            print("❌ No submissions created to verify")
            return False
        
        try:
            # Get all submissions and check if our created ones exist
            response = requests.get(f"{self.base_url}/contact")
            
            if response.status_code == 200:
                data = response.json()
                stored_ids = [sub.get('id') for sub in data.get('submissions', [])]
                
                found_count = 0
                for submission_id in self.created_submissions:
                    if submission_id in stored_ids:
                        found_count += 1
                
                print(f"Created {len(self.created_submissions)} submissions")
                print(f"Found {found_count} in database")
                
                if found_count == len(self.created_submissions):
                    print("✅ All submissions properly stored in database")
                    return True
                else:
                    print("❌ Some submissions not found in database")
                    return False
            else:
                print(f"❌ Could not retrieve submissions for verification")
                return False
                
        except Exception as e:
            print(f"❌ Database verification failed: {str(e)}")
            return False
    
    def run_all_tests(self):
        """Run all contact form API tests"""
        print("🚀 Starting Contact Form API Tests")
        print("=" * 60)
        
        test_results = {}
        
        # Test valid submission first
        test_results['valid_submission'] = self.test_valid_submission()
        
        # Test validation errors
        test_results['missing_fields'] = self.test_missing_required_fields()
        test_results['invalid_email'] = self.test_invalid_email_format()
        test_results['message_length'] = self.test_message_length_validation()
        test_results['invalid_project_type'] = self.test_invalid_project_type()
        test_results['invalid_budget'] = self.test_invalid_budget()
        
        # Create multiple submissions for GET testing
        test_results['create_multiple'] = self.create_multiple_submissions()
        
        # Test GET endpoints
        test_results['get_all'] = self.test_get_all_submissions()
        test_results['get_filtered'] = self.test_get_submissions_with_filters()
        test_results['get_paginated'] = self.test_get_submissions_pagination()
        
        # Test database verification
        test_results['database_verification'] = self.test_database_verification()
        
        # Summary
        print("\n" + "=" * 60)
        print("📊 TEST RESULTS SUMMARY")
        print("=" * 60)
        
        passed = sum(1 for result in test_results.values() if result)
        total = len(test_results)
        
        for test_name, result in test_results.items():
            status = "✅ PASS" if result else "❌ FAIL"
            print(f"{test_name.replace('_', ' ').title()}: {status}")
        
        print(f"\nOverall: {passed}/{total} tests passed")
        
        if passed == total:
            print("🎉 ALL TESTS PASSED! Contact Form API is working correctly.")
        else:
            print("⚠️  Some tests failed. Check the details above.")
        
        return test_results

if __name__ == "__main__":
    tester = ContactFormTester()
    results = tester.run_all_tests()