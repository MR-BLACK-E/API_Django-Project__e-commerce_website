from django.db import models
from django.contrib.auth.models import AbstractUser


class Users(AbstractUser):
    # username = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    # password = models.CharField(max_length=100)
    otp = models.CharField(max_length=100, default=1234)
    address = models.TextField(max_length=300, default='na')
    town = models.CharField(max_length=100, default='na')

    # def __str__(self):
    #     return f"{self.username or 'No Username'}"

#Admin Category
class Category(models.Model):
    name = models.CharField(max_length=100, unique=True)
    # description = models.TextField( blank=True, null=True)

    def __str__(self):
        return self.name

#Admin Products
class Products(models.Model):
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, related_name="products", null=True, blank=True)
    name = models.CharField(max_length=200)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    image = models.FileField(upload_to="products/", blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name
       
# User Cart
class Cart(models.Model):
    user = models.ForeignKey(Users, on_delete=models.CASCADE, related_name="cart", default=1)
    product = models.ForeignKey(Products, on_delete=models.SET_NULL, null=True, blank=True)
    quantity = models.PositiveIntegerField(default=1)
    added_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username} "
    
# User Order
class Order(models.Model):
    user = models.ForeignKey(Users, on_delete=models.CASCADE, related_name="orders",default=1)
    total_amount = models.DecimalField(max_digits=10, decimal_places=2)
    created_at = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=50, default="Pending")
    # payment_method = models.CharField(max_length=50, default="COD")
    payment_status = models.CharField(max_length=20, default="success")
    def __str__(self):
        return f"{self.user.username} - {self.total_amount}"


#User Order Items
class OrderItem(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name="items")
    product = models.ForeignKey(Products, on_delete=models.SET_NULL, null=True, blank=True)
    quantity = models.PositiveIntegerField()
    price = models.DecimalField(max_digits=10, decimal_places=2)

#Users Details
class UserDetails(models.Model):
    user = models.ForeignKey(Users, on_delete=models.CASCADE, related_name="userdetails",default=1)
    first_name = models.CharField(max_length=50 )
    last_name = models.CharField(max_length=50)
    email = models.EmailField()
    address = models.TextField(max_length=300)
    town = models.CharField(max_length=100)

    def __str__(self):
        return f"{self.user.username} - {self.first_name, self.last_name}"


