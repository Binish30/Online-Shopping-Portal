# users/views.py

from django.contrib.auth.models import User
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken

class SignUpView(APIView):
    
    def post(self, request):
        # --- 1. Data Extraction ---
        first_name = request.data.get('first_name', '').strip()
        last_name = request.data.get('last_name', '').strip()
        email = request.data.get('email', '').strip()
        password = request.data.get('password')
        phone = request.data.get('phone') # This is received but not used yet

        # --- 2. Validation Checks ---
        if not first_name or not email or not password:
            return Response(
                {'errors': 'First Name, Email, and Password are required fields.'},
                status=status.HTTP_400_BAD_REQUEST
            )

        if User.objects.filter(email=email).exists():
            return Response(
                {'errors': 'A user with this email already exists.'},
                status=status.HTTP_400_BAD_REQUEST
            )

        # --- 3. Username Generation (This is now in the correct place) ---
        base_username = f"{first_name.lower()}{last_name.lower() if last_name else ''}"
        
        if not base_username:
            base_username = email.split('@')[0].lower()

        username = base_username
        counter = 1
        while User.objects.filter(username=username).exists():
            username = f"{base_username}{counter}"
            counter += 1

        # --- 4. User Creation ---
        try:
            user = User.objects.create_user(
                username=username, 
                email=email, 
                password=password,
                first_name=first_name,
                last_name=last_name
            )
            user.is_active = False
            user.save()

            return Response(
                {'success': 'Registration successful! Your account is pending admin approval.'}, 
                status=status.HTTP_201_CREATED
            )
        except Exception as e:
            return Response(
                {'errors': str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


class LoginView(APIView):

    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')

        if not email or not password:
            return Response(
                {'errors': 'Email and password are required.'},
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            return Response(
                {'errors': 'Invalid email or password.'},
                status=status.HTTP_401_UNAUTHORIZED
            )

        if not user.check_password(password):
            return Response(
                {'errors': 'Invalid email or password.'},
                status=status.HTTP_401_UNAUTHORIZED
            )
            
        if not user.is_active:
            return Response(
                {'errors': 'Your account is pending admin approval.'},
                status=status.HTTP_401_UNAUTHORIZED
            )

        refresh = RefreshToken.for_user(user)
        return Response({
            'success': True,
            'token': str(refresh.access_token),
            'username': user.first_name
        })