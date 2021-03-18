from rest_framework import serializers
from .models import GiftCard, Campaign


class GiftCardSerializer(serializers.ModelSerializer):
    class Meta:
        model = GiftCard
        fields = (
            "id",
            "title",
            "price_option_1",
            "price_option_2",
            "price_option_3",
            "rebate_code_1",
            "rebate_code_2",
            "rebate_code_3",
            "image",
            "description",
            "has_offer",
            "discount_price",
            "store_category",
            "created_at",
        )


class CampaignSerializer(serializers.ModelSerializer):
    class Meta:
        model = Campaign
        fields = (
            "id",
            "title",
            "price_option_1",
            "price_option_2",
            "price_option_3",
            "rebate_code_1",
            "rebate_code_2",
            "rebate_code_3",
            "image",
            "description",
            "ngo_category",
            "created_at",
        )
