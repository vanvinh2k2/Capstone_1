from rest_framework import serializers
from .models import *
from core.models import Restaurant


class RegisterSerializers(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['username', 'email', 'password']


class LoginSerializes(serializers.ModelSerializer):
    email = serializers.EmailField()

    class Meta:
        model = User
        fields = ['email', 'password']

class LoginRestaurantSerializes(serializers.ModelSerializer):
    email = serializers.EmailField()

    class Meta:
        model = Restaurant
        fields = ['email', 'password']