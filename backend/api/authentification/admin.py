from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from .forms import UserCreationForm, UserChangeForm
from .models import User, Vendor, Customer


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
    )
    list_filter = (
        "first_name",
        "last_name",
        "email",
        "created_at",
        "updated_at",
        "is_active",
    )
    fieldsets = (
        (
            None,
            {"fields": ("email", "password")},
        ),
        ("Personal information", {"fields": ("first_name", "last_name")}),
        ("Permissions", {"fields": ("is_active",)}),
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


admin.site.register(User, UserAdmin)
admin.site.register(Customer)
admin.site.register(Vendor)