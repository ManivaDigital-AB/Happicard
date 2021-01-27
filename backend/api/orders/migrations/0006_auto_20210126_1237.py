# Generated by Django 3.1.3 on 2021-01-26 11:37

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('orders', '0005_happicard_order_confirm_id'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='happicard',
            name='order_confirm_id',
        ),
        migrations.AddField(
            model_name='happicard',
            name='happi_order_id',
            field=models.CharField(blank=True, max_length=50, null=True),
        ),
        migrations.AddField(
            model_name='happicard',
            name='klarna_order_id',
            field=models.CharField(blank=True, max_length=50, null=True),
        ),
    ]
