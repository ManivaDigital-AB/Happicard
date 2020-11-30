from django_countries.serializer_fields import CountryField
from rest_framework import serializers

from .models import Order, Cart


class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = ("order_id",)


class CheckoutSerializer(serializers.Serializer):
    purchase_country = serializers.CharField()
    purchase_currency = serializers.CharField()
    locale = serializers.CharField()
    order_amount = serializers.IntegerField()
    order_tax_amount = serializers.IntegerField()
    order_lines = serializers.ListField()


class CartSerializer(serializers.ModelSerializer):
    created_by = serializers.CurrentUserDefault()

    class Meta:
        model = Cart
        fields = (
            "created_by",
            "order_items",
            "subtotal",
            "tax_percentage",
            "tax_total",
            "total",
        )
