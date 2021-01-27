# Generated by Django 3.1.3 on 2021-01-13 12:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('profiles', '0003_auto_20210113_1355'),
    ]

    operations = [
        migrations.AlterField(
            model_name='store',
            name='store_category',
            field=models.CharField(blank=True, choices=[('Electronics', 'Electronics'), ('Fashion & Accessories', 'Fashion & Accessories'), ('Digital Entertainment', 'Digital Entertainment'), ('Home & Garden', 'Home & Garden')], default='Fashion & Accessories', max_length=50, unique=True, verbose_name='Store Category'),
        ),
    ]