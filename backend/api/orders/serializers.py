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
            "happicard_recipient_myself",
            "happicard_recipient_name",
            "happicard_recipient_email_choice",
            "happicard_recipient_email",
            "happicard_recipient_sms_choice",
            "happicard_recipient_number",
            "happicard_personal_message",
            "happicard_delivery_date",
        )


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
            "happicard_recipient_myself",
            "happicard_recipient_name",
            "happicard_recipient_email_choice",
            "happicard_recipient_email",
            "happicard_recipient_sms_choice",
            "happicard_recipient_number",
            "happicard_personal_message",
            "happicard_delivery_date",
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


class HappicardSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = ("id",)


class PayoutSerializer(serializers.Serializer):
    order_id = serializers.UUIDField()
    destination = serializers.CharField()

    class Meta:
        fields = (
            "order_id",
            "destination",
        )


class TransferSerializer(serializers.Serializer):
    order_id = serializers.UUIDField()
    source = serializers.CharField()
    destination = serializers.CharField()

    class Meta:
        fields = (
            "order_id",
            "source",
            "destination",
        )


"""
{
  "items": [
    "eea58e2b-8b76-44f1-94e6-3d653a0048af"
  ],
  "first_name": "Drew",
  "last_name": "Perkins",
  "email": "drew@manivadigital.com",
  "phone_number": "+460720137236",
  "happicard_recipient_myself": true,
  "happicard_recipient_name": "Drew",
  "happicard_recipient_email_choice": true,
  "happicard_recipient_email": "drew@manivadigital.com",
  "happicard_recipient_sms_choice": true,
  "happicard_recipient_number": "+460720137236",
  "happicard_personal_message": "Hi!",
  "happicard_delivery_date": "2021-03-09T14:25:24.405Z"
}
"""