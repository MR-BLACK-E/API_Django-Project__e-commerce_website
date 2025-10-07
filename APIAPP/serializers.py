from django.contrib.auth.hashers import make_password
from rest_framework import *
from rest_framework import serializers
from .models import *



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
        fields = ["category", "name", "price","description","image"]    


      


