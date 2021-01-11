from django.db.models.signals import post_save
from django.utils.translation import ugettext_lazy as _
from django.conf import settings
from django.db import models
from django.db.models import Sum
from django.utils import timezone
from django.conf import settings
import uuid

from backend.settings.storage_backends import CampaignStorage, GiftCardStorage


class Product(models.Model):
    """
    General product model
    """

    id = models.UUIDField(
        default=uuid.uuid4,
        unique=True,
        db_index=True,
        editable=False,
        primary_key=True,
    )
    title = models.CharField(max_length=255, null=True, blank=True, unique=True)
    price = models.IntegerField(default=0)
    description = models.TextField("Description", max_length=500, blank=True)
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

    class Meta:
        verbose_name = _("Gift Card")
        verbose_name_plural = _("Gift Cards")

    image = models.FileField(storage=GiftCardStorage())
    has_offer = models.BooleanField(default=False)
    discount_price = models.IntegerField(default=0)


class Campaign(Product):
    """
    NGO campaign model
    """

    class Meta:
        verbose_name = _("Campaign")
        verbose_name_plural = _("Campaigns")

    image = models.FileField(storage=CampaignStorage())
