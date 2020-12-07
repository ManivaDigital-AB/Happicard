from django.contrib import admin

from .models import Order, OrderProduct


class OrderAdmin(admin.ModelAdmin):

    readonly_fields = (
        "order_id",
        "date",
        "order_total",
        "status",
    )

    fields = (
        "user",
        "order_id",
        "products",
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
        "status",
    )

    list_display = (
        "user",
        "order_id",
        "date",
        "first_name",
        "last_name",
        "order_total",
        "status",
    )

    ordering = ("-date",)


admin.site.register(Order, OrderAdmin)
admin.site.register(OrderProduct)