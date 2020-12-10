from django.db.models.signals import post_save
from django_countries.fields import CountryField
from django.conf import settings
from django.db import models
from django.db.models import Sum
from django.utils import timezone
from django.conf import settings
import uuid

from backend.api.products.models import GiftCard, Campaign


class OrderProduct(models.Model):
    id = models.UUIDField(
        default=uuid.uuid4,
        unique=True,
        db_index=True,
        editable=False,
        primary_key=True,
    )
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, null=True, blank=True
    )
    ordered = models.BooleanField(default=False)
    quantity = models.IntegerField(default=1)


class OrderGiftCard(OrderProduct):
    giftcard = models.ForeignKey(GiftCard, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.quantity} of {self.giftcard.title}"

    def get_total_giftcard_price(self):
        return self.quantity * self.giftcard.price

    def get_total_discount_giftcard_price(self):
        return self.quantity * self.giftcard.discount_price

    def get_amount_saved(self):
        return (
            self.get_total_giftcard_price() - self.get_total_discount_giftcard_price()
        )

    def get_final_price(self):
        if self.giftcard.discount_price:
            return self.get_total_discount_giftcard_price()
        return self.get_total_product_price()


class OrderCampaign(OrderProduct):
    campaign = models.ForeignKey(Campaign, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.quantity} of {self.campaign.title}"

    def get_total_campaign_price(self):
        return self.quantity * self.campaign.price


class Order(models.Model):
    """
    General order model
    """

    id = models.UUIDField(
        default=uuid.uuid4,
        unique=True,
        db_index=True,
        editable=False,
        primary_key=True,
    )
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        null=True,
        blank=True,
    )
    campaigns = models.ManyToManyField(OrderCampaign, blank=True)
    giftcards = models.ManyToManyField(OrderGiftCard, blank=True)
    status = models.CharField(max_length=56, null=False, default="created")
    first_name = models.CharField(max_length=50, null=False, blank=False)
    last_name = models.CharField(max_length=50, null=False, blank=False)
    email = models.EmailField(max_length=254, null=False, blank=False)
    phone_number = models.CharField(max_length=20, null=False, blank=False)
    country = CountryField(blank_label="Country *", null=False, blank=False)
    region = models.CharField(max_length=50, null=True, blank=False)
    postcode = models.CharField(max_length=20, null=True, blank=True)
    town_or_city = models.CharField(max_length=50, null=False, blank=False)
    street_address1 = models.CharField(max_length=80, null=False, blank=False)
    street_address2 = models.CharField(max_length=80, null=True, blank=True)
    date = models.DateTimeField(auto_now_add=True)
    order_total = models.DecimalField(
        max_digits=10, decimal_places=2, null=False, default=0
    )

    def __str__(self):
        return str(self.id)