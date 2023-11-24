from django.contrib import admin
from .models import User, ContactUs


class UserAdmin(admin.ModelAdmin):
    list_display = ['id', 'username', 'email', 'provider', 'is_active', 'is_staff', 'date_joined']


class ContactUsAdmin(admin.ModelAdmin):
    list_display = ['full_name', 'email', 'subject']


# Register your models here.
admin.site.register(User, UserAdmin)
admin.site.register(ContactUs, ContactUsAdmin)
