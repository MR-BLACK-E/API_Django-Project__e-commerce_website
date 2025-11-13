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
from rest_framework import generics,permissions
from .serializers import *
from .models import *
from .models import Users
from django.contrib.auth.hashers import check_password
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view,permission_classes
from rest_framework.views import APIView
#permission
from rest_framework.decorators import  permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import PermissionDenied
from rest_framework_simplejwt.authentication import JWTAuthentication


#Register
@api_view(['POST'])
def register(request):
    serializer = RegisterSrializer(data=request.data)
   
    if serializer.is_valid():
        user = serializer.save(is_staff=False, is_superuser=False)       
        # serializer.save()
        return Response({"message": "User registered successfully"})
    return Response(serializer.errors)

#login
# @api_view(['POST'])
# def login(request):
#     serializer = UserLoginSerializer(data=request.data)
#     if serializer.is_valid():
#         username = serializer.data['username']
#         password = serializer.data['password']
        
#         user = Users.objects.get(username=username)
        
#         if check_password(password,user.password):
#             return Response({"message": "Login successful"})
#         else:
#             return Response({"error": "Invalid password"})
           
#     return Response(serializer.errors)


# @api_view(['POST'])
# def login(request):
#     serializer = UserLoginSerializer(data=request.data)
#     if serializer.is_valid():
#         username = serializer.validated_data['username']
#         password = serializer.validated_data['password']

#         try:
#             user = Users.objects.get(username=username)
#         except Users.DoesNotExist:
#             return Response({"error": "Invalid username"}, status=status.HTTP_400_BAD_REQUEST)

#         if check_password(password, user.password):
#             user_data = UserSerializer(user).data
#             return Response({
#                                 "message": "Login successful",
#                                 "user": user_data
#                              }, status=status.HTTP_200_OK)                       
#         else:
#             return Response({"error": "Invalid password"}, status=status.HTTP_400_BAD_REQUEST)

#     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#Login with Token
from rest_framework_simplejwt.tokens import RefreshToken 

@api_view(['POST'])
def login(request):
    serializer = UserLoginSerializer(data=request.data)
    if serializer.is_valid():
        username = serializer.validated_data['username']
        password = serializer.validated_data['password']

        try:
            user = Users.objects.get(username=username)
        except Users.DoesNotExist:
            return Response({"error": "Invalid username"}, status=status.HTTP_400_BAD_REQUEST)
        # if IsAdminUser:
        if user.is_staff or user.is_superuser:
            raise PermissionDenied("Admin cannot Login.")

        if check_password(password, user.password):
            refresh = RefreshToken.for_user(user)
            user_data = UserSerializer(user).data
            return Response({
                "message": "Login successful",
                "user": user_data,
                "access": str(refresh.access_token),
                "refresh": str(refresh),
            }, status=status.HTTP_200_OK)
        else:
            return Response({"error": "Invalid password"}, status=status.HTTP_400_BAD_REQUEST)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#for Admin Login
class AdminTokenObtainPairView(TokenObtainPairView):
    serializer_class = AdminTokenObtainPairSerializer

@api_view(['POST'])
@permission_classes([IsAdminUser]) 
def Admin_login(request):
    serializer = UserLoginSerializer(data=request.data)
    if serializer.is_valid():
        username = serializer.validated_data['username']
        password = serializer.validated_data['password']

        try:
            user = Users.objects.get(username=username)
        except Users.DoesNotExist:
            return Response({"error": "Invalid username"}, status=status.HTTP_400_BAD_REQUEST)
        
        if not user.is_staff or user.is_superuser:
            raise PermissionDenied("Only Admin can Login.")
        
        if check_password(password, user.password):
            refresh = RefreshToken.for_user(user)
            user_data = UserSerializer(user).data
            return Response({
                "message": "Login successful",
                "user": user_data,
                "access": str(refresh.access_token),
                "refresh": str(refresh),
            }, status=status.HTTP_200_OK)
        else:
            return Response({"error": "Invalid password"}, status=status.HTTP_400_BAD_REQUEST)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

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


# Add Product
@api_view(['POST'])
@permission_classes([IsAdminUser]) 
def add_product(request):
    if not request.user.is_staff: 
        raise PermissionDenied("Only admin can add products.")
    
    serializer = ProductSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({"message" : "Product added successfully"})
    return Response(serializer.errors)

# Add Category
@api_view(['POST'])
@permission_classes([IsAdminUser]) 
def add_category(request):
    if not request.user.is_staff: 
        raise PermissionDenied("Only admin can create category.")
    
    serializer = CategorySerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({"message" : "Category added successfully"})
    return Response(serializer.errors)


#get category
@api_view(['GET'])
def get_categories(request):
    categories = Category.objects.all()
    serializer = CategorySerializer(categories, many=True)
    return Response(serializer.data)

#Admin Login
@api_view(['POST'])
@permission_classes([IsAdminUser]) 
def admin_login(request):
    serializer = UserLoginSerializer(data=request.data)
    if serializer.is_valid():
        username = serializer.validated_data['username']
        password = serializer.validated_data['password']

        try:
            user = Users.objects.get(username=username)
        except Users.DoesNotExist:
            return Response({"error": "User not found"}, status=404)

        # check password
        if check_password(password, user.password):
            if user.is_staff:  
                return Response({"message": "Admin login successful"})
            else:
                return Response({"error": "You are not an admin"}, status=403)
        else:
            return Response({"error": "Invalid password"}, status=400)

    return Response(serializer.errors, status=400)

