from django.db import models
from shortuuid.django_fields import ShortUUIDField
from django.utils.html import mark_safe
from auths.models import User
from ckeditor_uploader.fields import RichTextUploadingField


def user_directory_path(instance, filename):
    return 'user_{0}/{1}'.format(instance.uid, filename)


def dish_directory_path(instance, filename):
    return 'dish_{0}/{1}'.format(instance.did, filename)


def restaurant_directory_path(instance, filename):
    return 'restaurant_{0}/{1}'.format(instance.rid, filename)


def order_dish_directory_path(instance, filename):
    return 'order_dish_{0}/{1}'.format(instance.order.oid, filename)


STATUS_CHOICE = (
    ("awaiting_confirmation", "Awaiting confirmation"),
    ("confirmed", "Confirmed"),
    ("complete", "Complete"),
    ("cancel", "Cancel")
)

STATUS = (
    ("draft", "Draft"),
    ("disabled", "Disabled"),
    ("rejected", "Rejected"),
    ("in_review", "In review"),
    ("published", "Published")
)

RATING = (
    (1, "★☆☆☆☆"),
    (2, "★★☆☆☆"),
    (3, "★★★☆☆"),
    (4, "★★★★☆"),
    (5, "★★★★★")
)

# Create your models here.
class Category(models.Model):
    cid = ShortUUIDField(unique=True, length=10, max_length=20, prefix="cat", alphabet="abcdefgh12345", primary_key=True)
    title = models.CharField(max_length=100)
    image = models.ImageField(upload_to="category")

    class Meta:
        # dat lai hien name
        verbose_name_plural = "Categories"

    def category_image(self):
        return mark_safe('<img src="%s" width="50" height="50"/>' %(self.image.url))

    def __str__(self):
        return self.title


class Restaurant(models.Model):
    rid = ShortUUIDField(unique=True, length=10, max_length=20, prefix="res", alphabet="abcdefgh12345", primary_key=True)
    title = models.CharField(max_length=100, default="No have")
    username = models.CharField(max_length=150, null=True)
    email = models.EmailField(unique=True)
    image = models.ImageField(upload_to=restaurant_directory_path)
    description = RichTextUploadingField(null=True, blank=True)
    address = models.CharField(max_length=100, null=True)
    phone = models.CharField(max_length=100)
    password = models.CharField(max_length=120)
    address = models.CharField(max_length=500, null=True, blank=True)
    time_open = models.TimeField()
    time_close = models.TimeField()
    is_hot = models.BooleanField(default=False)
    like = models.IntegerField(default=0)
    class Meta:
        # dat lai hien name
        verbose_name_plural = "Restaurants"

    def restaurant_image(self):
        return mark_safe('<img src="%s" width="50" height="50"/>' %(self.image.url))

    def __str__(self):
        return self.title


class Dish(models.Model):
    did = ShortUUIDField(unique=True, length=10, max_length=20, alphabet="abcdefgh12345", primary_key=True)
    title = models.CharField(max_length=100)
    image = models.ImageField(upload_to=dish_directory_path)
    description = RichTextUploadingField(null=True, blank=True, default="This is product")
    price = models.DecimalField(decimal_places=2, max_digits=30, default=2)
    old_price = models.DecimalField(decimal_places=2, max_digits=30, default=2)
    product_status = models.CharField(choices=STATUS, default="not_paid_yet", max_length=50)
    featured = models.BooleanField(default=False)
    digital = models.BooleanField(default=False)
    date = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(null=True, blank=True)

    category = models.ForeignKey(Category, on_delete=models.CASCADE, null=True, related_name='category')
    restaurant = models.ForeignKey(Restaurant, on_delete=models.CASCADE, null=True, related_name='restaurant')

    class Meta:
        # dat lai hien name
        verbose_name_plural = "Dishes"

    def dish_image(self):
        return mark_safe('<img src="%s" width="50" height="50"/>' %(self.image.url))

    def __str__(self):
        return self.title

    def get_precentage(self):
        new_price = (self.price / self.old_price) * 100
        return round(100 - new_price)


