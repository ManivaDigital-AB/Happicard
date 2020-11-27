from django.contrib import admin

from .models import Order


class OrderAdmin(admin.ModelAdmin):

    readonly_fields = ("order_id", "date", "order_total", "klarna_line_items", "status")

    fields = (
        "order_id",
        "date",
        "first_name",
        "last_name",
        "email",
        "phone_number",
        "country",
        "postcode",
        "town_or_city",
        "street_address1",
        "order_total",
        "klarna_line_items",
        "status",
    )

    list_display = (
        "order_id",
        "date",
        "first_name",
        "last_name",
        "order_total",
        "status",
    )

    ordering = ("-date",)


admin.site.register(Order, OrderAdmin)