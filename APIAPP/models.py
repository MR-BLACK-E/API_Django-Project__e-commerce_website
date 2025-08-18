from django.db import models

class Users(models.Model):
    username = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=100)
    otp = models.CharField(max_length=10000, default=1234)

    # def __str__(self):
    #     return f"{self.username or 'No Username'}"

#Admin
class Product(models.Model):
    product_name = models.CharField(max_length=100)
    product_price = models.FloatField(default=100.00)  
    