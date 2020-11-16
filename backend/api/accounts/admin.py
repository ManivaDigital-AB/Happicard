from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from .forms import CustomUserCreationForm, CustomUserChangeForm
from .models import CustomUser


class CustomUserAdmin(UserAdmin):
    add_form = CustomUserCreationForm
    form = CustomUserChangeForm
    model = CustomUser
    list_display = (
        "first_name",
        "last_name",
        "email",
        "partner_type",
        "created_at",
        "updated_at",
        "is_staff",
        "is_active",
    )
    list_filter = (
        "first_name",
        "last_name",
        "email",
        "partner_type",
        "created_at",
        "updated_at",
        "is_staff",
        "is_active",
    )
    fieldsets = (
        (
            None,
            {"fields": ("email", "password", "partner_type")},
        ),
        ("Personal information", {"fields": ("first_name", "last_name")}),
        ("Permissions", {"fields": ("is_staff", "is_active")}),
    )
    add_fieldsets = (
        (
            None,
            {
                "classes": ("wide",),
                "fields": (
                    "email",
                    "password1",
                    "password2",
                    "partner_type",
                    "is_staff",
                    "is_active",
                ),
            },
        ),
    )
    search_fields = (
        "first_name",
        "last_name",
        "email",
        "partner_type",
        "created_at",
        "updated_at",
    )
    ordering = (
        "first_name",
        "last_name",
        "email",
        "partner_type",
        "created_at",
        "updated_at",
    )


admin.site.register(CustomUser, CustomUserAdmin)