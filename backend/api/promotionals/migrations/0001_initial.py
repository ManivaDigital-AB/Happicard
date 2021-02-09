# Generated by Django 3.1.3 on 2021-02-08 07:17

import backend.settings.storage_backends
from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone
import uuid


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Promo',
            fields=[
                ('id', models.UUIDField(db_index=True, default=uuid.uuid4, editable=False, primary_key=True, serialize=False, unique=True)),
                ('title', models.CharField(blank=True, max_length=255, null=True)),
                ('description', models.TextField(blank=True, max_length=500, verbose_name='Description')),
                ('promo_image_1', models.FileField(storage=backend.settings.storage_backends.PromoStorage(), upload_to='')),
                ('promo_image_2', models.FileField(storage=backend.settings.storage_backends.PromoStorage(), upload_to='')),
                ('promo_image_3', models.FileField(storage=backend.settings.storage_backends.PromoStorage(), upload_to='')),
                ('promo_image_4', models.FileField(storage=backend.settings.storage_backends.PromoStorage(), upload_to='')),
                ('promo_image_5', models.FileField(storage=backend.settings.storage_backends.PromoStorage(), upload_to='')),
                ('promo_image_6', models.FileField(storage=backend.settings.storage_backends.PromoStorage(), upload_to='')),
                ('promo_image_7', models.FileField(storage=backend.settings.storage_backends.PromoStorage(), upload_to='')),
                ('promo_image_8', models.FileField(storage=backend.settings.storage_backends.PromoStorage(), upload_to='')),
                ('promo_image_9', models.FileField(storage=backend.settings.storage_backends.PromoStorage(), upload_to='')),
                ('promo_image_10', models.FileField(storage=backend.settings.storage_backends.PromoStorage(), upload_to='')),
                ('published', models.DateTimeField(default=django.utils.timezone.now)),
                ('status', models.CharField(choices=[('draft', 'Draft'), ('published', 'Published')], default='published', max_length=10)),
                ('author', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='+', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'verbose_name': 'Promos',
                'verbose_name_plural': 'Promos',
                'ordering': ('-published',),
            },
        ),
    ]