# Generated by Django 3.1.3 on 2020-11-29 14:05

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('profiles', '0002_auto_20201128_1742'),
    ]

    operations = [
        migrations.RenameField(
            model_name='ngo',
            old_name='store_category',
            new_name='ngo_category',
        ),
        migrations.RemoveField(
            model_name='profile',
            name='partner_category',
        ),
    ]
