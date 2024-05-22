from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('register_api/', views.register_api, name='register_api'),
    path('login/', views.login, name='login'),
    path('CheckIn_api/', views.CheckIn_api, name= "CheckIn_api")
    
    
]
