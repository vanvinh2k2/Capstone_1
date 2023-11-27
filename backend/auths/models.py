from django.db import models
from shortuuid.django_fields import ShortUUIDField
from django.contrib.auth.models import AbstractUser
from django.utils.html import mark_safe


# Create your models here.
class User(AbstractUser):
    email = models.EmailField(unique=True)
    image = models.ImageField(upload_to="image", default="image/default.png")
    full_name = models.CharField(max_length=200, null=True, blank=True)
    phone = models.CharField(max_length=15, null=True, blank=True)
    provider = models.CharField(max_length=50, default="Email")
    verified = models.BooleanField(default=False)
    password_token = models.CharField(max_length=50, null=True, blank=True)
    address = models.CharField(max_length=100, null=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    def __str__(self):
        return self.username


class ContactUs(models.Model):
    full_name = models.CharField(max_length=200)
    email = models.CharField(max_length=200)
    phone = models.CharField(max_length=200)
    subject = models.CharField(max_length=200)
    message = models.TextField(max_length=1000)

    class Meta:
        verbose_name = "Contact Us"
        verbose_name_plural = "Contact Us"

    def __str__(self):
        return self.full_name
