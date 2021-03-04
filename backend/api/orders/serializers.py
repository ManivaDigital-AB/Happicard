from django_countries.serializer_fields import CountryField
from rest_framework import serializers

from .models import Order, OrderItem
from backend.api.items.models import GiftCard, Campaign


class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = (
            "id",
            "items",
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
            "happicard_recipient_myself",
            "happicard_recipient_name",
            "happicard_recipient_email_choice",
            "happicard_recipient_email",
            "happicard_recipient_sms_choice",
            "happicard_recipient_number",
            "happicard_personal_message",
            "happicard_personal_image",
        )
        depth = 2


class OrderListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = (
            "id",
            "items",
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
            "happicard_recipient_myself",
            "happicard_recipient_name",
            "happicard_recipient_email_choice",
            "happicard_recipient_email",
            "happicard_recipient_sms_choice",
            "happicard_recipient_number",
            "happicard_personal_message",
            "happicard_personal_image",
        )
        depth = 2


class OrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItem
        fields = (
            "id",
            "ordered",
            "campaign",
            "giftcard",
            "price_choice",
            "quantity",
        )


class OrderItemListSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItem
        fields = (
            "id",
            "ordered",
            "campaign",
            "giftcard",
            "price_choice",
            "quantity",
        )
        depth = 2


class StripeChargeSerializer(serializers.Serializer):
    class Meta:
        model = Order
        fields = (
            "amount",
            "source",
        )


class StripeTransferSerializer(serializers.Serializer):
    charge_id = serializers.CharField()
    destination = serializers.CharField()

    class Meta:
        fields = (
            "charge_id",
            "destination",
        )
