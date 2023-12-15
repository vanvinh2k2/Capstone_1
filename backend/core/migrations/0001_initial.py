# Generated by Django 4.1.13 on 2023-12-15 07:03

from django.db import migrations, models
import shortuuid.django_fields


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Category',
            fields=[
                ('cid', shortuuid.django_fields.ShortUUIDField(alphabet='abcdefgh12345', length=10, max_length=20, prefix='cat', primary_key=True, serialize=False, unique=True)),
                ('title', models.CharField(max_length=100)),
                ('image', models.ImageField(upload_to='category')),
            ],
            options={
                'verbose_name_plural': 'Categories',
            },
        ),
    ]
