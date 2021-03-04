from django_countries.fields import CountryField
from django.conf import settings
from django.db import models
from django.utils import timezone
from django.conf import settings
import uuid

from django.utils.translation import gettext_lazy as _

from backend.api.items.models import GiftCard, Campaign

from backend.settings.storage_backends import (
    HappicardImageStorage,
    HappicardVideoStorage,
)


class UserProfile(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    stripe_customer_id = models.CharField(max_length=50, blank=True, null=True)

    def __str__(self):
        return self.user.first_name


class OrderItem(models.Model):
    """
    Order Item Model
    """

    class Meta:
        verbose_name = _("Item in Basket")
        verbose_name_plural = _("Items in Basket")

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
    giftcard = models.ForeignKey(
        GiftCard,
        on_delete=models.CASCADE,
        blank=True,
        null=True,
    )
    campaign = models.ForeignKey(
        Campaign,
        on_delete=models.CASCADE,
        blank=True,
        null=True,
    )

    def get_total_item_price(self):
        return self.quantity * self.item.price

    def get_title_and_img(self):
        if giftcard:
            return self.giftcard.title and self.giftcard.image
        else:
            return self.campaign.title and self.campaign.image

    @property
    def match_price_choice_with_rebate(self):
        if self.price_choice == self.item.price_option_1:
            return self.item.rebate_code_1
        elif self.price_choice == self.item.price_option_2:
            return self.item.rebate_code_2
        else:
            return self.item.rebate_code_3


class Order(models.Model):
    """
    Order Model - Requirements for Klarna Checkouts API
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
    items = models.ManyToManyField(OrderItem, blank=True)
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

    happicard_recipient_myself = models.BooleanField(default=True)
    happicard_recipient_name = models.CharField(max_length=50, null=True, blank=True)
    happicard_delivery_date = models.DateTimeField(auto_now_add=True, null=True)
    happicard_recipient_email_choice = models.BooleanField(default=False)
    happicard_recipient_email = models.EmailField(max_length=254, null=True, blank=True)
    happicard_recipient_sms_choice = models.BooleanField(default=False)
    happicard_recipient_number = models.CharField(max_length=20, null=True, blank=True)
    happicard_personal_message = models.TextField(null=True, blank=True)
    happicard_personal_image = models.FileField(
        storage=HappicardImageStorage(), null=True, blank=True
    )
    happicard_personal_video = models.FileField(
        storage=HappicardVideoStorage(), null=True, blank=True
    )

    def __str__(self):
        return str(self.id)

    def payout_percentage(self, percent, whole):
        return (percent * whole) / 100.0
