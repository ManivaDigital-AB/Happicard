from django.contrib import admin

from .models import GiftCard, Campaign


class GiftCardAdmin(admin.ModelAdmin):
    def get_queryset(self, request):
        qs = super().get_queryset(request)
        if request.user.is_superuser:
            return qs
        return qs.filter(author=request.user)

    list_display = (
        "id",
        "title",
        "price_option_1",
        "price_option_2",
        "price_option_3",
        "rebate_code_1",
        "rebate_code_2",
        "rebate_code_3",
        "image",
        "has_offer",
    )


class CampaignAdmin(admin.ModelAdmin):
    def get_queryset(self, request):
        qs = super().get_queryset(request)
        if request.user.is_superuser:
            return qs
        return qs.filter(author=request.user)

    list_display = (
        "id",
        "title",
        "price_option_1",
        "price_option_2",
        "price_option_3",
        "rebate_code_1",
        "rebate_code_2",
        "rebate_code_3",
        "image",
    )


admin.site.register(GiftCard, GiftCardAdmin)
admin.site.register(Campaign, CampaignAdmin)