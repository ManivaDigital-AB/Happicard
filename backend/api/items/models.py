from django.utils.translation import ugettext_lazy as _
from django.conf import settings
from django.db import models
from django.utils import timezone
from django.conf import settings
import uuid

from backend.api.accounts.models import STORE_CHOICES, NGO_CHOICES
from backend.settings.storage_backends import CampaignStorage, GiftCardStorage

OPTIONS = (
    ("draft", "Draft"),
    ("published", "Published"),
)


class Item(models.Model):
    """
    Abstract Item Model
    """

    class ItemsObjects(models.Manager):
        def get_queryset(self):
            return super().get_queryset().filter(status="published")

    class Meta:
        ordering = ("-published",)

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

    online = models.BooleanField(default=True)
    in_store = models.BooleanField(default=False)
    redeem_website = models.CharField(max_length=50, blank=True)

    display_first = models.BooleanField(default=False)

    published = models.DateTimeField(default=timezone.now)
    author = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="+",
        null=True,
        blank=True,
    )
    status = models.CharField(max_length=10, choices=OPTIONS, default="published")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.title} with the unique ID of {self.id}"


class GiftCard(Item):
    """
    Gift Card Model
    """

    class Meta:
        verbose_name = _("Gift Card")
        verbose_name_plural = _("Gift Cards")

    image = models.FileField(storage=GiftCardStorage(), blank=True, null=True)
    has_offer = models.BooleanField(default=False)
    discount_price = models.IntegerField(default=0)
    store_category = models.CharField(
        max_length=100,
        choices=STORE_CHOICES,
        null=True,
        blank=True,
        verbose_name=_("Gift Card Category"),
    )


class Campaign(Item):
    """
    NGO Campaign Model
    """

    class Meta:
        verbose_name = _("Campaign")
        verbose_name_plural = _("Campaigns")

    image = models.FileField(storage=CampaignStorage(), blank=True, null=True)
    ngo_category = models.CharField(
        max_length=100,
        choices=NGO_CHOICES,
        null=True,
        blank=True,
        verbose_name=_("Campaign Category"),
    )