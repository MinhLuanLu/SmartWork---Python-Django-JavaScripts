from django.contrib import admin
from .models import User, Employee, Manager, Customer, Assignment

# Register your models here.
admin.site.register(User)
admin.site.register(Employee)
admin.site.register(Manager)
admin.site.register(Customer)
admin.site.register(Assignment)
