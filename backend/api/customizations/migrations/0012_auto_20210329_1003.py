# Generated by Django 3.1.3 on 2021-03-29 08:03

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('customizations', '0011_auto_20210329_1002'),
    ]

    operations = [
        migrations.AlterField(
            model_name='aboutpage',
            name='about_page_paragraph_bottom',
            field=models.TextField(max_length=750),
        ),
        migrations.AlterField(
            model_name='aboutpage',
            name='about_page_paragraph_top',
            field=models.TextField(max_length=750),
        ),
    ]
