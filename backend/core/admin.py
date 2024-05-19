from django.contrib import admin
from .models import *


class DishAdmin(admin.ModelAdmin):
    list_display = ['did', 'title', 'dish_image', 'description', 'price', 'date', 'featured']


class CategoryAdmin(admin.ModelAdmin):
    list_display = ['cid', 'title', 'category_image']


class RestaurantAdmin(admin.ModelAdmin):
    list_display = ['rid', 'title', 'restaurant_image', 'phone', 'time_open', 'time_close', 'is_hot']


class OrderAdmin(admin.ModelAdmin):
    list_display = ['oid', 'order_date', 'price', 'product_status', 'time_from', 'time_to', 'number_people', 'deposit']


class OrderItemAdmin(admin.ModelAdmin):
    list_display = ['order', 'invoice_no', 'quantity', 'total']


class RestaurantReviewAdmin(admin.ModelAdmin):
    list_display = ['user', 'restaurant', 'review', 'rating', 'date']


class WishlistAdmin(admin.ModelAdmin):
    list_display = ['user', 'restaurant', 'date']


class ChatMessageAdmin(admin.ModelAdmin):
    list_display = ['body', 'msg_user', 'msg_restaurant', 'sender', 'seen']


class TableAdmin(admin.ModelAdmin):
    list_display = ['tid', 'title']


class CartOrderAdmin(admin.ModelAdmin):
    list_display = ['ocid', 'full_name', 'phone', 'table', 'number_people', 'order_date']


class CartOrderItemAdmin(admin.ModelAdmin):
    list_display = ['ordercart', 'dish', 'quantity']


# Register your models here.
admin.site.register(Category, CategoryAdmin)
admin.site.register(Restaurant, RestaurantAdmin)
admin.site.register(RestaurantReview, RestaurantReviewAdmin)
admin.site.register(Wishlist, WishlistAdmin)
admin.site.register(ChatMessage, ChatMessageAdmin)
admin.site.register(Dish, DishAdmin)
admin.site.register(Order, OrderAdmin)
admin.site.register(OrderItem, OrderItemAdmin)
admin.site.register(Table, TableAdmin)
admin.site.register(OrderCart, CartOrderAdmin)
admin.site.register(OrderCartItem, CartOrderItemAdmin)