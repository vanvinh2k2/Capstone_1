from django.db import models
from auths.models import *

# Create your models here.
class Chatbot(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    body_bot = models.TextField()
    body_user = models.TextField()
    date  = models.DateTimeField(auto_now_add=True)

