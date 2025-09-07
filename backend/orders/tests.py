from django.contrib.auth.models import User
from rest_framework.test import APITestCase, APIClient
from rest_framework import status
from products.models import Product
from .models import Order, OrderItem
from decimal import Decimal

class SimpleOrderTests(APITestCase):

    # Test 1: Successful Order Creation
    def test_a_logged_in_user_can_create_an_order(self):
        print("Running test: Successful Order Creation")
        # Create a user and make them active so they can be "logged in".
        user = User.objects.create_user(username='testuser', email='test@example.com', password='password123')
        user.is_active = True
        user.save()

        # Create a product that can be added to the cart.
        product = Product.objects.create(name='Simple T-Shirt', category='clothes', new_price=Decimal('25.50'), image='shirt.png')

        # We need to simulate a logged-in user.
        client = APIClient()
        client.force_authenticate(user=user)

        # This is the data our frontend would send.
        url = '/api/create-order/'
        order_data = {
            "cart": [{"id": product.id, "quantity": 2}],
            "shippingAddress": {
                "first_name": "Test",
                "last_name": "User",
                "email": "test@example.com",
                "phone": "+15551234567",
                "address": "123 Main St",
                "city": "Anytown",
                "zip_code": "12345"
            }
        }
        
        response = client.post(url, order_data, format='json')

        # Check: Did we get a "201 Created" response?
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

        # Check: Was exactly one Order created in the database?
        self.assertEqual(Order.objects.count(), 1)
        
        # Check: Was exactly one OrderItem created in the database?
        self.assertEqual(OrderItem.objects.count(), 1)
        
        # Check: Does the new order have the correct total price?
        new_order = Order.objects.get()
        self.assertEqual(new_order.order_total, Decimal('51.00'))
        
        # Check: Does the new order belong to the correct user?
        self.assertEqual(new_order.user, user)

    # Test 2: Blocking an Unauthenticated User
    def test_a_guest_user_cannot_create_an_order(self):
        print("Running test: Block Guest from Creating Order")
   
        product = Product.objects.create(name='Another T-Shirt', category='clothes', new_price=Decimal('10.00'), image='shirt2.png')


        # This time, we use a regular client that is NOT authenticated.
        client = APIClient() 
        
        url = '/api/create-order/'
        order_data = {
            "cart": [{"id": product.id, "quantity": 1}],
            "shippingAddress": {"first_name": "Guest", "address": "...", "city": "...", "zip_code": "..."}
        }
        
        response = client.post(url, order_data, format='json')


        # Check: Did we get a "401 Unauthorized" error?
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        
        # Check: Was no order created in the database?
        self.assertEqual(Order.objects.count(), 0)