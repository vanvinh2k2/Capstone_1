from .models import *
from auths.models import *
from django.db.models import Min, Max, Count

def default(request):
    return {
        'num_client': User.objects.count(),
        'num_restaurant': Restaurant.objects.count(),
        'num_support': ContactUs.objects.count(),
        'num_order': Order.objects.count(),
    }