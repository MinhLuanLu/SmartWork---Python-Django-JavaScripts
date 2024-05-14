from django.http import HttpResponse, JsonResponse
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view
from .models import Employee
from .serializers import EmployeeSerializer
from rest_framework.exceptions import AuthenticationFailed
from django.contrib.auth.hashers import check_password






def home(request):
    return HttpResponse('HOME PAGE')

@api_view(['GET', 'POST'])
def register_api(request):
    if request.method == "GET":
        employees = Employee.objects.all()
        serializer = EmployeeSerializer(employees, many=True)
        
        return Response(serializer.data)
    
    elif request.method == "POST":
        serializer = EmployeeSerializer(data=request.data)
        if serializer.is_valid():
            email = request.data.get('Email')
            if Employee.objects.filter(Email=email).exists(): # Check the Emain is already in Database
                return Response({'message': "Email is already registered"}, status=status.HTTP_400_BAD_REQUEST)
            else:
                serializer.save()
                return Response({"message": "Registration successful"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def login(request):
    if request.method == "POST":
        Email = request.data.get('Email')
        Password = request.data.get('Password')
        
        user = Employee.objects.filter(Email=Email).first() # user first because the email is unique
        if user is None:
            raise AuthenticationFailed('User not found!')
        
        if not check_password(Password, user.Password):
            raise AuthenticationFailed('Incorrect password!')
        
        #Get the FullName in Employee
        return Response({"message": "Login successful", "FullName": user.FullName}, status=status.HTTP_200_OK)