class Table(models.Model):
    tid = ShortUUIDField(unique=True, length=10, max_length=20, alphabet="abcdefgh12345", primary_key=True)
    title = models.CharField(max_length=100)
    number_seat = models.IntegerField(default=2)
    restaurant = models.ForeignKey(Restaurant, on_delete=models.CASCADE)

    def __str__(self):
        return self.title


class Order(models.Model):
    oid = ShortUUIDField(unique=True, length=10, max_length=20, alphabet="abcdefgh12345", primary_key=True)
    order_date = models.DateField()
    full_name = models.CharField(max_length=200)
    phone = models.CharField(max_length=15)
    price = models.DecimalField(decimal_places=2, max_digits=30, default=2)
    paid_status = models.BooleanField(default=True)
    product_status = models.CharField(choices=STATUS_CHOICE, max_length=50, default="awaiting_confirmation")
    time_from = models.TimeField()
    time_to = models.TimeField()
    number_people = models.IntegerField(default=2)
    deposit = models.DecimalField(decimal_places=2, max_digits=30)

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='user')
    restaurant = models.ForeignKey(Restaurant, on_delete=models.CASCADE, related_name='restaurant_order')
    table = models.ForeignKey(Table, on_delete=models.CASCADE)

    class Meta:
        # dat lai hien name
        verbose_name_plural = "Order"

    def __str__(self):
        return self.oid


class OrderCart(models.Model):
    ocid = ShortUUIDField(unique=True, length=10, max_length=20, alphabet="abcdefgh12345", primary_key=True)
    full_name = models.CharField(max_length=200)
    order_date = models.DateField()
    phone = models.CharField(max_length=15)
    table = models.ForeignKey(Table, on_delete=models.CASCADE)
    time_from = models.TimeField()
    time_to = models.TimeField()
    number_people = models.IntegerField(default=2)
    restaurant  = models.ForeignKey(Restaurant, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='user_ordercart')

    class Meta:
        verbose_name_plural = "Order Carts"
    
    def __str__(self):
        return self.ocid

class OrderCartItem(models.Model):
    ordercart = models.ForeignKey(OrderCart, on_delete=models.CASCADE)
    dish = models.ForeignKey(Dish, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=1)

    class Meta:
        verbose_name_plural = "Order Carts Item"


class OrderItem(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE, null=True)
    invoice_no = models.CharField(max_length=200)
    dish = models.ForeignKey(Dish, on_delete=models.CASCADE)
    quantity = models.IntegerField(default=0)
    total = models.DecimalField(decimal_places=2, max_digits=30, default=2)

    class Meta:
        # dat lai hien name
        verbose_name_plural = "Order Items"

    def order_image(self):
        return mark_safe('<img src="%s" width="50" height="50"/>' % (self.image))


class RestaurantReview(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    restaurant = models.ForeignKey(Restaurant, on_delete=models.CASCADE, null=True)
    review = models.TextField()
    rating = models.IntegerField(choices=RATING, default=None)
    date = models.DateTimeField(auto_now_add=True)

    class Meta:
        # dat lai hien name
        verbose_name_plural = "Restaurant Reviews"

    def __str__(self):
        return self.restaurant.title

    def get_rating(self):
        return self.rating


class Wishlist(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    restaurant = models.ForeignKey(Restaurant, on_delete=models.CASCADE, null=True)
    date = models.DateTimeField(auto_now_add=True)

    class Meta:
        # dat lai hien name
        verbose_name_plural = "Wishlists"

    def __str__(self):
        return self.restaurant.title


class ChatMessage(models.Model):
    body = models.CharField(max_length=500)
    msg_user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='sender')
    msg_restaurant = models.ForeignKey(Restaurant, on_delete=models.CASCADE, related_name='receiver')
    sender = models.CharField(max_length=50)
    seen = models.BooleanField(default=False)
    date = models.DateTimeField(auto_now_add=True)

    class Meta:
        # dat lai hien name
        verbose_name_plural = "Chat Messages"