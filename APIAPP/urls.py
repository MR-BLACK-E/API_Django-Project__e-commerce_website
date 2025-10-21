from django.urls import path
from .views import *

from django.urls import path
from .views import register, login
from django.urls import path
# from .views import registration

from rest_framework_simplejwt.views import (
    # TokenObtainPairView,
    TokenRefreshView,
)


urlpatterns = [
    
    path('register/',register, name='register'), #Users
    path('login/',login, name='login'), #Users
    path('reset/',reset_password,name = 'reset_password'), #Users
    path('forget/',send_email, name = 'send_email'), #Users

    path('token/', AdminTokenObtainPairView.as_view(), name='token_obtain_pair'), #Admin
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'), #Admin
    # path('adminlogin/',admin_login,name= 'admin_login'),
    # path('token/',Admin_login,name= 'admin_login'),
    path('product/',add_product,name= 'add_product'), #Admin
    path('category/',add_category,name= 'add_category'), #Admin
    path('categories/',get_categories,name= 'get_category'), #Admin

    path("categoriesview/", CategoryListView.as_view(), name="categories"),
    path("productsview/", ProductListView.as_view(), name="products"),
    path('productsview/<int:pk>/', ProductDetailView.as_view(), name='product-detail'),

    # path("cart/", CartView.as_view(), name="cart"),
    # path("orderitem/", OrderItemView.as_view(), name="orderlist"),
    # path("orders/", OrderView.as_view(), name="orders"),

     path("cart/", CartView.as_view(), name="cart"), #Cart
    path("cart/<int:product_id>/", CartView.as_view(), name="cart-item"), #Cart
    path("order/", OrderView.as_view(), name="orders"), #Checkout
    path("order-items/", OrderItemView.as_view(), name="order-items"),
    # path("carts/",cart, name = 'cart')
    # path('orders/', OrderListView.as_view(), name='order-list'), 
    path('orders/', UserOrderListView.as_view(), name='order-list'), #MyOrders
    path('orders/create/', OrderCreateView.as_view(), name='order-create'),
    path('summery/', LatestOrderView.as_view(), name='order-list'), #OrderSummery  


]


