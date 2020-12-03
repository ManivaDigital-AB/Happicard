from django_countries.serializer_fields import CountryField
from rest_framework import serializers

from .models import Order, OrderProduct
from backend.api.products.models import GiftCard, Campaign


class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = ("order_id",)


class OrderProductSerializer(serializers.ModelSerializer):
    item = serializers.SerializerMethodField()
    final_price = serializers.SerializerMethodField()

    class Meta:
        model = OrderProduct
        fields = ("id", "item", "quantity", "final_price")


class CheckoutSerializer(serializers.Serializer):
    product_type = serializers.ChoiceField(choices=[GiftCard, Campaign])
    purchase_country = serializers.CharField(default="SE")
    purchase_currency = serializers.CharField(default="SEK")
    locale = serializers.CharField(default="se-sv")
