from .serializers import *
from .models import *
from django.contrib.auth import authenticate
from django.http import HttpRequest
from uuid import uuid4
from .hepper import send_forget_password_mail

from rest_framework import status, generics, permissions
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.exceptions import TokenError, InvalidToken
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from core.models import *


def get_base_url(request):
    absolute_url = HttpRequest.build_absolute_uri(request)
    base_url = absolute_url.split(request.get_full_path())[0]
    return base_url


def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)
    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }


class RegisterAPI(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializers
    permission_classes = [permissions.AllowAny]

    def create(self, request):
        serialize = self.get_serializer(data=request.data)
        if serialize.is_valid():
            user = serialize.save()
            user.set_password(request.data['password'])
            user.save()
            token = get_tokens_for_user(user)
            return Response({
                'success': True,
                'message': 'Create account successful.',
                'data': {
                    'id': user.id,
                    'username': user.username,
                    'email': user.email,
                    'is_active': user.is_active,
                    'date_joined': user.date_joined,
                    'avatar': get_base_url(request) + user.image.url,
                    'token': token
                },
            }, status=status.HTTP_200_OK)

        return Response({
            'success': False,
            'message': 'Create account fail!'
        }, status=status.HTTP_200_OK)


class LoginAPI(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = LoginSerializes
    permissions = [permissions.AllowAny]

    def create(self, request):
        serialize = self.get_serializer(data=request.data)
        if serialize.is_valid():
            user = authenticate(request, email=request.data['email'], password=request.data['password'])
            if user is not None:
                token = get_tokens_for_user(user)
                return Response({
                    'success': True,
                    'message': 'Login success.',
                    'data': {
                        'id': user.id,
                        'username': user.username,
                        'full_name': user.full_name,
                        'email': user.email,
                        'phone': user.phone,
                        'password': user.password,
                        'is_active': user.is_active,
                        'verified': user.verified,
                        'date_joined': user.date_joined,
                        'avatar': get_base_url(request) + user.image.url,
                        'token': token
                    }
                }, status=status.HTTP_200_OK)
            else:
                return Response({
                    'success': False,
                    'message': 'User is not exists!'
                }, status=status.HTTP_200_OK)

        return Response({
            'success': False,
            'message': 'Enter a valid email address!'
        }, status=status.HTTP_200_OK)
    

class LoginRestaurantAPI(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = LoginSerializes
    permissions = [permissions.AllowAny]

    def create(self, request):
        serialize = self.get_serializer(data=request.data)
        if serialize.is_valid():
            user = authenticate(request, email=request.data['email'], password=request.data['password'])
            if user is not None and user.is_restaurant is True:
                restaurant = Restaurant.objects.get(user=user)
                print(restaurant)
                token = get_tokens_for_user(user)
                return Response({
                    'success': True,
                    'message': 'Login success.',
                    'data': {
                        'id': user.id,
                        'username': user.username,
                        'full_name': user.full_name,
                        'rid': restaurant.rid,
                        'title': restaurant.title,
                        'image': get_base_url(request) + restaurant.image.url,
                        'email': user.email,
                        'phone': user.phone,
                        'password': user.password,
                        'is_active': user.is_active,
                        'verified': user.verified,
                        'date_joined': user.date_joined,
                        'avatar': get_base_url(request) + user.image.url,
                        'token': token
                    }
                }, status=status.HTTP_200_OK)
            else:
                return Response({
                    'success': False,
                    'message': 'User is not exists!'
                }, status=status.HTTP_200_OK)

        return Response({
            'success': False,
            'message': 'Enter a valid email address!'
        }, status=status.HTTP_200_OK)


class Logout(APIView):
    def post(self, request):
        refresh_token = request.data['refresh']
        if refresh_token:
            try:
                token = RefreshToken(refresh_token)  # Tạo đối tượng RefreshToken từ chuỗi refresh_token
                token.check_blacklist()  # Kiểm tra xem token đã tồn tại trong đen danh chưa
            except (TokenError, InvalidToken) as e:
                return Response({'success': False, 'message': str(e)}, status=status.HTTP_400_BAD_REQUEST)
            token.blacklist()
            return Response({'success': True,
                             'message': 'Logout successful.'
                             }, status=status.HTTP_200_OK)
        else:
            return Response({'success': False,
                             'message': 'Refresh token is required.'
                             }, status=status.HTTP_400_BAD_REQUEST)


@api_view(["POST"])
def forget_password(request, *args, **kwargs):
    email = request.data.get('email')
    try:
        user = User.objects.get(email=email)
        token = str(uuid4())
        user.password_token = token
        user.save()
        send_forget_password_mail(user, token)
        return Response({
            'success': True,
            'message': "Check your Email."
        })
    except:
        return Response({
            'success': False,
            'message': "User is not Exist."
        })
