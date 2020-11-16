from rest_framework import serializers
from rest_framework.exceptions import AuthenticationFailed
from rest_auth.serializers import LoginSerializer
from django.contrib import auth
from .models import CustomUser


class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = (
            "id",
            "first_name",
            "last_name",
            "email",
            "partner_type",
            "created_at",
            "updated_at",
        )


class CustomLoginSerializer(LoginSerializer):
    email = serializers.EmailField(max_length=255, min_length=3)
    password = serializers.CharField(max_length=68, min_length=6)
    username = serializers.CharField(max_length=255, min_length=3, read_only=True)
    tokens = serializers.CharField(max_length=68, min_length=6, read_only=True)

    class Meta:
        model = CustomUser
        fields = ("email", "password", "username", "tokens")

    def validate(self, attrs):
        email = attrs.get("email", "")
        password = attrs.get("password", "")

        user = auth.authenticate(email=email, password=password)
        if not user.is_active:
            raise AuthenticationFailed("Account disabled, contact admin")
        if not user.is_verified:
            raise AuthenticationFailed("Email is not verified")
        if not user:
            raise AuthenticationFailed("Invalid credentials, try again")

        return {"email": user.email, "username": user.username, "tokens": user.tokens}

        return super().validate(attrs)


class CustomRegisterSerializer(serializers.ModelSerializer):
    password2 = serializers.CharField(style={"input_type": "password"}, write_only=True)

    class Meta:
        model = CustomUser
        fields = ("username", "email", "password", "password2")
        extra_kwargs = {"password": {"write_only": True}}

    def save(self):
        account = CustomUser(
            email=self.validated_data["email"],
            username=self.validated_data["username"],
        )
        password = self.validated_data["password"]
        password2 = self.validated_data["password2"]

        if password != password2:
            raise serializers.ValidationError({"password": "Passwords must match"})
        account.set_password(password)
        account.save()
        return account


class EmailVerificationSerializer(serializers.ModelSerializer):
    token = serializers.EmailField(max_length=255, min_length=3)

    class Meta:
        model = CustomUser
        fields = ["token"]
