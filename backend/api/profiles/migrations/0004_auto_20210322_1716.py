# Generated by Django 3.1.3 on 2021-03-22 16:16

import backend.settings.storage_backends
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('profiles', '0003_profile_display_first'),
    ]

    operations = [
        migrations.AlterField(
            model_name='ngo',
            name='banner_image',
            field=models.FileField(blank=True, null=True, storage=backend.settings.storage_backends.NGOProfileStorage(), upload_to=''),
        ),
        migrations.AlterField(
            model_name='ngo',
            name='header_image',
            field=models.FileField(blank=True, null=True, storage=backend.settings.storage_backends.NGOProfileStorage(), upload_to=''),
        ),
        migrations.AlterField(
            model_name='store',
            name='banner_image',
            field=models.FileField(blank=True, null=True, storage=backend.settings.storage_backends.StoreProfileStorage(), upload_to=''),
        ),
        migrations.AlterField(
            model_name='store',
            name='header_image',
            field=models.FileField(blank=True, null=True, storage=backend.settings.storage_backends.StoreProfileStorage(), upload_to=''),
        ),
    ]