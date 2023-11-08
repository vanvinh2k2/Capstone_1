from .serializers import *
from .models import *
from django.http import HttpRequest
import json

from rest_framework import status, permissions, generics
from rest_framework.decorators import api_view
from rest_framework.response import Response

def get_base_url(request):
    absolute_url = HttpRequest.build_absolute_uri(request)
    base_url = absolute_url.split(request.get_full_path())[0]
    return base_url

# API for User
class RestaurantHotAPI(generics.ListAPIView, generics.RetrieveAPIView):
    queryset = Restaurant.objects.filter(is_hot=True)
    serializer_class = RestaurantSerializers
    permission_classes = [permissions.AllowAny]
    lookup_field = 'rid'

    def get(self, request, *args, **kwargs):
        rid = kwargs.get('rid')
        if rid is None:
            queryset = self.get_queryset()
            serialize = self.serializer_class(queryset, many=True, context={'request': request})

            return Response({'success': True,
                             'message': 'Get list restaurant hot successfully.',
                             'data': serialize.data
                             }, status=status.HTTP_200_OK)
        else:
            instance = self.get_object()
            serialize = RestaurantSerializers(instance, context={'request': request})
            return Response({'success': True,
                             'message': 'Get detail restaurant hot successfully.',
                             'data': serialize.data
                             }, status=status.HTTP_200_OK)


class RestaurantAPI(generics.ListAPIView, generics.RetrieveAPIView):
    queryset = Restaurant.objects.all()
    serializer_class = RestaurantSerializers
    permission_classes = [permissions.AllowAny]
    lookup_field = 'rid'

    def get(self, request, *args, **kwargs):
        rid = kwargs.get('rid')
        if rid is None:
            queryset = self.get_queryset()
            serialize = self.serializer_class(queryset, many=True, context={'request': request})
            return Response({'success': True,
                             'message': 'Get list restaurants successfully.',
                             'data': serialize.data
                             }, status=status.HTTP_200_OK)
        else:
            instance = self.get_object()
            serialize = RestaurantSerializers(instance, context={'request': request})
            return Response({'success': True,
                             'message': 'Get detail restaurant successfully.',
                             'data': serialize.data
                             }, status=status.HTTP_200_OK)


class DishesHotAPI(generics.ListAPIView, generics.RetrieveAPIView):
    queryset = Dish.objects.filter(featured=True)
    serializer_class = DishesSerializers
    permission_classes = [permissions.AllowAny]
    lookup_field = 'did'

    def get(self, request, *args, **kwargs):
        did = kwargs.get('did')
        if did is None:
            query_set = self.get_queryset()
            serialize = self.serializer_class(query_set, context={'request': request}, many=True)
            return Response({'success': True,
                             'message': 'Get list dish featured successfully.',
                             'data': serialize.data
                             }, status=status.HTTP_200_OK)
        else:
            instance = self.get_object()
            serialize = DishesSerializers(instance, context={'request': request})
            return Response({'success': True,
                             'message': 'Get detail dish featured successfully.',
                             'data': serialize.data
                             }, status=status.HTTP_200_OK)


class DishesAPI(generics.ListAPIView, generics.RetrieveAPIView):
    queryset = Dish.objects.all()
    serializer_class = DishesSerializers
    permission_classes = [permissions.AllowAny]
    lookup_field = 'did'

    def get(self, request, *args, **kwargs):
        did = kwargs.get('did')
        if did is None:
            query_set = self.get_queryset()
            serialize = self.serializer_class(query_set, context={'request': request}, many=True)
            return Response({'success': True,
                             'message': 'Get list dish successfully.',
                             'data': serialize.data
                             }, status=status.HTTP_200_OK)
        else:
            instance = self.get_object()
            serialize = DishesSerializers(instance, context={'request': request})
            return Response({'success': True,
                             'message': 'Get detail dish successfully.',
                             'data': serialize.data
                             }, status=status.HTTP_200_OK)


