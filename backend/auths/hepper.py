from django.core.mail import send_mail
from django.conf import settings
from django.http import HttpRequest

def get_base_url(request):
    absolute_url = HttpRequest.build_absolute_uri(request)
    base_url = absolute_url.split(request.get_full_path())[0]
    return base_url


def send_forget_password_mail(request, email, token):
    subject = 'Your forget password link'
    host = get_base_url(request)
    message = f'Hi, click on the link to reset your password {host}/auth/change-password/{token}/'
    email_from = settings.EMAIL_HOST_USER
    recipient_list = [email.email, ]
    send_mail(subject, message, email_from, recipient_list)
    return True
