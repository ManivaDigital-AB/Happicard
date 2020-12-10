from rest_framework import serializers

from .models import GiftCard, Campaign


class GiftCardSerializer(serializers.ModelSerializer):
    class Meta:
        model = GiftCard
        fields = (
            "id",
            "title",
            "price",
            "image",
            "description",
            "has_offer",
            "discount_price",
        )


class CampaignSerializer(serializers.ModelSerializer):
    class Meta:
        model = Campaign
        fields = (
            "id",
            "title",
            "price",
            "image",
            "description",
        )
