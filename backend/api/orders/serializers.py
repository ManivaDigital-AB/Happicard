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
