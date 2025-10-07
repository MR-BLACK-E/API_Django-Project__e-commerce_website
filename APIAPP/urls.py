from django.urls import path
from .views import *

from django.urls import path
from .views import register, login
from django.urls import path
# from .views import registration

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)


urlpatterns = [
    
    path('register/',register, name='register'),
    path('login/',login, name='login'),
    path('reset/',reset_password,name = 'reset_password'),
    path('forget/',send_email, name = 'send_email'),

    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('adminlogin/',admin_login,name= 'admin_login'),
    path('product/',add_product,name= 'add_product'),
    path('category/',add_category,name= 'add_category'),
    path('categories/',get_categories,name= 'get_category'), 

    path("categoriesview/", CategoryListView.as_view(), name="categories"),
    path("productsview/", ProductListView.as_view(), name="products"),
]