class CategoryAPI(generics.ListAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializers
    permission_classes = [permissions.AllowAny]

    def get(self, request, *args, **kwargs):
        query_set = self.get_queryset()
        serialize = self.serializer_class(query_set, many=True, context={'request': request})
        return Response({'success': True,
                         'message': 'Get category successfully.',
                         'data': serialize.data
                         }, status=status.HTTP_200_OK)


@api_view(['GET'])
def dish_by_category(request, *args, **kwargs):
    category = Category.objects.get(cid=kwargs.get('cid'))
    restaurant = Restaurant.objects.get(rid=kwargs.get('rid'))
    data = Dish.objects.filter(category=category, restaurant=restaurant)
    serialize = DishesSerializers(data, many=True, context={'request': request})
    return Response({'success': True,
                     'message': 'Get dishes successfully.',
                     'data': serialize.data
                     }, status=status.HTTP_200_OK)


@api_view(['GET'])
def dishes_of_restaurant(request, *args, **kwargs):
    rid = kwargs.get('rid')
    restaurant = Restaurant.objects.get(rid=rid)
    dishes = Dish.objects.filter(restaurant=restaurant, featured=True)
    serialize = DishesSerializers(dishes, many=True, context={'request': request})

    return Response({'success': True,
                     'message': 'Get dishes successfully.',
                     'data': serialize.data
                     }, status=status.HTTP_200_OK)


@api_view(['GET'])
def list_like(request, *args, **kwargs):
    uid = kwargs.get('uid')
    user = User.objects.get(id=uid)
    data = Wishlist.objects.filter(user=user)
    serialize = WishlistSerializers(data, many=True, context={'request': request})
    return Response({'success': True,
                     'message': 'Get restaurant successfully.',
                     'data': serialize.data
                     }, status=status.HTTP_200_OK)


@api_view(['POST'])
def add_order(request, *args, **kwargs):
    uid = kwargs.get('uid')
    rid = kwargs.get('rid')
    user = User.objects.get(id=uid)
    tid = request.data.get('tid')
    table = Table.objects.get(tid=tid)
    restaurant = Restaurant.objects.get(rid=rid)
    items = request.data.get("items");
    serialize = OrderSerializers(data=request.data, context={'request': request})

    if serialize.is_valid(raise_exception=True):
        order = serialize.save(user=user, table=table, restaurant=restaurant)
        for item in items:
            OrderItem.objects.create(
                order=order,
                invoice_no="invoice_no_%s" %(order.id),
                item=item['item'],
                quantity=item['quantity'],
                image=item['image'],
                price=item['price'],
                total=item['total']
            )
        return Response({'success': True,
                         'message': 'Order restaurant successfully.',
                         'data': serialize.data
                         }, status=status.HTTP_200_OK)
    else:
        return Response({'success': False,
                         'message': 'Error!'
                         }, status=status.HTTP_200_OK)


# @api_view(['POST'])
# def add_order_item(request, *args, **kwargs):
#     oid = kwargs.get('oid')
#     order = Order.objects.get(oid=oid)
#     serialize = OrderItemSerializers(data=request.data, context={'request': request})
#     if serialize.is_valid():
#         serialize.save(order=order)
#         return Response({'success': True,
#                          'message': 'Successfully.',
#                          }, status=status.HTTP_200_OK)
#     else:
#         return Response({'success': False,
#                          'message': 'Error!'
#                          }, status=status.HTTP_200_OK)


@api_view(['POST'])
def search_restaurant(request, *args, **kwargs):
    q = request.POST.get('q')
    restaurants = Restaurant.objects.filter(title__contains=q)
    serialize = RestaurantSerializers(restaurants, many=True, context={'request': request})
    return Response({'success': True,
                     'message': 'Search restaurant successfully.',
                     'data': serialize.data
                     }, status=status.HTTP_200_OK)


@api_view(['GET'])
def add_like(request, *args, **kwargs):
    uid = kwargs.get('uid')
    rid = kwargs.get('rid')
    print(uid, rid)
    user = User.objects.get(id=uid)
    restaurant = Restaurant.objects.get(rid=rid)
    wishlist = Wishlist.objects.filter(user=user, restaurant=restaurant)
    
    if not wishlist.exists():
        Wishlist.objects.create(user=user, restaurant=restaurant)
        wishlist = Wishlist.objects.filter(user=user)
        serialize = WishlistSerializers(wishlist, many=True, context={'request': request})
        return Response({'success': True,
                         'message': 'Add like successfully.',
                         'data': serialize.data
                         }, status=status.HTTP_200_OK)
    return Response({'success': False,
                     'message': 'Added previously!'
                     }, status=status.HTTP_200_OK)


@api_view(['GET'])
def delete_like(request, *args, **kwargs):
    uid = kwargs.get('uid')
    rid = kwargs.get('rid')
    user = User.objects.get(id=uid)
    restaurant = Restaurant.objects.get(rid=rid)
    wishlist = Wishlist.objects.filter(user=user, restaurant=restaurant)
    if wishlist.exists():
        wishlist.delete()
        wishlist = Wishlist.objects.filter(user=user)
        serialize = WishlistSerializers(wishlist, many=True, context={'request': request})
        return Response({'success': True,
                         'message': 'Delete like successfully.',
                         'data': serialize.data
                         }, status=status.HTTP_200_OK)
    return Response({'success': False,
                     'message': 'Like not exists!'
                     }, status=status.HTTP_200_OK)


@api_view(['POST'])
def edit_profile(request, *args, **kwargs):
    uid = kwargs.get('uid')
    user = User.objects.get(id=uid)
    address = Address.objects.get(user=user)
    
    if 'image' in request.FILES and request.FILES['image']:
        user.image = request.FILES['image']
    elif not user.image:
        user.image = user.image
    
    if 'phone' in request.POST and request.POST['phone']:
        user.phone = request.POST.get('phone')
    
    if 'full_name' in request.POST and request.POST['full_name']:
        user.full_name = request.POST.get('full_name')
    user.verified = True

    if 'address' in request.POST and request.POST['address']:
        address.address = request.POST.get('address')
    address.save()
    user.save()
    
    response_data = {
        'success': True,
        'message': 'Edit profile successfully.',
        'data': {
            'id': user.id,
            'username': user.username,
            'full_name': user.full_name,
            'email': user.email,
            'phone': user.phone,
            'is_active': user.is_active,
            'date_joined': user.date_joined,
            'address': address.address,
            'verified': user.verified,
            'avatar': get_base_url(request) + (user.image.url if user.image else ''),
        }
    }
    
    return Response(response_data, status=status.HTTP_200_OK)

@api_view(['GET'])
def get_profile(request, *args, **kwargs):
    uid = kwargs.get('uid')
    try:
        user = User.objects.get(id=uid)
        address = Address.objects.get(user=user)
        return Response({'success': True,
                        'message': 'Get profile successfully.',
                        'data': {
                            'id': user.id,
                            'username': user.username,
                            'full_name': user.full_name,
                            'email': user.email,
                            'phone': user.phone,
                            'is_active': user.is_active,
                            'date_joined': user.date_joined,
                            'address': address.address,
                            'verified': user.verified,
                            'avatar': get_base_url(request) + user.image.url,
                        }
                        }, status=status.HTTP_200_OK)
    except: return Response({'success': False,
                        'message': 'User is not exist!'
                        }, status=status.HTTP_200_OK)
    

@api_view(['GET'])
def order_detail(request, *args, **kwargs):
    oid = kwargs.get('oid')
    order = Order.objects.get(oid=oid)
    order_item = OrderItem.objects.filter(order=order)
    serialize = OrderItemSerializers(order_item, many=True, context={'request': request})
    return Response({'success': True,
                     'message': 'Get detail order successfully.',
                     'data': serialize.data
                     }, status=status.HTTP_200_OK)


@api_view(['GET'])
def list_order(request, *args, **kwargs):
    uid = kwargs.get('uid')
    user = User.objects.get(id=uid)
    orders = Order.objects.filter(user=user)
    serialize = OrderSerializers(orders, many=True, context={'request': request})
    return Response({'success': True,
                     'message': 'Get list order successfully.',
                     'data': serialize.data
                     }, status=status.HTTP_200_OK)


@api_view(['POST'])
def manage_order_by_date(request, *args, **kwargs):
    rid = kwargs.get('rid')
    date = request.data.get("date")
    restaurant = Restaurant.objects.get(rid=rid)
    orders = Order.objects.filter(restaurant=restaurant, order_date__date=date)
    serialize = OrderSerializers(orders, many=True, context={'request': request})
    return Response({'success': True,
                     'message': 'Get list order successfully.',
                     'data': serialize.data
                     }, status=status.HTTP_200_OK)


@api_view(['GET'])
def bill_order(request, *args, **kwargs):
    oid = kwargs.get('oid')
    order = Order.objects.get(oid=oid)
    orders = OrderItem.objects.filter(order=order)
    serialize = OrderSerializers(order)
    serialize2 = OrderItemSerializers(orders, many=True, context={'request': request})
    return Response({'success': True,
                     'message': 'Get list order successfully.',
                     'data': {
                         'order': serialize.data,
                         'orderItems': serialize2.data
                     }
                    }, status=status.HTTP_200_OK)


@api_view(['GET'])
def cancel_order(request, *args, **kwargs):
    oid = kwargs.get('oid')
    try:
        order = Order.objects.get(oid=oid)
        order.delete()
        return Response({'success': True,
                         'message': 'Cancel order successfully.'
                         }, status=status.HTTP_200_OK)
    except:
        return Response({'success': False,
                         'message': 'Order not exists!'
                         }, status=status.HTTP_200_OK)


@api_view(['POST'])
def search_dishes(request):
    q = request.POST.get('q')
    dishes = Dish.objects.filter(title__contains=q)
    serialize = DishesSerializers(dishes, many=True, context={'request': request})
    return Response({'success': True,
                     'message': 'Search dishes successfully.',
                     'data': serialize.data
                     }, status=status.HTTP_200_OK)


@api_view(['GET'])
def friend_chat(request, *args, **kwargs):
    uid = kwargs.get('uid')
    user = User.objects.get(id=uid)
    friends = User.objects.all().exclude(
        id=uid
    )
    serialize = SearchSerializer(friends, many=True, context={'request': request})
    return Response({'success': True,
        'message': 'Search dishes successfully.',
        'data': serialize.data
    }, status=status.HTTP_200_OK)


@api_view(['POST'])
def send_chat():
    pass


@api_view(['POST'])
def receive_chat():
    pass


@api_view(['POST'])
def notify_chat():
    pass


@api_view(['POST'])
def add_review():
    pass


@api_view(['POST'])
def contact_us(request, *args, **kwargs):
    serialize = ContactUsSerializers(data=request.data)
    if serialize.is_valid():
        serialize.save()
        return Response({'success': True,
                         'message': 'Send response successfully.',
                         'data': serialize.data
                         }, status=status.HTTP_200_OK)
    return Response({'success': False,
                     'message': 'Send response fail.'
                     }, status=status.HTTP_200_OK)

@api_view(['GET'])
def detail_table(request, *args, **kwargs):
    tid = kwargs.get('tid');
    table = Table.objects.get(tid=tid)
    serialize = TableSerializers(table)
    return Response({'success': True,
                     'message': 'Get success.',
                     'data': serialize.data
                     }, status=status.HTTP_200_OK)


@api_view(['GET'])
def get_order_cart_res(request, *args, **kwargs):
    rid = kwargs.get('rid')
    uid = kwargs.get('uid')
    try:
        restaurant = Restaurant.objects.get(rid=rid)
        user = User.objects.get(id=uid)
        order_cart = OrderCart.objects.get(restaurant=restaurant, user=user)
        serialize = OrderCartSerializers(order_cart);
        order_cart_item = OrderCartItem.objects.filter(ordercart=order_cart);
        serialize2 = OrderCartItemsSerializers(order_cart_item, many=True, context={'request': request});
        return Response({'success': True,
                        'message': 'Get success.',
                        'data': {
                            "order": serialize.data,
                            "orderDetail": serialize2.data
                        }
                        }, status=status.HTTP_200_OK)
    except: return Response({'success': False,
                        'message': 'Get fail.',
                        }, status=status.HTTP_200_OK)
    

@api_view(['POST'])
def add_order_cart(request, *args, **kwargs):
    rid = kwargs.get('rid')
    uid = kwargs.get('uid')
    items = request.data.get("items")
    tid = request.data.get('tid')
    table = Table.objects.get(tid=tid)
    user = User.objects.get(id=uid)
    restaurant = Restaurant.objects.get(rid=rid)
    serialize = OrderCartSerializers(data=request.data, context={'request': request})
    if serialize.is_valid():
        order_cart = serialize.save(user=user, table=table, restaurant=restaurant)
        for item in items:
            dish = Dish.objects.get(did=item['did'])
            OrderCartItem.objects.create(
                ordercart=order_cart,
                dish=dish,
                quantity=item['quantity']
            )
        order_cart_item = OrderCartItem.objects.filter(ordercart=order_cart);
        serialize2 = OrderCartItemsSerializers(order_cart_item, many=True, context={'request': request});

        return Response({'success': True,
                         'message': 'Order restaurant successfully.',
                        #  'data': serialize.data
                        'data': {
                            "order": serialize.data,
                            "orderDetail": serialize2.data
                        }
                         }, status=status.HTTP_200_OK)
    else:
        return Response({'success': False,
                         'message': 'Error!'
                         }, status=status.HTTP_200_OK)
    
    
# @api_view(['POST'])
# def update_order_cart_item(request, *args, **kwargs):
#     ocid = kwargs.get('ocid')
#     ordercart = OrderCart.objects.get(ocid=ocid)
#     did = kwargs.get('did')
#     dish = Dish.objects.get(did=did)
#     ordercart_items = OrderCartItem.objects.get(ordercart=ordercart, dish=dish)
#     ordercart_items.quantity = request.POST.get('quantity')
#     ordercart_items.save()
#     return Response({'success': True,
#                          'message': 'Update successfully.'
#                          }, status=status.HTTP_200_OK)


# @api_view(['GET'])
# def delete_order_cart_item(request, *args, **kwargs):
#     ocid = kwargs.get('ocid')
#     did = kwargs.get('did')
#     ordercart = OrderCart.objects.get(ocid=ocid)
#     dish = Dish.objects.get(did=did)
#     ordercart_items = OrderCartItem.objects.get(ordercart=ordercart, dish=dish)
#     ordercart_items.delete()
#     return Response({'success': True,
#                          'message': 'Delete successfully.'
#                          }, status=status.HTTP_200_OK)


@api_view(['POST'])
def update_order_cart(request, *args, **kwargs):
    rid = kwargs.get('rid')
    uid = kwargs.get('uid')
    tid = request.data.get('tid')
    table = Table.objects.get(tid=tid)
    user = User.objects.get(id=uid)
    restaurant = Restaurant.objects.get(rid=rid)
    order_cart = OrderCart.objects.get(user=user, restaurant=restaurant)
    order_cart.table = table
    order_cart.full_name = request.data.get('full_name')
    order_cart.phone = request.data.get('phone')
    order_cart.time_from = request.data.get('time_from')
    order_cart.time_to = request.data.get('time_to')
    order_cart.number_people = request.data.get('number_people')
    items = request.data.get('items')
    order_cart.save();
    serialize = OrderCartSerializers(order_cart)

    ordercart_items = OrderCartItem.objects.filter(ordercart=order_cart)
    ordercart_items.delete()
    for item in items:
        dish = Dish.objects.get(did=item['did'])
        OrderCartItem.objects.create(
            ordercart=order_cart,
            dish=dish,
            quantity=item['quantity']
        )
    order_cart_item = OrderCartItem.objects.filter(ordercart=order_cart);
    serialize2 = OrderCartItemsSerializers(order_cart_item, many=True, context={'request': request});

    return Response({'success': True,
                     'message': 'Update successfully.',
                     'data': {
                        "order": serialize.data,
                        "orderDetail": serialize2.data
                    }
                    }, status=status.HTTP_200_OK)


@api_view(['GET'])
def delete_order_cart(request, *args, **kwargs):
    rid = kwargs.get('rid')
    uid = kwargs.get('uid')
    user = User.objects.get(id=uid)
    restaurant = Restaurant.objects.get(rid=rid);
    order_cart = OrderCart.objects.filter(user=user, restaurant=restaurant);
    order_cart.delete()
    return Response({'success': True,
                         'message': 'Delete successfully.'
                         }, status=status.HTTP_200_OK)


# API for Restaurant
@api_view(['POST'])
def add_restaurant(request, *args, **kwargs):
    uid = kwargs.get('uid')
    user = User.objects.get(id=uid)
    serialize = RestaurantSerializers(data=request.data, context={'request': request})
    if serialize.is_valid():
        serialize.save(user=user)
        return Response({'success': True,
                         'message': 'Add restaurant successfully.',
                         'data': serialize.data
                         }, status=status.HTTP_200_OK)

    return Response({'success': False,
                     'message': 'Add restaurant fail.',
                     }, status=status.HTTP_200_OK)


@api_view(['POST'])
def add_category(request, *args, **kwargs):
    serialize = CategorySerializers(data=request.data)
    if serialize.is_valid():
        serialize.save()
        return Response({'success': True,
                         'message': 'Add category successfully.',
                         }, status=status.HTTP_200_OK)
    return Response({'success': False,
                     'message': 'Add category fail.',
                     }, status=status.HTTP_200_OK)


@api_view(['GET'])
def delete_category(request, *args, **kwargs):
    cid = kwargs.get('cid')
    try:
        category = Category.objects.get(cid=cid)
        category.delete()
        return Response({'success': True,
                         'message': 'Delete category successfully.'
                         }, status=status.HTTP_200_OK)
    except:
        return Response({'success': False,
                         'message': 'Category not exists!',
                         }, status=status.HTTP_200_OK)


@api_view(['POST'])
def update_category(request, *args, **kwargs):
    cid = kwargs.get('cid')
    category = Category.objects.get(cid=cid)
    category.title = request.data.get('title')
    category.image = request.FILES.get('image')
    category.save()
    return Response({'success': True,
                     'message': 'Update category successfully.',
                     }, status=status.HTTP_200_OK)


@api_view(['GET'])
def wishlist_restaurant(request, *args, **kwargs):
    rid = kwargs.get('rid')
    restaurant = Restaurant.objects.get(rid=rid)
    wishlist = Wishlist.objects.filter(restaurant=restaurant)
    serialize = WishlistRestaurantSerializers(wishlist, many=True, context={'request': request})
    return Response({'success': True,
                     'message': 'Get wishlist successfully.',
                     'data': serialize.data
                     }, status=status.HTTP_200_OK)


@api_view(['POST'])
def add_address():
    pass


@api_view(['GET'])
def review_restaurant(request, *args, **kwargs):
    rid = kwargs.get("rid")
    restaurant = Restaurant.objects.get(rid=rid)
    reviews = RestaurantReview.objects.filter(restaurant=restaurant)
    serialize = RestaurantReviewSerializers(reviews, many=True, context={'request': request})
    return Response({'success': True,
                     'message': 'Get reviews successfully.',
                     'data': serialize.data
                     }, status=status.HTTP_200_OK)


@api_view(['POST'])
def add_dish(request, *args, **kwargs):
    rid = kwargs.get('rid')
    cid = request.data.get('cid')
    restaurant = Restaurant.objects.get(rid=rid)
    category = Category.objects.get(cid=cid)
    serialize = DishesSerializers(data=request.data, context={'request': request})
    if serialize.is_valid(raise_exception=True):
        serialize.save(restaurant=restaurant, category=category)
        return Response({'success': True,
                         'message': 'Add dish successfully.',
                         'data': serialize.data
                         }, status=status.HTTP_200_OK)
    return Response({'success': False,
                     'message': 'Add dish fail.'
                     }, status=status.HTTP_200_OK)


@api_view(['GET'])
def delete_dish(request, *args, **kwargs):
    did = kwargs.get('did')
    rid = kwargs.get('rid')
    try:
        dish = Dish.objects.get(did=did)
        dish.delete()
        restaurant = Restaurant.objects.get(rid=rid)
        dishes = Dish.objects.filter(restaurant=restaurant)
        serialize = DishesSerializers(dishes, many=True, context={'request': request})
        return Response({'success': True,
                         'message': 'Delete dish successfully.',
                        'data': serialize.data
                         }, status=status.HTTP_200_OK)
    except:
        return Response({'success': False,
                         'message': 'Delete dish fail.'
                         }, status=status.HTTP_200_OK)


@api_view(['POST'])
def update_dish(request, *args, **kwargs):
    did = kwargs.get('did')
    # try:
    dish = Dish.objects.get(did=did)
    dish.title = request.data.get('title')
    if 'image' in request.data:
        dish.image = request.FILES.get('image')
    dish.description = request.data.get('description')
    dish.price = request.data.get('price')
    dish.old_price = request.data.get('old_price')
    dish.specifications = request.data.get('specifications')
    dish.product_status = request.data.get('product_status')
    dish.featured = request.data.get('featured').title()
    dish.digital = request.data.get('digital').title()
    cid = request.data.get('cid')
    category = Category.objects.get(cid=cid)
    dish.category = category
    dish.save()
    return Response({'success': True,
                         'message': 'Update dish successfully.'
                         }, status=status.HTTP_200_OK)
    # except:
    #     return Response({'success': False,
    #                      'message': 'Update dish fail.'
    #                      }, status=status.HTTP_200_OK)


@api_view(['GET'])
def order_restaurant(request, *args, **kwargs):
    rid = kwargs.get('rid')
    restaurant = Restaurant.objects.get(rid=rid)
    order = Order.objects.filter(restaurant=restaurant)
    serialize = OrderSerializers(order, many=True, context={'request': request})
    return Response({'success': True,
                     'message': 'Get order successfully.',
                     'data': serialize.data
                     }, status=status.HTTP_200_OK)


@api_view(['POST'])
def add_table(request, *args, **kwargs):
    rid = kwargs.get('rid')
    restaurant = Restaurant.objects.get(rid=rid)
    serialize = TableSerializers(data=request.data, context={'request': request})
    if serialize.is_valid(raise_exception=True):
        serialize.save(restaurant=restaurant)
        return Response({'success': True,
                         'message': 'Add table successfully.',
                         'data': serialize.data
                         }, status=status.HTTP_200_OK)
    return Response({'success': False,
                     'message': 'Add table fail.'
                     }, status=status.HTTP_200_OK)


@api_view(['GET'])
def get_table(request, *args, **kwargs):
    rid = kwargs.get('rid')
    restaurant = Restaurant.objects.get(rid=rid)
    tables = Table.objects.filter(restaurant=restaurant)
    serialize = TableSerializers(tables, many=True, context={'request': request})
    return Response({'success': True,
                     'message': 'Get table successfully.',
                     'data': serialize.data
                     }, status=status.HTTP_200_OK)


@api_view(['POST'])
def update_table(request, *args, **kwargs):
    tid = kwargs.get('tid')
    try:
        table = Table.objects.get(tid=tid)
        table.title = request.data.get('title')
        table.save()
        return Response({'success': True,
                         'message': 'Update table successfully.'
                         }, status=status.HTTP_200_OK)
    except:
        return Response({'success': False,
                         'message': 'Update table fail.'
                         }, status=status.HTTP_200_OK)


@api_view(['GET'])
def delete_table(request, *args, **kwargs):
    tid = kwargs.get('tid')
    rid = kwargs.get('rid')
    try:
        table = Table.objects.get(tid=tid)
        table.delete()
        rid = kwargs.get('rid')
        restaurant = Restaurant.objects.get(rid=rid)
        data = Table.objects.filter(restaurant=restaurant)
        serialize = TableSerializers(data, many=True)
        return Response({'success': True,
                         'message': 'Delete table successfully.',
                         'data': serialize.data
                         }, status=status.HTTP_200_OK)
    except:
        return Response({'success': False,
                         'message': 'Delete table fail.'
                         }, status=status.HTTP_200_OK)