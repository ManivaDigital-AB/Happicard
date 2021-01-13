from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.contrib.auth.models import Group

from .forms import (
    UserCreationForm,
    UserChangeForm,
    VendorCreationForm,
    VendorChangeForm,
)
from .models import User, Vendor, Customer, Subscriber


class UserAdmin(UserAdmin):
    class Meta:
        add_form = UserCreationForm
        form = UserChangeForm
        model = User

    list_display = (
        "first_name",
        "last_name",
        "email",
        "created_at",
        "updated_at",
        "is_active",
        "is_staff",
        "is_verified",
    )
    list_filter = (
        "first_name",
        "last_name",
        "email",
        "created_at",
        "updated_at",
        "is_active",
        "is_staff",
        "is_verified",
    )
    fieldsets = (
        (
            None,
            {"fields": ("email", "password")},
        ),
        ("Personal information", {"fields": ("first_name", "last_name")}),
        ("Permissions", {"fields": ("is_active", "is_staff", "is_verified")}),
    )
    add_fieldsets = (
        (
            None,
            {
                "classes": ("wide",),
                "fields": (
                    "email",
                    "first_name",
                    "last_name",
                    "password",
                    "is_active",
                    "is_staff",
                    "is_verified",
                ),
            },
        ),
    )
    search_fields = (
        "first_name",
        "last_name",
        "email",
        "created_at",
        "updated_at",
    )
    ordering = (
        "first_name",
        "last_name",
        "email",
        "created_at",
        "updated_at",
    )


class CustomerAdmin(UserAdmin):
    class Meta:
        add_form = UserCreationForm
        form = UserChangeForm
        model = Customer

    list_display = (
        "first_name",
        "last_name",
        "email",
        "created_at",
        "updated_at",
        "is_active",
        "is_verified",
    )
    list_filter = (
        "first_name",
        "last_name",
        "email",
        "created_at",
        "updated_at",
        "is_active",
        "is_verified",
    )
    fieldsets = (
        (
            None,
            {"fields": ("email", "password")},
        ),
        ("Personal information", {"fields": ("first_name", "last_name")}),
        ("Permissions", {"fields": ("is_active", "is_verified")}),
    )
    add_fieldsets = (
        (
            None,
            {
                "classes": ("wide",),
                "fields": (
                    "email",
                    "first_name",
                    "last_name",
                    "password",
                    "is_active",
                    "is_verified",
                ),
            },
        ),
    )
    search_fields = (
        "first_name",
        "last_name",
        "email",
        "created_at",
        "updated_at",
    )
    ordering = (
        "first_name",
        "last_name",
        "email",
        "created_at",
        "updated_at",
    )


class VendorAdmin(UserAdmin):
    class Meta:
        add_form = VendorCreationForm
        form = VendorChangeForm
        model = Vendor

    list_display = (
        "first_name",
        "last_name",
        "last_login",
        "email",
        "phone_number",
        "city",
        "region",
        "business_address",
        "zipcode",
        "website",
        "created_at",
        "updated_at",
        "is_active",
        "is_verified",
    )
    list_filter = (
        "first_name",
        "last_name",
        "last_login",
        "email",
        "phone_number",
        "city",
        "region",
        "business_address",
        "zipcode",
        "website",
        "created_at",
        "updated_at",
        "is_active",
        "is_verified",
    )
    fieldsets = (
        (
            None,
            {
                "fields": (
                    "email",
                    "password",
                    "last_login",
                )
            },
        ),
        ("Personal information", {"fields": ("first_name", "last_name")}),
        ("Permissions", {"fields": ("is_active", "is_verified")}),
    )
    add_fieldsets = (
        (
            None,
            {
                "classes": ("wide",),
                "fields": (
                    "email",
                    "phone_number",
                    "city",
                    "region",
                    "business_address",
                    "zipcode",
                    "website",
                    "first_name",
                    "last_name",
                    "password",
                    "is_active",
                    "is_verified",
                ),
            },
        ),
    )
    search_fields = (
        "first_name",
        "last_name",
        "last_login",
        "email",
        "phone_number",
        "city",
        "region",
        "business_address",
        "zipcode",
        "website",
        "created_at",
        "updated_at",
    )
    ordering = (
        "first_name",
        "last_name",
        "last_login",
        "email",
        "phone_number",
        "city",
        "region",
        "business_address",
        "zipcode",
        "website",
        "created_at",
        "updated_at",
    )


admin.site.register(Customer)
admin.site.register(Vendor)
admin.site.register(Subscriber)

admin.site.site_header = "Happicard Admin"
admin.site.site_title = "Happicard Admin"
admin.site.site_url = "https://happicard.se/"
admin.site.index_title = "Manage Happicard"
admin.empty_value_display = "**Empty**"

admin.site.unregister(Group)