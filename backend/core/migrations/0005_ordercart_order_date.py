# Generated by Django 4.2.3 on 2023-11-11 04:20

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0004_table_number_seat'),
    ]

    operations = [
        migrations.AddField(
            model_name='ordercart',
            name='order_date',
            field=models.DateTimeField(auto_now_add=True, default=django.utils.timezone.now),
            preserve_default=False,
        ),
    ]
