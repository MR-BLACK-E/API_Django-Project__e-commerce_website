from django.shortcuts import render
from django.contrib.auth import authenticate, login, logout
from django.core.mail import send_mail
from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string
from django.utils.html import format_html
from django.contrib.auth.models import User
import random
from django.conf import settings
#serializers
from rest_framework import generics
from .serializers import *
from .models import *
from .models import Users
from django.contrib.auth.hashers import check_password
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.views import APIView

#Register
@api_view(['POST'])
def register(request):
    serializer = RegisterSrializer(data=request.data)
   
    if serializer.is_valid():       
        serializer.save()
        return Response({"message": "User registered successfully"})
    return Response(serializer.errors)

#login
@api_view(['POST'])
def login(request):
    serializer = UserLoginSerializer(data=request.data)
    if serializer.is_valid():
        username = serializer.data['username']
        password = serializer.data['password']
        user = Users.objects.get(username=username)
        
        if User.objects.filter(username=username).exists():
            return Response({'error': 'Username already taken'})

        if check_password(password,user.password):
            return Response({"message": "Login successful"})
        else:
            return Response({"error": "Invalid password"})
        
    return Response(serializer.errors)


#Forget Password 
# @api_view(['POST'])
# def forget_password(request):
#    if request.method == 'POST':
#        email = request.data.get('email')
#        try:
#            user = Users.objects.get(email=email)
#            otp = str(random.randint(100000, 999999))
#            user.otp = otp
#            user.save()

#            send_mail(
#                'OTP',
#                f"Hello User {email}. Your OTP:{otp}",
#                'emilmathew@gmail.com',
#                [email],
#            )
       
#            return Response({ "Mail sent successfully!. Get OTP from your Mail"}) 
#        except Exception as e:
#             return Response({ "Failed to send your mail. Please try again."}) 
#    else:
#         return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)

#FORGET PASSWORD
#Generate OTP
@api_view(['POST'])
def send_email(request):
   if request.method == 'POST':
       email = request.data.get('email')
       try:
           user = Users.objects.get(email=email)
           otp = str(random.randint(100000, 999999))
           user.otp = otp
           user.save()

           subject = "Your OTP Code"
           from_email = "emilmathew1311@gmail.com"
           to = [email]

           text_content = f"Hello User {email}, Your OTP is: {otp}" 
        
           html_content = render_to_string('email.html', {
               'email': email,
               'otp': otp
           })


           msg = EmailMultiAlternatives(subject, text_content, from_email, to)
           msg.attach_alternative(html_content, "text/html")
           msg.send()
       
           return Response({ "Mail sent successfully!. Get OTP from your Mail"}) 
       except Exception as e:
            return Response({ "Failed to send your mail. Please try again."}) 
   else:
        return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)



#Reset Password    
@api_view(['POST'])
def reset_password(request):
    email = request.data.get('email')
    otp = request.data.get('otp')
    new_password = request.data.get('new_password')

    try:
        user = Users.objects.get(email=email)
        if user.otp == otp:
            user.password = make_password(new_password)
            user.save()
            return Response({"Password has been reset. You can Login with your new password"})
        else:
            return Response({"error": "Invalid OTP."})
    except Users.DoesNotExist:
        return Response({"error": "User not found."})


#Admin Access
@api_view(['POST'])
def product_add(request):
    pass