# category and product view
class CategoryListView(generics.ListAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

class ProductListView(generics.ListAPIView):
    queryset = Products.objects.all()
    serializer_class = ProductSerializer

class ProductDetailView(generics.RetrieveAPIView):
    queryset = Products.objects.all()
    serializer_class = ProductSerializer    

#Cart
class CartView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        cart_items = Cart.objects.filter(user=user)
        serializer = CartSerializer(cart_items, many=True)
        return Response(serializer.data)

    def post(self, request):
        user = request.user
        product_id = request.data.get('product_id')
        quantity = request.data.get('quantity', 1)

        cart_item,created = Cart.objects.get_or_create(
            user=user, 
            product_id=product_id
        )
        cart_item.quantity = quantity
        cart_item.save()
        return Response({'message': 'Item added successfully'})

    def delete(self, request):
        user = request.user
        product_id = request.data.get('product_id')
        Cart.objects.filter(user=user, product_id=product_id).delete()
        return Response({'message': 'Item removed'})

# Orders
class OrderItemView(generics.ListAPIView):
    queryset = OrderItem.objects.all()
    serializer_class = OrderItemSerializer

class OrderListView(generics.ListAPIView):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer

class OrderView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request):
        user = request.user
        cart_items = Cart.objects.filter(user=user)

        if not cart_items.exists():
            return Response({"error": "Cart is empty"}, status=status.HTTP_400_BAD_REQUEST)

        total_amount = sum(item.product.price * item.quantity for item in cart_items)

        order = Order.objects.create(user=user, total_amount=total_amount)

        for item in cart_items:
            OrderItem.objects.create(
                order=order,
                product=item.product,
                quantity=item.quantity,
                price=item.product.price
            )

        cart_items.delete()

        return Response({"message": "Order placed successfully"}, status=status.HTTP_201_CREATED)


@api_view(['POST'])
@permission_classes([IsAuthenticated]) 
def cart(request):
   
   serializer = CartSerializer(data=request.data)
   if serializer.is_valid():
        serializer.save()
        return Response({"message" : "Product added to Cart"})
   return Response(serializer.errors)


# GET: List user’s orders
class UserOrderListView(generics.ListAPIView):
    serializer_class = OrderSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Order.objects.filter(user= self.request.user).order_by('-created_at')


# POST: Create an order from user's cart
class OrderCreateView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        user = request.user
        cart = Cart.objects.filter(user=user).first()

        if not cart or not cart.items.exists():
            return Response({"detail": "Cart is empty."}, status=400)

        # Calculate total
        total = sum(item.product.price * item.quantity for item in cart.items.all())

        # Create order
        order = Order.objects.create(user=user, total=total)

        # Copy cart items to order items
        for item in cart.items.all():
            OrderItem.objects.create(order=order, product=item.product, quantity=item.quantity)

        # Clear cart
        cart.items.all().delete()

        return Response(OrderSerializer(order).data, status=201)

#Order Summery
class LatestOrderView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        latest_order = Order.objects.filter(user=request.user).order_by('-created_at').first()
        if not latest_order:
            return Response({"detail": "No recent orders found."}, status=404)
        serializer = OrderSerializer(latest_order)
        return Response(serializer.data)

#Users Details

class UserDetailsView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        user = request.user
        details = UserDetails.objects.filter(user=user)
        serializer = UserDetailsSerializer(details, many=True)
        return Response(serializer.data)

    def post(self, request):
        user = request.user
        first_name = request.data.get('first_name')
        last_name = request.data.get('last_name')
        email = request.data.get("email")
        address = request.data.get('address')
        town = request.data.get('town')

        details,created = UserDetails.objects.get_or_create(
            user=user, 
            first_name=first_name,
            last_name=last_name,
            email=email,
            address=address,
            town=town
        )
        details.save()
        return Response({'message': 'Details saved'})

    # def delete(self, request):
    #     user = request.user
    #     product_id = request.data.get('product_id')
    #     Cart.objects.filter(user=user, product_id=product_id).delete()
    #     return Response({'message': 'Item removed'})

#Users Details (Edit profile)
class UserMainDetailsView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        user = request.user
        serializer = UserMainDetailsSerializer(user)
        return Response(serializer.data)

    def post(self, request):
        user = request.user
        data = request.data

        user.first_name = data.get('first_name', user.first_name)
        user.last_name = data.get('last_name', user.last_name)
        user.email = data.get('email', user.email)
        user.address = data.get('address', user.address)
        user.town = data.get('town', user.town)
        user.save()

        return Response({'message': 'Details updated successfully'})

#Admin dashboard CUSTOMERS
class AllCustomersView(APIView):
    permission_classes = [IsAdminUser]

    def get(self, request):
        users = Users.objects.all() 
        data = []

        for user in users:
            orders = Order.objects.filter(user=user)
            order_serializer = OrderSerializer(orders, many=True)
            data.append({
                "id": user.id,
                "first_name": user.first_name,
                "last_name": user.last_name,
                "email": user.email,
                "town": user.town,
                "address": user.address,
                "orders": order_serializer.data
            })
        return Response(data)
    

# class CustomerListView(generics.ListAPIView):
#     permission_classes = [permissions.IsAdminUser]
#     queryset = Users.objects.all()
#     serializer_class = CustomerSerializer

# class AllCustomersView(APIView):
#     permission_classes = [IsAdminUser]

#     def get(self, request):
#         users = Users.objects.all()
#         serializer = CustomerSerializer(users, many=True)
#         return Response(serializer.data)

class AllCustomersOrderView(generics.ListAPIView):
    queryset = Users.objects.all()
    serializer_class = CustomerSerializer
    permission_classes = [IsAdminUser]


class AllCustomersView(generics.ListAPIView):
    queryset = Users.objects.filter(is_superuser=False, is_staff=False)
    serializer_class = CustomerDetailsSerializer
    permission_classes = [IsAdminUser]   
