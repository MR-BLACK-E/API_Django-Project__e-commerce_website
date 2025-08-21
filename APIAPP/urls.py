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
    # path('forget/',forget_password,name = 'forget_password'),
    path('reset/',reset_password,name = 'reset_password'),
    path('forget/',send_email, name = 'send_email'),
    # path('change/',change_password,name = 'change_password'),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    # path('product_add/',product_add,name= 'product_add'),
    path('add/',add_product,name= 'add_product'),

]


