# Generated by Django 3.1.3 on 2021-03-19 15:49

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('customizations', '0005_auto_20210319_1621'),
    ]

    operations = [
        migrations.AlterField(
            model_name='socialmedia',
            name='link',
            field=models.CharField(max_length=200, null=True),
        ),
    ]
