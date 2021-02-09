from rest_framework import serializers

from .models import Store, NGO


class StoreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Store
        fields = (
            "id",
            "title",
            "image",
            "about",
            "store_category",
            "giftcards",
        )


class NGOSerializer(serializers.ModelSerializer):
    class Meta:
        model = NGO
        fields = (
            "id",
            "title",
            "image",
            "about",
            "ngo_category",
            "campaigns",
        )
