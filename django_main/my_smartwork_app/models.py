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
    Joined_at = models.DateTimeField(auto_now_add=True)

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
    
class Customer(models.Model):
    Customer_Name = models.CharField(max_length=100)
    Address = models.CharField(max_length=50)
    Country = models.CharField(max_length=50)
    City = models.CharField(max_length=50)
    Contract_Number = models.CharField(max_length=50)
    Due_date = models.DateField()
    Created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.Customer_Name


class Assignment(models.Model):
    Titlle = models.CharField(max_length=100)
    Description = models.TextField()
    customer = models.ManyToManyField(Customer)
    contract_manager = models.ManyToManyField(Manager)
    employee = models.ManyToManyField(Employee)
    Created_at = models.DateField(auto_now_add=True)
    Activate = models.BooleanField()

    def __str__(self):
        info = f'{self.Titlle}: {self.Created_at} [ Status: Active ]'
        if self.Activate == True:
            return info
        else:
            info = f'{self.Titlle}: {self.Created_at} [ Status: Cancelled ]'

class CheckIn(models.Model):
    employee = models.ForeignKey(Employee, on_delete=models.CASCADE)
    Location = models.CharField(max_length=100)
    Latitude = models.CharField(max_length=50)
    Longitude = models.CharField(max_length=50)
    CheckIn_time = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.employee.user.FullName} - CheckIn at [ {str(self.CheckIn_time)} - {self.Location}]"