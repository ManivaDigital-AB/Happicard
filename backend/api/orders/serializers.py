from django_countries.serializer_fields import CountryField
from rest_framework import serializers

from .models import Order, OrderGiftCard, OrderCampaign, Happicard
from backend.api.items.models import GiftCard, Campaign


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


class StripeOrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = (
            "id",
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
            "price_choice",
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
            "price_choice",
            "quantity",
        )

    def get_campaign(self, obj):
        return OrderCampaignSerializer(obj.campaign).data


class HappicardSerializer(serializers.ModelSerializer):
    class Meta:
        model = Happicard
        fields = (
            "happi_order_id",
            "klarna_order_confirm",
            "recipient_myself",
            "recipient_name",
            "recipient_email_choice",
            "recipient_email",
            "recipient_sms_choice",
            "recipient_number",
            "personal_message",
            "personal_image",
        )


class StripeTransferSerializer(serializers.Serializer):
    charge_id = serializers.CharField()
    destination = serializers.CharField()

    class Meta:
        model = Happicard
        fields = (
            "charge_id",
            "destination",
        )
