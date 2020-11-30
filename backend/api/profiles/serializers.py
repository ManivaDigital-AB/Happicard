from rest_framework import serializers

from .models import Store, NGO


class StoreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Store
        fields = ("title", "image", "about", "store_category")


class NGOSerializer(serializers.ModelSerializer):
    class Meta:
        model = NGO
        fields = ("title", "image", "about", "ngo_category")
