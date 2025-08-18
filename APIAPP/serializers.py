from django.contrib.auth.hashers import make_password
from rest_framework import *
from rest_framework import serializers
from .models import *



#todo
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

# #Product
# class Productserializer(serializers.ModelSerializer):
#     class Meta:
#         model = Product
#         fields = '__all__'

# #todo
# class TodoSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Todo
#         fields = ['user', 'task']        


