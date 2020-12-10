from django.contrib import admin

from .models import Order, OrderGiftCard, OrderCampaign


class OrderAdmin(admin.ModelAdmin):

    readonly_fields = (
        "id",
        "date",
        "order_total",
        "status",
    )

    fields = (
        "id",
        "user",
        "giftcards",
        "campaigns",
        "date",
        "first_name",
        "last_name",
        "email",
        "phone_number",
        "country",
        "postcode",
        "town_or_city",
        "region",
        "street_address1",
        "street_address2",
        "order_total",
        "status",
    )

    list_display = (
        "id",
        "user",
        "date",
        "first_name",
        "last_name",
        "order_total",
        "status",
    )

    ordering = ("-date",)


admin.site.register(Order, OrderAdmin)
admin.site.register(OrderGiftCard)
admin.site.register(OrderCampaign)