# Generated by Django 4.2.3 on 2023-10-02 14:36

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='restaurant',
            name='address',
            field=models.CharField(blank=True, max_length=500, null=True),
        ),
    ]