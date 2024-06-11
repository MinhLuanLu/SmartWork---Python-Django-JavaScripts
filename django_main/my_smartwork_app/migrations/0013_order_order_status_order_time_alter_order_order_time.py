# Generated by Django 5.0.4 on 2024-05-31 17:51

import django.utils.timezone
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('my_smartwork_app', '0012_alter_order_receiver'),
    ]

    operations = [
        migrations.AddField(
            model_name='order',
            name='Order_status',
            field=models.CharField(default=1, max_length=100),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='order',
            name='Time',
            field=models.DateTimeField(auto_now_add=True, default=django.utils.timezone.now),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='order',
            name='Order_time',
            field=models.CharField(max_length=100),
        ),
    ]