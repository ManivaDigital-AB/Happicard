# Generated by Django 3.1.3 on 2020-12-08 13:03

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('products', '0002_auto_20201207_1304'),
    ]

    operations = [
        migrations.AlterField(
            model_name='product',
            name='title',
            field=models.CharField(blank=True, max_length=255, null=True, unique=True),
        ),
    ]
