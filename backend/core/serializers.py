from rest_framework import serializers
from .models import *
from auths.models import User, ContactUs


class UserSerializers(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = "__all__"


class SenderSerializers(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "image", "email"]


class RestaurantSerializers(serializers.ModelSerializer):
    user = UserSerializers(read_only=True)

    class Meta:
        model = Restaurant
        fields = "__all__"


class TableSerializers(serializers.ModelSerializer):
    class Meta:
        model = Table
        fields = ['tid', 'title', 'number_seat']


class CategorySerializers(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = "__all__"


class DishesSerializers(serializers.ModelSerializer):
    restaurant = RestaurantSerializers(read_only=True)
    category = CategorySerializers(read_only=True)

    class Meta:
        model = Dish
        fields = "__all__"


class WishlistSerializers(serializers.ModelSerializer):
    restaurant = RestaurantSerializers()

    class Meta:
        model = Wishlist
        fields = ['restaurant', 'date']


class WishlistRestaurantSerializers(serializers.ModelSerializer):
    user = UserSerializers()

    class Meta:
        model = Wishlist
        fields = ['user', 'date']


class OrderSerializers(serializers.ModelSerializer):
    user = UserSerializers(read_only=True)
    table = TableSerializers(read_only=True)
    restaurant = RestaurantSerializers(read_only=True)

    class Meta:
        model = Order
        fields = "__all__"


class OrderItemSerializers(serializers.ModelSerializer):
    invoice_no = serializers.CharField(read_only=True)
    dish = DishesSerializers(read_only=True)
    class Meta:
        model = OrderItem
        fields = '__all__'


class ContactUsSerializers(serializers.ModelSerializer):
    class Meta:
        model = ContactUs
        fields = "__all__"
        

class AddressSerializers(serializers.ModelSerializer):
    user = UserSerializers(read_only=True)
    class Meta:
        model = Address
        fields = "__all__"

class OrderCartSerializers(serializers.ModelSerializer):
    restaurant = RestaurantSerializers(read_only=True)
    user = UserSerializers(read_only=True)
    table = TableSerializers(read_only=True)
    class Meta:
        model = OrderCart
        fields = "__all__"

class OrderCartItemsSerializers(serializers.ModelSerializer):
    OrderCartSerializers = RestaurantSerializers(read_only=True)
    dish = DishesSerializers(read_only=True)
    class Meta:
        model = OrderCartItem
        fields = "__all__"

class RestaurantReviewSerializers(serializers.ModelSerializer):
    user = UserSerializers(read_only=True)
    restaurant = RestaurantSerializers(read_only=True)
    class Meta:
        model = RestaurantReview
        fields = '__all__'

class SearchSerializer(serializers.ModelSerializer):

	class Meta:
		model = User
		fields = ['id', 'username', 'image', 'email']


class MessageSerializer(serializers.ModelSerializer):
    msg_sender = SenderSerializers(read_only=True)
    msg_receiver = SearchSerializer(read_only=True)
    class Meta:
        model = ChatMessage
        fields = ['body', 'msg_sender', 'msg_receiver', 'seen', 'date']