# Generated by Django 3.1.3 on 2021-01-13 13:06

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('profiles', '0005_auto_20210113_1406'),
        ('products', '0004_auto_20210113_1355'),
    ]

    operations = [
        migrations.AlterField(
            model_name='giftcard',
            name='store_category',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='profiles.store', to_field='store_category'),
        ),
    ]