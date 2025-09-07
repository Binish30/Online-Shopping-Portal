from django.contrib.auth.models import User
from rest_framework.test import APITestCase
from rest_framework import status

class SimpleUserAuthTests(APITestCase):

    # Test 1: Successful Signup
    def test_a_user_can_sign_up_successfully(self):
        print("Running test: Successful Signup")
        url = '/api/signup/'
        data = {
            "first_name": "Test",
            "last_name": "User",
            "email": "test@example.com",
            "password": "password123"
        }
        
        response = self.client.post(url, data, format='json')
        

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

        self.assertTrue(User.objects.filter(email="test@example.com").exists())

        new_user = User.objects.get(email="test@example.com")
        self.assertEqual(new_user.is_active, False)

    # Test 2: Signup with an Email That's Already Taken
    def test_signup_fails_if_email_already_exists(self):
        print("Running test: Signup with Existing Email")

        User.objects.create_user(username="existinguser", email="test@example.com", password="password")
        
        url = '/api/signup/'
        data = {
            "first_name": "Another",
            "last_name": "Person",
            "email": "test@example.com", 
            "password": "anotherpassword"
        }
        
        response = self.client.post(url, data, format='json')


        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

        self.assertEqual(response.data['errors'], 'A user with this email already exists.')

        
    # Test 3: Login with an Approved (Active) User
    def test_login_succeeds_for_active_user(self):
        print("Running test: Successful Login")
        user = User.objects.create_user(username="activeuser", email="active@example.com", password="password123", first_name="Active")
        user.is_active = True
        user.save()
        url = '/api/login/'
        data = {"email": "active@example.com", "password": "password123"}
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('token', response.data)
        self.assertEqual(response.data['username'], 'Active')