# Generated by Django 3.1.3 on 2021-03-17 10:10

from django.db import migrations, models
import uuid


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Keyword',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('keyword', models.CharField(max_length=20)),
            ],
        ),
        migrations.CreateModel(
            name='SEO',
            fields=[
                ('id', models.UUIDField(db_index=True, default=uuid.uuid4, editable=False, primary_key=True, serialize=False, unique=True)),
                ('title', models.CharField(blank=True, max_length=68)),
                ('description', models.TextField(max_length=155)),
                ('heading', models.CharField(max_length=20)),
                ('subheading', models.CharField(max_length=20)),
                ('extra', models.CharField(max_length=20)),
                ('keywords', models.ManyToManyField(blank=True, to='seo.Keyword')),
            ],
            options={
                'verbose_name': 'SEO',
                'verbose_name_plural': 'SEO',
            },
        ),
    ]
