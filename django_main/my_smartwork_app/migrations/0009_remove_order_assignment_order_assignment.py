# Generated by Django 5.0.4 on 2024-05-30 09:27

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('my_smartwork_app', '0008_remove_order_assignment_order_assignment'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='order',
            name='assignment',
        ),
        migrations.AddField(
            model_name='order',
            name='assignment',
            field=models.ManyToManyField(to='my_smartwork_app.assignment'),
        ),
    ]
