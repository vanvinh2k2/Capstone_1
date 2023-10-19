
from django.urls import path
from .backend import RegisterAPI, LoginAPI, Logout, forget_password, LoginRestaurantAPI
from .views import change_password

urlpatterns = [
    path('api/register/', RegisterAPI.as_view(), name='register'),
    path('api/login/', LoginAPI.as_view(), name='login'),
    path('api/login/restaurant/', LoginRestaurantAPI.as_view(), name='login-restaurant'),
    path('api/logout/', Logout.as_view(), name='logout'),
    path('api/send-email/', forget_password, name='send-email'),
    path('change-password/<token>/', change_password, name='change-password')
]