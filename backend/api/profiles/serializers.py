from rest_framework import serializers

from .models import Store, NGO


class StoreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Store
        fields = (
            "id",
            "title",
            "banner_image",
            "header_image",
            "about",
            "giftcards",
            "store_category",
            "created_at",
        )


class NGOSerializer(serializers.ModelSerializer):
    class Meta:
        model = NGO
        fields = (
            "id",
            "title",
            "banner_image",
            "header_image",
            "about",
            "campaigns",
            "ngo_category",
            "created_at",
        )
