from rest_framework import serializers
from .models import User
from django.contrib.auth.hashers import make_password


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "FullName", "Email", "Address", "City", "Postcode", "Password","Role", "Policy_agreement"]

    def create(self, validated_data):
        Password = validated_data.pop('Password', None)
        instance = self.Meta.model(**validated_data)
        if Password is not None:
            instance.Password = make_password(Password) # make password the hash
        instance.save()
        return instance
