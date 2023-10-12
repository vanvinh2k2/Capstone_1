# Generated by Django 4.2.3 on 2023-10-11 13:30

from django.db import migrations, models
import django.db.models.deletion
import shortuuid.django_fields


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0002_restaurant_address'),
    ]

    operations = [
        migrations.CreateModel(
            name='OrderCart',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('ocid', shortuuid.django_fields.ShortUUIDField(alphabet='abcdefgh12345', length=10, max_length=20, prefix='', unique=True)),
                ('full_name', models.CharField(max_length=200)),
                ('phone', models.CharField(max_length=15)),
                ('time_from', models.TimeField()),
                ('time_to', models.TimeField()),
                ('number_people', models.IntegerField(default=2)),
                ('table', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='core.table')),
            ],
            options={
                'verbose_name_plural': 'Order Carts',
            },
        ),
        migrations.CreateModel(
            name='OrderCartItem',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('quantity', models.PositiveIntegerField(default=1)),
                ('dish', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='core.dish')),
                ('ordercart', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='core.ordercart')),
            ],
        ),
    ]
