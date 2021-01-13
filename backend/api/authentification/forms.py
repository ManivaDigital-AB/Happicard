from django import forms
from django.contrib.auth.forms import UserCreationForm, UserChangeForm
from django.contrib.auth.models import update_last_login

from .models import User, Vendor


class UserCreationForm(UserCreationForm):
    class Meta(UserCreationForm):
        model = User
        fields = ("first_name", "last_name", "email", "password")


class UserChangeForm(UserChangeForm):
    class Meta:
        model = User
        fields = ("first_name", "last_name", "email", "password")


class VendorCreationForm(UserCreationForm):
    class Meta(UserCreationForm):
        model = Vendor
        fields = (
            "first_name",
            "last_name",
            "email",
            "password",
            "phone_number",
            "business_address",
            "city",
            "region",
            "zipcode",
            "website",
        )


class VendorChangeForm(UserChangeForm):
    class Meta:
        model = Vendor
        fields = (
            "first_name",
            "last_name",
            "email",
            "password",
            "phone_number",
            "business_address",
            "city",
            "region",
            "zipcode",
            "website",
        )
