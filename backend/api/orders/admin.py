from django.contrib import admin

from .models import Order, OrderItem


class OrderAdmin(admin.ModelAdmin):

    readonly_fields = (
        "id",
        "date",
    )

    fields = (
        "id",
        "user",
        "items",
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
    )

    list_display = (
        "id",
        "user",
        "date",
        "first_name",
        "last_name",
    )

    ordering = ("-date",)


admin.site.register(Order, OrderAdmin)
admin.site.register(OrderItem)