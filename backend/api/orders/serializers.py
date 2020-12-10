from django_countries.serializer_fields import CountryField
from rest_framework import serializers

from .models import Order, OrderGiftCard, OrderCampaign
from backend.api.products.models import GiftCard, Campaign


class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = (
            "id",
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
        fields = ("id",)


class OrderGiftCardSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderGiftCard
        fields = (
            "id",
            "ordered",
            "giftcard",
            "quantity",
        )

    def get_giftcard(self, obj):
        return OrderGiftCardSerializer(obj.giftcard).data


class OrderCampaignSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderCampaign
        fields = (
            "id",
            "ordered",
            "campaign",
            "quantity",
        )

    def get_campaign(self, obj):
        return OrderCampaignSerializer(obj.campaign).data
