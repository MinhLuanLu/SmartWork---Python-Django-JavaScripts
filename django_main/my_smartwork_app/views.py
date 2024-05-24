from django.http import HttpResponse, JsonResponse
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view
from .models import User, Employee, Manager,CheckIn
from .serializers import UserSerializer, CheckInSerializer, ProfileSerialize, CheckIn_infoSerializer
from rest_framework.exceptions import AuthenticationFailed
from django.contrib.auth.hashers import check_password
from django.shortcuts import get_object_or_404






def home(request):
    return HttpResponse('HOME PAGE')

@api_view(['GET', 'POST'])
def register_api(request):
    if request.method == "GET":
        user = User.objects.all()
        userserializer = UserSerializer(user, many=True)
        
        return Response(userserializer.data)
    
    elif request.method == "POST":
        userserializer = UserSerializer(data=request.data)
        email = request.data.get('Email')
        role = request.data.get('Role')
            
        if User.objects.filter(Email=email).exists(): # Check the Emain is already in Database
            print("Email is already registered")
            return Response({'message': "Email is already registered"}, status=status.HTTP_400_BAD_REQUEST)
        if userserializer.is_valid():
            
            user = userserializer.save() #Save instance to User Model
            if role == "Employee":
                Employee.objects.create(user=user, Role=user.Role) # Save the instance to Employee Model
                
            elif role == "Manager":
                    Manager.objects.create(user=user, Role=user.Role)

            return Response({"message": "Registration successful"}, status=status.HTTP_201_CREATED)
        return Response({"message": "Data is not valid", "error": userserializer.errors}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def login(request):
    if request.method == "POST":
        Email = request.data.get('Email')
        Password = request.data.get('Password')
        
        user = User.objects.filter(Email=Email).first() # user first because the email is unique
        if user is None:
            raise AuthenticationFailed('User not found!')
        
        if not check_password(Password, user.Password):
            raise AuthenticationFailed('Incorrect password!')
   
        return Response({"message": "Login successful", "FullName": user.FullName}, status=status.HTTP_200_OK)

@api_view(["POST", "GET"])
def CheckIn_api(request):
   if request.method == "GET":
       checIn = CheckIn.objects.all()
       checkInSerializer = CheckInSerializer(checIn, many=True)
       return Response(checkInSerializer.data)
   
   if request.method == "POST":
        serializer = CheckInSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "CheckIn successful"}, status=status.HTTP_201_CREATED)
        return Response({"massage": "Data is not valid", 'error': "Error from Server"}, status=status.HTTP_400_BAD_REQUEST)

@api_view(["POST", "GET"]) #Do not to save the data to database
def User_info_api(request):
    if request.method == "GET":
        user_info = User.objects.all()
        profileserializer = ProfileSerialize(user_info, many=True)
        return Response(profileserializer.data) 
    
    if request.method == 'POST':
       Email = request.data.get('Email') #get the object Email in the API POST from Forntend
       info = User.objects.filter(Email=Email).first() # Get the Email in User Model [User.objects.get(Email=Email)]

       if info is None: 
            return Response({"error": 'Data is not valid'}, status=status.HTTP_400_BAD_REQUEST)
       
       profileserializer = ProfileSerialize(info) #Get all the data match that match the Email
    return Response({"message": 'successful', "user_info": profileserializer.data}, status=status.HTTP_200_OK)
    

@api_view(["POST", "GET"])
def CheckIn_info_api(request):
    if request.method == 'GET':
        checkin_info = CheckIn.objects.all()
        checkin_infoSerializer = CheckIn_infoSerializer(checkin_info, many=True)
        return Response(checkin_infoSerializer.data)
    
    if request.method == 'POST':
        get_email = request.data.get('Email')
        
        employee_check_info = CheckIn.objects.filter(employee__user__Email = get_email) # Get the Email in User Model by using __
        employee_check_infoSerializer = CheckIn_infoSerializer(employee_check_info, many=True) # Make the data to Serializer fields

        if employee_check_info is None:
            return Response({"message": "data not vailid"}, status=status.HTTP_400_BAD_REQUEST)
         
        

        
        return Response({"message": "Did Get Data", "checkin_info": employee_check_infoSerializer.data},status=status.HTTP_200_OK)