from rest_framework import serializers
from .models import Promo


class PromoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Promo
        fields = (
            "id",
            "title",
            "description",
            "promo_image_1",
            "promo_image_2",
            "promo_image_3",
            "promo_image_4",
            "promo_image_5",
            "promo_image_6",
            "promo_image_7",
            "promo_image_8",
            "promo_image_9",
            "promo_image_10",
        )