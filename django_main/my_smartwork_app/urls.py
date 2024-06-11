from django.urls import path
from . import views


urlpatterns = [
    path('', views.home, name='home'), 
    path('register_api/', views.register_api, name='register_api'),
    path('login/', views.login, name='login'),
    path('api/CheckIn', views.API_CheckIn, name= "API_CheckIn"),
    path('api/User_info/', views.User_info, name='User_info_api'),
    path('CheckIn_info_api', views.CheckIn_info_api, name='CheckIn_info'),
    path('api/Workplace', views.api_Workplace, name='api_Workplace'),
    path('api/Assignment', views.api_Assignment, name='Assignment_api'),
    path('api/Order/', views.api_Order, name="Order_api"),
    path('api/Requestments/', views.api_Requestments, name='Requestments'),
    
    path('Approved_order_api/', views.Approved_order_api, name="Approved_order_api"),
    path('Decline_order_api/', views.Decline_order_api, name="Decline_order_api"),
  
    path('api/Conversation', views.api_Conversation, name='api_Conversation'),
    path('api/Get_conversation', views.api_Get_conversation, name='api_Get_conversation')
    
    
]
