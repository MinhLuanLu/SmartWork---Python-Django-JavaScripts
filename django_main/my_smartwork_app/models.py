from django.db import models




class User(models.Model):
    FullName = models.CharField(max_length=50)
    Email = models.EmailField(max_length=50, unique=True)
    Address = models.CharField(max_length=100)
    City = models.CharField(max_length=50)
    Postcode = models.CharField(max_length=8)
    Password = models.CharField(max_length=50)
    Policy_agreement = models.BooleanField()
    Role = models.CharField(max_length=50, default='Employee')

    def __str__(self):
        return self.FullName
    


class Employee(models.Model):
    Role = models.CharField(max_length=50, default='Employee')
    user = models.OneToOneField(User, on_delete=models.CASCADE)

    def __str__(self):
        info = f"{self.user.FullName} [{self.Role}]"
        return info

class Manager(models.Model):
    Role = models.CharField(max_length=50, default='Employee')
    user = models.OneToOneField(User, on_delete=models.CASCADE)

    def __str__(self):
        info = f"{self.user.FullName} [{self.Role}]"
        return info
