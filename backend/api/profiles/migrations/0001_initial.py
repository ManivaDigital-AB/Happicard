# Generated by Django 3.1.3 on 2020-11-26 20:27

import backend.api.profiles.models
from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Profile',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('image', models.ImageField(default='profiles/default.jpg', upload_to=backend.api.profiles.models.upload_to, verbose_name='Image')),
                ('slug', models.SlugField(blank=True, max_length=250, null=True, unique_for_date='published')),
                ('about', models.TextField(blank=True, max_length=500, verbose_name='About')),
                ('published', models.DateTimeField(default=django.utils.timezone.now)),
                ('partner_category', models.CharField(blank=True, choices=[('NGO', 'NGO'), ('Store', 'Store')], max_length=50, null=True)),
                ('brand_category', models.CharField(blank=True, choices=[('Electronics', 'Electronics'), ('Fashion & Accessories', 'Fashion & Accessories'), ('Digital Entertainment', 'Digital Entertainment'), ('Home & Garden', 'Home & Garden')], max_length=50, null=True)),
                ('status', models.CharField(choices=[('draft', 'Draft'), ('published', 'Published')], default='published', max_length=10)),
                ('author', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='publishers', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'ordering': ('-published',),
            },
        ),
    ]
