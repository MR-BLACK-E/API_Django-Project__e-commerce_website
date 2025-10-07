from django.db import models

class Users(models.Model):
    username = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=100)
    otp = models.CharField(max_length=10000, default=1234)

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
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name="products", null=True, blank=True)
    name = models.CharField(max_length=200)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    image = models.FileField(upload_to="products/", blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name
       