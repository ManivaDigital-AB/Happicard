from django_countries.serializer_fields import CountryField
from rest_framework import serializers

from .models import Order, OrderGiftCard, OrderCampaign
from backend.api.products.models import GiftCard, Campaign


class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = (
            "campaigns",
            "giftcards",
            "first_name",
            "last_name",
            "email",
            "phone_number",
            "country",
            "region",
            "postcode",
            "town_or_city",
            "street_address1",
            "street_address2",
        )


class CheckoutSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = ("order_id",)


class OrderGiftCardSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderGiftCard
        fields = (
            "ordered",
            "giftcard",
            "quantity",
        )


class OrderCampaignSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderCampaign
        fields = (
            "ordered",
            "campaign",
            "quantity",
        )
