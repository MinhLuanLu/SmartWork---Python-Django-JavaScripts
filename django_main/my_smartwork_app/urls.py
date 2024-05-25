from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('register_api/', views.register_api, name='register_api'),
    path('login/', views.login, name='login'),
    path('CheckIn_api/', views.CheckIn_api, name= "CheckIn_api"),
    path('User_info_api/', views.User_info_api, name='User_info_api'),
    path('CheckIn_info_api/', views.CheckIn_info_api, name='CheckIn_info'),
    path('Assignment_api/', views.Assignment_api, name='Assignment_api')
  
    
    
]
