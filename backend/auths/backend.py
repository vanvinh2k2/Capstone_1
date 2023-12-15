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
from rest_framework.decorators import api_view, permission_classes
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
                    'provider': user.provider,
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
    permission_classes = [permissions.AllowAny]

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
                        'provider': user.provider,
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
    
from PIL import Image
from io import BytesIO
import requests
from django.core.files.base import ContentFile

import re
import unicodedata

def remove_accents(input_str):
    nfkd_form = unicodedata.normalize('NFKD', input_str)
    return ''.join([c for c in nfkd_form if not unicodedata.combining(c)])

def convert_to_username(name):
    # Xóa dấu cách và chuyển đổi tên sang dạng không dấu
    username = re.sub(r'\s', '', remove_accents(name).lower())
    return username

@api_view(['POST'])
@permission_classes([permissions.AllowAny])
def login_facebook(request):
    uid = request.data.get("id")
    email = request.data.get('email')
    image_url = request.data.get('image')
    # Tải hình ảnh từ URL và xử lý
    image_response = requests.get(image_url)
    image_response.raise_for_status()
    image = Image.open(BytesIO(image_response.content))
    image_io = BytesIO()
    image.save(image_io, format='PNG')  # Chọn định dạng phù hợp
    full_name = request.data.get('full_name')
    username = convert_to_username(request.data.get('username'))
    # Kiểm tra xem người dùng đã tồn tại hay chưa
    user, created = User.objects.get_or_create(
            email=email,
            defaults={
                'id': id,
                'full_name': full_name,
                'username': username,
                'provider': "Facebook"
            }
    )
    # Lưu hình ảnh vào trường ImageField
    if created:
        image_file = ContentFile(image_io.getvalue(), name=f"{username}.jpg")
        user.image.save(f"{username}.jpg", image_file, save=True)
    # Tạo hoặc cập nhật thông tin người dùng
    user_data = {
        'id': user.id,
        'username': user.username,
        'full_name': user.full_name,
        'email': user.email,
        'phone': user.phone,
        'password': user.password,
        'is_active': user.is_active,
        'provider': user.provider,
        'verified': user.verified,
        'date_joined': user.date_joined,
        'avatar': get_base_url(request) + user.image.url,
        'token': get_tokens_for_user(user)
    }
    return Response({
        'success': True,
        'message': 'Login success.',
        'data': user_data
    }, status=status.HTTP_200_OK)


@api_view(['POST'])
@permission_classes([permissions.AllowAny])
def login_google(request):
    uid = request.data.get("id")
    email = request.data.get('email')
    image_url = request.data.get('image')
    # Tải hình ảnh từ URL và xử lý
    image_response = requests.get(image_url)
    image_response.raise_for_status()
    image = Image.open(BytesIO(image_response.content))
    image_io = BytesIO()
    image.save(image_io, format='PNG')  # Chọn định dạng phù hợp
    full_name = request.data.get('full_name')
    username = convert_to_username(request.data.get('username'))
    user = None
    # Kiểm tra xem người dùng đã tồn tại hay chưa
    if not User.objects.filter(email=email).exists():
        original_username = username
        counter = 1
        while User.objects.filter(username=username).exists():
            username = f"{original_username}{counter}"
            counter += 1

        user_new = User.objects.create(
            email=email,
            id= uid,
            full_name= full_name,
            username= username,
            provider= "Google"
        )
        image_file = ContentFile(image_io.getvalue(), name=f"{username}.jpg")
        user_new.image.save(f"{username}.jpg", image_file, save=True)
        user = user_new
    else: user = User.objects.get(email=email)
    # Tạo hoặc cập nhật thông tin người dùng
    user_data = {
        'id': user.id,
        'username': user.username,
        'full_name': user.full_name,
        'email': user.email,
        'phone': user.phone,
        'password': user.password,
        'is_active': user.is_active,
        'provider': user.provider,
        'verified': user.verified,
        'date_joined': user.date_joined,
        'avatar': get_base_url(request) + user.image.url,
        'token': get_tokens_for_user(user)
    }
    return Response({
        'success': True,
        'message': 'Login success.',
        'data': user_data
    }, status=status.HTTP_200_OK)


class LoginRestaurantAPI(generics.CreateAPIView):
    queryset = Restaurant.objects.all()
    serializer_class = LoginRestaurantSerializes
    permission_classes = [permissions.AllowAny]

    def create(self, request):
        serialize = self.get_serializer(data=request.data)
        if serialize.is_valid():
            restaurant = Restaurant.objects.filter(email=request.data['email'], password=request.data['password']).first()
            if restaurant is not None:
                return Response({
                    'success': True,
                    'message': 'Login success.',
                    'data': {
                        'rid': restaurant.rid,
                        'title': restaurant.title,
                        'image': get_base_url(request) + restaurant.image.url,
                        'email': restaurant.email,
                        'username': restaurant.username,
                        'phone': restaurant.phone,
                        'password': restaurant.password
                    }
                }, status=status.HTTP_200_OK)
            else:
                return Response({
                    'success': False,
                    'message': 'Restaurant is not exists!'
                }, status=status.HTTP_200_OK)

        return Response({
            'success': False,
            'message': 'Enter a valid email address!'
        }, status=status.HTTP_200_OK)


# class Logout(APIView):
#     @permission_classes([permissions.AllowAny])
#     def post(self, request):
#         refresh_token = request.data['refresh']
#         if refresh_token:
#             try:
#                 token = RefreshToken(refresh_token)  # Tạo đối tượng RefreshToken từ chuỗi refresh_token
#                 token.check_blacklist()  # Kiểm tra xem token đã tồn tại trong đen danh chưa
#             except (TokenError, InvalidToken) as e:
#                 return Response({'success': False, 'message': str(e)}, status=status.HTTP_400_BAD_REQUEST)
#             token.blacklist()
#             return Response({'success': True,
#                              'message': 'Logout successful.'
#                              }, status=status.HTTP_200_OK)
#         else:
#             return Response({'success': False,
#                              'message': 'Refresh token is required.'
#                              }, status=status.HTTP_400_BAD_REQUEST)


@api_view(["POST"])
@permission_classes([permissions.AllowAny])
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
