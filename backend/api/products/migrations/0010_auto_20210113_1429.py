# Generated by Django 3.1.3 on 2021-01-13 13:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('products', '0009_auto_20210113_1425'),
    ]

    operations = [
        migrations.AddField(
            model_name='campaign',
            name='ngo_category',
            field=models.CharField(blank=True, choices=[('Non-Profit Organization', 'Non-Profit Organization'), ('Youth', 'Youth'), ('Educational', 'Educational'), ('Literary', 'Literary')], max_length=50, null=True, verbose_name='NGO Category'),
        ),
        migrations.AlterField(
            model_name='giftcard',
            name='store_category',
            field=models.CharField(blank=True, choices=[('Electronics', 'Electronics'), ('Fashion & Accessories', 'Fashion & Accessories'), ('Digital Entertainment', 'Digital Entertainment'), ('Home & Garden', 'Home & Garden')], max_length=50, null=True, verbose_name='Store Category'),
        ),
    ]
