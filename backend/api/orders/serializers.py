from django_countries.serializer_fields import CountryField
from rest_framework import serializers

from .models import Order, OrderProduct
from backend.api.products.models import GiftCard, Campaign


class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = ("order_id",)


class OrderProductSerializer(serializers.ModelSerializer):
    product = serializers.SerializerMethodField()
    final_price = serializers.SerializerMethodField()

    class Meta:
        model = OrderProduct
        fields = ("id", "product", "quantity", "final_price")