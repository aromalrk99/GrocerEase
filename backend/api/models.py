from django.db import models
from django.contrib.auth.models import User

ROLE_CHOICES = [
    ('customer', 'Customer'),
    ('staff', 'Staff'),
]

CATEGORY_CHOICES = [
    ('Fruits', 'Fruits'),
    ('Vegetables', 'Vegetables'),
    ('Meat', 'Meat'),
    ('Dairy', 'Dairy'),
    ('Bakery', 'Bakery'),
    ('Beverages', 'Beverages'),
    ('Snacks', 'Snacks'),
    ('Frozen Food', 'Frozen Food'),
    ('Essentials', 'Essentials'),
]

ORDER_STATUS_CHOICES = [
    ('Pending', 'Pending'),
    ('Packed', 'Packed'),
    ('Shipped', 'Shipped'),
    ('Delivered', 'Delivered'),
]

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    role = models.CharField(max_length=10, choices=ROLE_CHOICES)
    phone = models.CharField(max_length=20, blank=True)
    address = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username} - {self.role}"

class Product(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    stock = models.IntegerField()
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES)
    image_url = models.URLField()
    nutritional_info = models.JSONField(default=dict, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

class Order(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    order_id = models.CharField(max_length=50, unique=True)
    status = models.CharField(max_length=20, choices=ORDER_STATUS_CHOICES, default='Pending')
    total = models.DecimalField(max_digits=10, decimal_places=2)
    shipping_address = models.TextField()
    payment_method = models.CharField(max_length=50)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.order_id

class OrderItem(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name='items')
    product = models.ForeignKey(Product, on_delete=models.SET_NULL, null=True)
    quantity = models.IntegerField()
    price = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return f"{self.order.order_id} - {self.product.name}"

class Cart(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Cart - {self.user.username}"

class CartItem(models.Model):
    cart = models.ForeignKey(Cart, on_delete=models.CASCADE, related_name='items')
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.IntegerField(default=1)

    def __str__(self):
        return f"{self.cart.user.username} - {self.product.name}"
