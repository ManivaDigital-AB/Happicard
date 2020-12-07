from django.db.models.signals import post_save
from django.conf import settings
from django.db import models
from django.db.models import Sum
from django.utils import timezone
from django.conf import settings
import uuid


def upload_to(instance, filename):
    return "static/vendors/products/{filename}".format(filename=filename)


class Product(models.Model):
    """
    General product model
    """

    title = models.CharField(max_length=255, null=True, blank=True)
    product_id = models.UUIDField(
        default=uuid.uuid4, unique=True, db_index=True, editable=False
    )
    price = models.IntegerField(default=0)
    image = models.ImageField("Image", upload_to=upload_to, default="default.jpg")
    description = models.TextField("Description", max_length=500, blank=True)
    quantity = models.IntegerField(default=1)
    tax_amount = models.IntegerField(default=0)
    author = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, null=True, blank=True
    )

    def __str__(self):
        return self.title


class GiftCard(Product):
    """
    Gift card model
    """

    has_offer = models.BooleanField(default=False)
    discount_price = models.FloatField(blank=True, null=True)


class Campaign(Product):
    """
    NGO campaign model
    """

    pass
