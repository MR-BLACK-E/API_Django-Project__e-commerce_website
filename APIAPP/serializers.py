from django.contrib.auth.hashers import make_password
from rest_framework import *
from rest_framework import serializers
from .models import *
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer


#Registration
class RegisterSrializer(serializers.ModelSerializer):
    class Meta:
        model = Users
        fields = ['username', 'email', 'password']        

    def validate(self, attrs):
        username = attrs.get('username')
        if Users.objects.filter(username=username).exists():
            raise serializers.ValidationError({"username": "Username already taken, Please try another username"})
        return attrs

    def create(self,data):
        
        data['password'] = make_password(data['password'])
        # user.save()
        # return user
        return super().create(data)

#Login
class UserLoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

#show User_details
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = Users
        fields = ["id", "username", "email"]    

#Category
class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ["id", "name"]
        # fields = "__all__"

#Admin Product
class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Products
        fields = ["id","category", "name", "price","description","image"]    

#Cart
# class CartSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Cart
#         fields = '__all__'


class CartSerializer(serializers.ModelSerializer):
    product = ProductSerializer(read_only=True)
    product_id = serializers.PrimaryKeyRelatedField(write_only=True, queryset=Products.objects.all(), source='product')

    class Meta:
        model = Cart
        fields = ['id','product','product_id','quantity']
        # fields = '__all__'

class OrderItemSerializer(serializers.ModelSerializer):
    product = ProductSerializer()
    class Meta:
        model = OrderItem
        fields = ['id','product','quantity','price']

class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True, read_only=True)
    class Meta:
        model = Order
        fields = ['id','total_amount','status','created_at','items']        
      


#for Admin Dashboard Login
class AdminTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)
        user = self.user

        # Only allow staff or superuser
        if not (user.is_staff or user.is_superuser):
            raise serializers.ValidationError(
                {"detail": "You are not authorized to access the admin panel."}
            )

        data['username'] = user.username
        return data

#Users Order Details
class UserDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserDetails
        fields = ["first_name","last_name","email","address","town",]

#Users Details
class UserMainDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Users
        fields = ["first_name","last_name","email","address","town",]

#Admin dashboard Customers
# class OrderSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Order
#         fields = ["id", "total_amount", "address", "town", "status", "created_at"]

class CustomerSerializer(serializers.ModelSerializer):
    orders = OrderSerializer(many=True, read_only=True)

    class Meta:
        model = Users
        fields = ["id", "first_name", "last_name", "email", "address", "town", "orders"]

#All Customer details
class CustomerDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Users
        fields = ["id", "first_name", "last_name", "email", "address", "town"]
