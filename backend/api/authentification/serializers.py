from rest_framework import serializers
from rest_framework.exceptions import AuthenticationFailed
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.exceptions import TokenError
from django.contrib import auth
from .models import Vendor, Customer, Subscriber


class NewsletterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subscriber
        fields = ("email",)


class VendorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vendor
        fields = (
            "id",
            "first_name",
            "last_name",
            "email",
            "password",
            "created_at",
            "updated_at",
        )


class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = (
            "id",
            "first_name",
            "last_name",
            "email",
            "password",
            "created_at",
            "updated_at",
        )


class VendorLoginSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(max_length=255, min_length=3)
    password = serializers.CharField(max_length=68, min_length=6, write_only=True)
    tokens = serializers.CharField(max_length=68, min_length=6, read_only=True)

    class Meta:
        model = Vendor
        fields = ("email", "password", "tokens")

    def validate(self, attrs):
        email = attrs.get("email", "")
        password = attrs.get("password", "")

        user = auth.authenticate(email=email, password=password)
        if not user:
            raise AuthenticationFailed("Invalid credentials, try again")
        if not user.is_active:
            raise AuthenticationFailed("Account disabled, contact admin")
        if not user.is_verified:
            raise AuthenticationFailed("Email is not verified")

        return {"email": user.email, "tokens": user.tokens}

        return super().validate(attrs)


class CustomerLoginSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(max_length=255, min_length=3)
    password = serializers.CharField(max_length=68, min_length=6, write_only=True)
    tokens = serializers.CharField(max_length=68, min_length=6, read_only=True)

    class Meta:
        model = Customer
        fields = ("email", "password", "tokens")

    def validate(self, attrs):
        email = attrs.get("email", "")
        password = attrs.get("password", "")

        user = auth.authenticate(email=email, password=password)
        if not user:
            raise AuthenticationFailed("Invalid credentials, try again")
        if not user.is_active:
            raise AuthenticationFailed("Account disabled, contact admin")
        if not user.is_verified:
            raise AuthenticationFailed("Email is not verified")

        return {"email": user.email, "tokens": user.tokens}

        return super().validate(attrs)


class VendorRegisterSerializer(serializers.ModelSerializer):
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

    def validate(self, attrs):
        email = attrs.get("email", "")
        password = attrs.get("password", "")
        return attrs

    def create(self, validated_data):
        return Vendor.objects.create_user(**validated_data)


class CustomerRegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(max_length=68, min_length=6, write_only=True)

    class Meta:

        model = Customer
        fields = ("first_name", "last_name", "email", "password")

    def validate(self, attrs):
        email = attrs.get("email", "")
        return attrs

    def create(self, validated_data):
        return Customer.objects.create_user(**validated_data)


class VendorVerificationSerializer(serializers.ModelSerializer):
    choices = (("Yes", "Yes"), ("No", "No"))
    decision = serializers.ChoiceField(choices=choices)

    class Meta:
        model = Vendor
        fields = ("email", "decision")


class CustomerEmailVerificationSerializer(serializers.ModelSerializer):
    token = serializers.CharField(max_length=555)

    class Meta:
        model = Customer
        fields = ("token",)


class UserLogoutSerializer(serializers.Serializer):
    refresh = serializers.CharField()

    default_error_message = {"bad_token": ("Token is expired or invalid")}

    def validate(self, attrs):
        self.token = attrs["refresh"]
        return attrs

    def save(self, **kwargs):

        try:
            RefreshToken(self.token).blacklist()

        except TokenError:
            self.fail("bad_token")


class ContactSerializer(serializers.Serializer):
    name = serializers.CharField()
    email = serializers.EmailField()
    subject = serializers.CharField()
    message = serializers.CharField()
