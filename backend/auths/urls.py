
from django.urls import path
from .backend import RegisterAPI, LoginAPI, forget_password,\
login_facebook, login_google, LoginRestaurantAPI, update_password

from .views import change_password
from rest_framework_simplejwt.views import TokenVerifyView, TokenRefreshView

urlpatterns = [
    path('api/register/', RegisterAPI.as_view(), name='register'),
    path('api/login/', LoginAPI.as_view(), name='login'),
    path('api/login/facebook/', login_facebook, name='login-facebook'),
    path('api/login/google/', login_google, name='login-google'),
    path('api/login/restaurant/', LoginRestaurantAPI.as_view(), name='login-restaurant'),
    # path('api/logout/', Logout.as_view(), name='logout'),
    path('api/send-email/', forget_password, name='send-email'),
    path('change-password/<token>/', change_password, name='change-password'),
    path('api/token/verify/', TokenVerifyView.as_view(), name='token_verify'),
    path('api/update-password/<uid>/', update_password, name='update-password'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]