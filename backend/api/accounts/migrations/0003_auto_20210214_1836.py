# Generated by Django 3.1.3 on 2021-02-14 17:36

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0002_auto_20210212_1814'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='password',
            field=models.CharField(default='Happicard-<function uuid4 at 0x7fcbe6b9b040>', max_length=50, verbose_name='Password'),
        ),
    ]
