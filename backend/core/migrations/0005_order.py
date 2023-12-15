# Generated by Django 4.1.13 on 2023-12-15 07:06

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import shortuuid.django_fields


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('core', '0004_table'),
    ]

    operations = [
        migrations.CreateModel(
            name='Order',
            fields=[
                ('oid', shortuuid.django_fields.ShortUUIDField(alphabet='abcdefgh12345', length=10, max_length=20, prefix='', primary_key=True, serialize=False, unique=True)),
                ('order_date', models.DateField()),
                ('full_name', models.CharField(max_length=200)),
                ('phone', models.CharField(max_length=15)),
                ('price', models.DecimalField(decimal_places=2, default=2, max_digits=30)),
                ('paid_status', models.BooleanField(default=True)),
                ('product_status', models.CharField(choices=[('awaiting_confirmation', 'Awaiting confirmation'), ('confirmed', 'Confirmed'), ('complete', 'Complete'), ('cancel', 'Cancel')], default='awaiting_confirmation', max_length=50)),
                ('time_from', models.TimeField()),
                ('time_to', models.TimeField()),
                ('number_people', models.IntegerField(default=2)),
                ('deposit', models.DecimalField(decimal_places=2, max_digits=30)),
                ('restaurant', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='restaurant_order', to='core.restaurant')),
                ('table', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='core.table')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='user', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'verbose_name_plural': 'Order',
            },
        ),
    ]
