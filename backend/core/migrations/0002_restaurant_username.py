# Generated by Django 4.1.13 on 2023-11-27 14:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='restaurant',
            name='username',
            field=models.CharField(max_length=150, null=True),
        ),
    ]
