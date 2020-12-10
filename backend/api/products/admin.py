from django.contrib import admin

from .models import GiftCard, Campaign


class GiftCardAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "title",
        "price",
        "image",
        "has_offer",
    )


class CampaignAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "title",
        "price",
        "image",
    )


admin.site.register(GiftCard, GiftCardAdmin)
admin.site.register(Campaign, CampaignAdmin)