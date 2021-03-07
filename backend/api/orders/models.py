from django_countries.fields import CountryField
from django.conf import settings
from django.db import models
from django.utils import timezone
from django.conf import settings
from django.db.models import signals
import uuid

from django.utils.translation import gettext_lazy as _

from backend.api.items.models import GiftCard, Campaign

from backend.settings.storage_backends import (
    HappicardImageStorage,
    HappicardVideoStorage,
)

from backend.tasks import send_happicard_email_task, outbound_mms_task


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

    @property
    def get_total_item_price(self):
        return self.quantity * self.item.price

    @property
    def match_price_choice_with_rebate(self):
        if self.giftcard:
            if self.price_choice == self.giftcard.price_option_1:
                return self.giftcard.rebate_code_1
            elif self.price_choice == self.giftcard.price_option_2:
                return self.giftcard.rebate_code_2
            else:
                return self.giftcard.rebate_code_3
        else:
            if self.price_choice == self.campaign.price_option_1:
                return self.campaign.rebate_code_1
            elif self.price_choice == self.campaign.price_option_2:
                return self.campaign.rebate_code_2
            else:
                return self.campaign.rebate_code_3

    @property
    def get_redeem_website(self):
        if self.giftcard:
            return self.giftcard.redeem_website
        else:
            return self.campaign.redeem_website


class Order(models.Model):
    """
    Order Model
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
    happicard_delivery_date = models.DateTimeField(
        auto_now_add=False, null=True, blank=True
    )
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

    @property
    def get_order_total(self):
        total_amount = 0
        for item in self.items.all():
            total_amount += item.price_choice
        return total_amount * 100

    def delivery_date_post_save(instance, *args, **kwargs):
        send_happicard_email_task.apply_async(
            (instance,), eta=instance.happicard_delivery_date
        )
        outbound_mms_task.apply_async((instance,), eta=instance.happicard_delivery_date)