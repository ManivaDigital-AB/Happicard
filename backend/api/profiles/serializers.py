from rest_framework import serializers

from .models import Profile


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = (
            "name",
            "image",
            "slug",
            "about",
            "partner_category",
            "brand_category",
        )
