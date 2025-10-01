from django.urls import path
from .views import (SignUpView, LoginView, PasswordResetVerifyView, PasswordResetConfirmView)

urlpatterns=[
    path('signup/',SignUpView.as_view(), name='signup'),
    path('login/', LoginView.as_view(), name='login'),
    path('password-reset/verify/', PasswordResetVerifyView.as_view(), name='password-reset-verify'),
    path('password-reset/confirm/', PasswordResetConfirmView.as_view(), name='password-reset-confirm'),
]