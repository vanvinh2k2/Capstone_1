from django.shortcuts import render, redirect
from .models import User
from django.http import HttpResponse


# Create your views here.
def change_password(request, token):
    try:
        user = User.objects.get(password_token=token)
        content = {'user_id': user.id}
        if request.method == 'POST':
            new_password = request.POST.get('password')
            renew_password = request.POST.get('re_password')
            user_id = request.POST.get('user_id')

            if new_password != renew_password:
                return redirect(f'/change-password/{token}/')
            else:
                user_obj = User.objects.get(id=user_id)
                user_obj.set_password(new_password)
                user_obj.password_token = None
                user_obj.save()
                return render(request, 'auths/change-success.html')
        return render(request, 'auths/change-password.html', content)
    except:
        return HttpResponse("The Link is not exists!")
