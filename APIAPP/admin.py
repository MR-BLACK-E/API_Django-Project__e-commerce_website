from django.contrib import admin
from .models import Users
from .models import *

# Register your models here.
admin.site.register(Users),
admin.site.register(Products),
admin.site.register(Category),
admin.site.register(Cart),
admin.site.register(Order),
admin.site.register(OrderItem),
admin.site.register(UserDetails),