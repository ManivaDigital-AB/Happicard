# Generated by Django 3.1.3 on 2021-03-18 12:43

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('profiles', '0002_auto_20210317_0824'),
    ]

    operations = [
        migrations.AddField(
            model_name='profile',
            name='display_first',
            field=models.BooleanField(default=False),
        ),
    ]
