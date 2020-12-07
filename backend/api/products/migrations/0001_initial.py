# Generated by Django 3.1.3 on 2020-12-07 10:58

import backend.api.products.models
from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import uuid


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Product',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(blank=True, max_length=255, null=True)),
                ('product_id', models.UUIDField(db_index=True, default=uuid.uuid4, editable=False, unique=True)),
                ('price', models.IntegerField(default=0)),
                ('image', models.ImageField(default='default.jpg', upload_to=backend.api.products.models.upload_to, verbose_name='Image')),
                ('description', models.TextField(blank=True, max_length=500, verbose_name='Description')),
                ('quantity', models.IntegerField(default=1)),
                ('tax_amount', models.IntegerField(default=0)),
                ('author', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Campaign',
            fields=[
                ('product_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='products.product')),
            ],
            bases=('products.product',),
        ),
        migrations.CreateModel(
            name='GiftCard',
            fields=[
                ('product_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='products.product')),
                ('has_offer', models.BooleanField(default=False)),
                ('discount_price', models.FloatField(blank=True, null=True)),
            ],
            bases=('products.product',),
        ),
    ]
