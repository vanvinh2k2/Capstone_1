from .models import *
from auths.models import *
from django.db.models import Min, Max, Count
from django.db.models.functions import ExtractMonth
from .serializers import OrderSerializers

def default(request):

    top_restaurant = ["new", "old", "Ko", "Ok"]
    num_top_restaurant = [1, 5, 8, 3]
    order = Order.objects.values('restaurant__title').annotate(num_restaurant=Count("restaurant")).order_by('-num_restaurant')[:5]
    for order_count in order:
        top_restaurant.append(order_count['restaurant__title'])
        num_top_restaurant.append(order_count['num_restaurant'])

    num_top_order = []
    orders_chart = Order.objects.annotate(month=ExtractMonth("order_date")).values("month").annotate(count=Count("id")).values('month', 'count')
    for i in range(1,13):
        for order_chart in orders_chart:
            if i == order_chart['month']:
                num_top_order.append(order_chart['count'])
            else : num_top_order.append(0)

    orders = Order.objects.all().order_by('-order_date')[:15]
    serialize = OrderSerializers(orders, many=True)

    return {
        'num_client': User.objects.count(),
        'num_restaurant': Restaurant.objects.count(),
        'num_support': ContactUs.objects.count(),
        'num_order': Order.objects.count(),
        'top_restaurant': top_restaurant,
        'num_top_restaurant': num_top_restaurant,
        'num_top_order': num_top_order,
        'current_order': serialize.data
    }