from rest_framework import serializers
from .models import Employee
from django.contrib.auth.hashers import make_password


class EmployeeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employee
        fields = ["id", "FullName", "Email", "Address", "City", "Postcode", "Password", "Policy_agreement"]

    def create(self, validated_data):
        Password = validated_data.pop('Password', None)
        instance = self.Meta.model(**validated_data)
        if Password is not None:
            instance.Password = make_password(Password) # make password the hash
        instance.save()
        return instance
