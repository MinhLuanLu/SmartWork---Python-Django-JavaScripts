from django.db import models




class Employee(models.Model):
    FullName = models.CharField(max_length=50)
    Email = models.EmailField(max_length=50, unique=True)
    Address = models.CharField(max_length=100)
    City = models.CharField(max_length=50)
    Postcode = models.CharField(max_length=8)
    Password = models.CharField(max_length=50)
    Policy_agreement = models.BooleanField()

    def __str__(self):
        return self.FullName


