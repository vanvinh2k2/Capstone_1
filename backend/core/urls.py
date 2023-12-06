from .views import *
from django.urls import path
from .ai import search_restaurant_image, suggest_food
from .backend import RestaurantHotAPI, RestaurantAPI, DishesHotAPI, DishesAPI, CategoryAPI, \
    dish_by_category, dishes_of_restaurant, list_like, add_order, add_like, update_order_cart,\
    order_detail, search_restaurant, delete_like, edit_profile, list_order, search_dishes, \
    cancel_order, contact_us, add_restaurant, add_category, delete_category, update_category, \
    wishlist_restaurant, add_dish, delete_dish, update_dish, order_restaurant, add_table, \
    get_table, update_table, delete_table, detail_table, get_profile, get_order_cart_res,\
    add_order_cart, delete_order_cart, bill_order, review_restaurant, manage_order_by_date,\
    friend_chat, check_order, add_review, update_order_item, delete_order_item, update_status_order,\
    statistics, restaurant_detail, dish_detail

urlpatterns = [
    path('', index, name='index'),
    # For User
    path('api/restaurant-hot/', RestaurantHotAPI.as_view(), name='restaurant-hot'),
    path('api/restaurant-hot/<rid>/', RestaurantHotAPI.as_view(), name='restaurant-hot-detail'),
    path('api/restaurant/', RestaurantAPI.as_view(), name='restaurant'),
    path('api/restaurant/<rid>/', restaurant_detail, name='restaurant-detail'),
    path('api/dish-featured/', DishesHotAPI.as_view(), name='dish-featured'),
    path('api/dish-featured/<did>/', DishesHotAPI.as_view(), name='dish-featured-detail'),
    path('api/dish/', DishesAPI.as_view(), name='dish'),
    path('api/dish/<did>/', dish_detail, name='dish-detail'),
    path('api/restaurant/dish-by-category/<rid>/<cid>/', dish_by_category, name='dish-by-category'),
    path('api/category/', CategoryAPI.as_view(), name='category'),
    path('api/add-order/<uid>/<rid>/', add_order, name='add-order'),
    path('api/order-detail/<oid>/', order_detail, name='order-detail'),
    path('api/bill-order/<oid>/', bill_order, name='bill-order'),
    path('api/dishes-of-restaurant/<rid>/', dishes_of_restaurant, name='dishes-of-restaurant'),
    path('api/list-like/<uid>/', list_like, name='list-like'),
    path('api/add-like/<uid>/<rid>/', add_like, name='add-like'),
    path('api/delete-like/<uid>/<rid>/', delete_like, name='delete-like'),
    path('api/search-restaurant/', search_restaurant, name='search-restaurant'),
    path('api/search-dish/', search_dishes, name='search-dish'),
    path('api/edit-profile/<uid>/', edit_profile, name='edit-profile'),
    path('api/get-profile/<uid>/', get_profile, name='get-profile'),
    path('api/list-order/<uid>/', list_order, name='list-order'),
    path('api/cancel-order/<oid>/', cancel_order, name='cancel-order'),
    path('api/contact-us/', contact_us, name='contact-us'),
    path('api/detail-table/<tid>/', detail_table, name='detail-table'),
    path('api/order-cart/<uid>/<rid>/', get_order_cart_res, name='order-cart'),
    path('api/add-order-cart/<uid>/<rid>/', add_order_cart, name='add-order-cart'),
    path('api/delete-order-cart/<uid>/<rid>/', delete_order_cart, name='delete-order-cart'),
    path('api/update-order-cart/<uid>/<rid>/', update_order_cart, name='update-order-cart'),
    path('api/check-order/<rid>/', check_order, name='check-order'),
    path('api/add-review/<uid>/<rid>/', add_review, name='add-review'),
    path('api/update-status-order/<oid>/', update_status_order, name='update-status-order'),
    path('api/update-order-item/<oid>/<did>/', update_order_item, name='update-order-item'),
    path('api/delete-order-item/<oid>/<did>/', delete_order_item, name='delete-order-item'),
    path('api/statistics/<rid>/', statistics, name='statistics'),

    # For Restaurant
    path('api/add-restaurant/<uid>/', add_restaurant, name='add-restaurant'),
    path('api/add-category/', add_category, name='add-category'),
    path('api/delete-category/<cid>/', delete_category, name='delete-category'),
    path('api/update-category/<cid>/', update_category, name='update-category'),
    path('api/wishlist/<rid>/', wishlist_restaurant, name='wishlist'),
    path('api/add-dish/<rid>/', add_dish, name='add-dish'),
    path('api/delete-dish/<rid>/<did>/', delete_dish, name='delete-dish'),
    path('api/update-dish/<did>/', update_dish, name='update-dish'),
    path('api/order-restaurant/<rid>/', order_restaurant, name='order-restaurant'),
    path('api/add-table/<rid>/', add_table, name='add-table'),
    path('api/get-table/<rid>/', get_table, name='get-table'),
    path('api/update-table/<tid>/', update_table, name='update-table'),
    path('api/delete-table/<rid>/<tid>/', delete_table, name='delete-table'),
    path('api/reviews-restaurant/<rid>/', review_restaurant, name='review-restaurant'),
    path('api/manage-order/<rid>/', manage_order_by_date, name='manage-order'),
    path('api/friend-chat/<rid>/', friend_chat, name='friend-chat'),

    # For AI
    path('api/search-ai/', search_restaurant_image, name='search-restaurant-image'),
    path('api/suggest-food/<uid>/<rid>/', suggest_food, name='suggest-food'),
]