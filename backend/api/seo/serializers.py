from rest_framework import serializers
from .models import SEO


class SEOSerializer(serializers.ModelSerializer):
    class Meta:
        model = SEO
        fields = (
            "title",
            "keywords",
            "description",
            "heading",
            "subheading",
            "extra",
        )