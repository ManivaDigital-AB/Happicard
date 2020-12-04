from django import forms
from django.contrib.auth.forms import UserCreationForm, UserChangeForm

from .models import User, Vendor


class UserCreationForm(UserCreationForm):
    class Meta(UserCreationForm):
        model = User
        fields = ("first_name", "last_name", "email")


class UserChangeForm(UserChangeForm):
    class Meta:
        model = User
        fields = ("first_name", "last_name", "email")


class VendorForm(forms.Form):
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
