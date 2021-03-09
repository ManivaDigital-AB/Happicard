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
        "happicard_recipient_myself",
        "happicard_recipient_name",
        "happicard_recipient_email_choice",
        "happicard_recipient_email",
        "happicard_recipient_sms_choice",
        "happicard_recipient_number",
        "happicard_personal_message",
        "happicard_delivery_date",
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