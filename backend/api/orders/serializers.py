from django_countries.serializer_fields import CountryField
from rest_framework import serializers

from .models import Order, OrderItem, Item, Address, Payment


class StringSerializer(serializers.StringRelatedField):
    def to_internal_value(self, value):
        return value


class ItemSerializer(serializers.ModelSerializer):
    category = serializers.SerializerMethodField()

    class Meta:
        model = Item
        fields = ("id", "title", "price", "category", "slug", "description", "image")

    def get_category(self, obj):
        return obj.get_category_display()


class OrderItemSerializer(serializers.ModelSerializer):
    item = serializers.SerializerMethodField()

    class Meta:
        model = OrderItem
        fields = (
            "id",
            "item",
            "quantity",
        )

    def get_item(self, obj):
        return ItemSerializer(obj.item).data


class OrderSerializer(serializers.ModelSerializer):
    order_items = serializers.SerializerMethodField()
    total = serializers.SerializerMethodField()

    class Meta:
        model = Order
        fields = (
            "id",
            "order_items",
            "total",
        )

    def get_order_items(self, obj):
        return OrderItemSerializer(obj.items.all(), many=True).data

    def get_total(self, obj):
        return obj.get_total()


class AddressSerializer(serializers.ModelSerializer):
    country = CountryField()

    class Meta:
        model = Address
        fields = (
            "id",
            "user",
            "street_address",
            "apartment_address",
            "country",
            "zip",
            "address_type",
            "default",
        )


class PaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payment
        fields = ("id", "amount", "timestamp")
