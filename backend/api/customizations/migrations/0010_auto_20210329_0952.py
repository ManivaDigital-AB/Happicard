# Generated by Django 3.1.3 on 2021-03-29 07:52

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('customizations', '0009_auto_20210322_1716'),
    ]

    operations = [
        migrations.AlterField(
            model_name='partnerspage',
            name='partners_page_paragraph',
            field=models.TextField(max_length=750),
        ),
    ]
