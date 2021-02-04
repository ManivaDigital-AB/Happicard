from django.db.models.signals import post_save
from django.utils.translation import ugettext_lazy as _
from django.conf import settings
from django.db import models
from django.db.models import Sum
from django.utils import timezone
from django.conf import settings
import uuid

from backend.api.profiles.models import Store, NGO
from backend.settings.storage_backends import CampaignStorage, GiftCardStorage

OPTIONS = (
    ("draft", "Draft"),
    ("published", "Published"),
)

STORE_CHOICES = (
    ("Electronics", "Electronics"),
    ("Fashion & Accessories", "Fashion & Accessories"),
    ("Digital Entertainment", "Digital Entertainment"),
    ("Home & Garden", "Home & Garden"),
)

NGO_CHOICES = (
    ("Non-Profit Organization", "Non-Profit Organization"),
    ("Youth", "Youth"),
    ("Educational", "Educational"),
    ("Literary", "Literary"),
)


class Product(models.Model):
    """
    Abstract product model
    """

    class ProductsObjects(models.Manager):
        def get_queryset(self):
            return super().get_queryset().filter(status="published")

    id = models.UUIDField(
        default=uuid.uuid4,
        unique=True,
        db_index=True,
        editable=False,
        primary_key=True,
    )
    title = models.CharField(max_length=255, null=True, blank=True)

    price_option_1 = models.PositiveIntegerField(default=0)
    price_option_2 = models.PositiveIntegerField(default=0)
    price_option_3 = models.PositiveIntegerField(default=0)

    rebate_code_1 = models.CharField(max_length=200, unique=True, null=True, blank=True)
    rebate_code_2 = models.CharField(max_length=200, unique=True, null=True, blank=True)
    rebate_code_3 = models.CharField(max_length=200, unique=True, null=True, blank=True)

    description = models.TextField("Description", max_length=500, blank=True)
    tax_amount = models.IntegerField(default=0)

    online = models.BooleanField(default=True)
    premium = models.BooleanField(default=False)
    redeem_website = models.CharField(max_length=50, blank=True)
    published = models.DateTimeField(default=timezone.now)
    author = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="+",
        null=True,
        blank=True,
    )
    status = models.CharField(max_length=10, choices=OPTIONS, default="published")

    class Meta:
        ordering = ("-published",)

    def __str__(self):
        return f"{self.title} with the unique ID of {self.id}"


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
    store_category = models.CharField(
        max_length=50,
        choices=STORE_CHOICES,
        null=True,
        blank=True,
        verbose_name=_("Store Category"),
    )


class Campaign(Product):
    """
    NGO campaign model
    """

    class Meta:
        verbose_name = _("Campaign")
        verbose_name_plural = _("Campaigns")

    image = models.FileField(storage=CampaignStorage())
    ngo_category = models.CharField(
        max_length=50,
        choices=NGO_CHOICES,
        null=True,
        blank=True,
        verbose_name=_("NGO Category"),
    )