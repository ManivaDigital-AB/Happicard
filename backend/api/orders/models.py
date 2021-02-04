from django.db.models.signals import post_save
from django_countries.fields import CountryField
from django.conf import settings
from django.db import models
from django.db.models import Sum
from django.utils import timezone
from django.conf import settings
import uuid

from django.utils.translation import gettext_lazy as _
from backend.api.products.models import GiftCard, Campaign
from backend.settings.storage_backends import (
    HappicardImageStorage,
    HappicardVideoStorage,
)


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
    price_choice = models.PositiveIntegerField(default=0)
    quantity = models.IntegerField(default=1)


class OrderGiftCard(OrderProduct):
    class Meta:
        verbose_name = _("Gift Card in Basket")
        verbose_name_plural = _("Gift Cards in Basket")

    giftcard = models.ForeignKey(GiftCard, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.quantity} of {self.giftcard.title} with {self.price_choice} SEK"

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

    @property
    def match_price_choice_with_rebate(self):
        if self.price_choice == self.giftcard.price_option_1:
            return self.giftcard.rebate_code_1
        elif self.price_choice == self.giftcard.price_option_2:
            return self.giftcard.rebate_code_2
        else:
            return self.giftcard.rebate_code_3


class OrderCampaign(OrderProduct):
    class Meta:
        verbose_name = _("Campaign in Basket")
        verbose_name_plural = _("Campaigns in Basket")

    campaign = models.ForeignKey(Campaign, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.quantity} of {self.campaign.title}"

    def get_total_campaign_price(self):
        return self.quantity * self.campaign.price


class Happicard(models.Model):
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
    happi_order_id = models.CharField(max_length=50, null=True, blank=True)
    klarna_order_confirm = models.BooleanField(default=False)
    recipient_myself = models.BooleanField(default=True)
    recipient_name = models.CharField(max_length=50, null=True, blank=True)
    delivery_date = models.DateTimeField(auto_now_add=True)
    recipient_email_choice = models.BooleanField(default=False)
    recipient_email = models.EmailField(max_length=254, null=True, blank=True)
    recipient_sms_choice = models.BooleanField(default=False)
    recipient_number = models.CharField(max_length=20, null=True, blank=True)
    personal_message = models.TextField(null=False)
    personal_image = models.FileField(
        storage=HappicardImageStorage(), null=True, blank=True
    )
    personal_video = models.FileField(
        storage=HappicardVideoStorage(), null=True, blank=True
    )

    def __str__(self):
        return f"Happicard sent to {self.recipient_name} on {self.delivery_date}"


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
    happicard = models.ForeignKey(
        Happicard, on_delete=models.CASCADE, null=True, blank=True
    )
    order_total = models.DecimalField(
        max_digits=10, decimal_places=2, null=False, default=0
    )

    def __str__(self):
        return str(self.id)