# Generated by Django 3.1.3 on 2021-03-03 17:03

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
        ('items', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Profile',
            fields=[
                ('id', models.UUIDField(db_index=True, default=uuid.uuid4, editable=False, primary_key=True, serialize=False, unique=True)),
                ('title', models.CharField(max_length=255, unique=True)),
                ('about', models.TextField(blank=True, max_length=750, verbose_name='About')),
                ('published', models.DateTimeField(default=django.utils.timezone.now)),
                ('status', models.CharField(choices=[('draft', 'Draft'), ('published', 'Published')], default='published', max_length=10)),
                ('author', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='publishers', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'ordering': ('-published',),
            },
        ),
        migrations.CreateModel(
            name='Store',
            fields=[
                ('profile_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='profiles.profile')),
                ('image', models.FileField(storage=backend.settings.storage_backends.StoreProfileStorage(), upload_to='')),
                ('store_category', models.CharField(blank=True, choices=[('Electronics', 'Electronics'), ('Fashion & Accessories', 'Fashion & Accessories'), ('Digital Entertainment', 'Digital Entertainment'), ('Home & Garden', 'Home & Garden')], max_length=50, null=True, verbose_name='Store Category')),
                ('giftcards', models.ManyToManyField(blank=True, to='items.GiftCard')),
            ],
            options={
                'verbose_name': 'Store',
                'verbose_name_plural': 'Stores',
            },
            bases=('profiles.profile',),
        ),
        migrations.CreateModel(
            name='NGO',
            fields=[
                ('profile_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='profiles.profile')),
                ('image', models.FileField(storage=backend.settings.storage_backends.NGOProfileStorage(), upload_to='')),
                ('ngo_category', models.CharField(blank=True, choices=[('Non-Profit Organization', 'Non-Profit Organization'), ('Youth', 'Youth'), ('Educational', 'Educational'), ('Literary', 'Literary')], max_length=50, null=True, verbose_name='NGO Category')),
                ('campaigns', models.ManyToManyField(blank=True, to='items.Campaign')),
            ],
            options={
                'verbose_name': 'NGO',
                'verbose_name_plural': 'NGOs',
            },
            bases=('profiles.profile',),
        ),
    ]
