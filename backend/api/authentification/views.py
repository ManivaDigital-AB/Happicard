from decouple import config
from django.shortcuts import render
from django.conf import settings
from django.urls import reverse
from django.shortcuts import redirect
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.utils.http import urlsafe_base64_decode, urlsafe_base64_encode
from django.http import HttpResponsePermanentRedirect
from django.contrib.sites.shortcuts import get_current_site
from django.utils.encoding import (
    smart_str,
    force_str,
    smart_bytes,
    DjangoUnicodeDecodeError,
)
from rest_framework import permissions, status
from rest_framework import generics
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import views
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
import jwt

from .serializers import (
    CustomUserSerializer,
    CustomRegisterSerializer,
    CustomLoginSerializer,
    CustomLogoutSerializer,
    EmailVerificationSerializer,
    SetNewPasswordSerializer,
    ResetPasswordEmailRequestSerializer,
)
from .models import CustomUser
from .renderers import CustomUserRenderer
from .utils import Util


class CustomRedirect(HttpResponsePermanentRedirect):
    allowed_schemes = [config("APP_SCHEME"), "http", "https"]


class UserList(generics.ListAPIView):
    permission_classes = (permissions.AllowAny,)
    authentication_classes = ()
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer


class UserDetail(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = (permissions.AllowAny,)
    authentication_classes = ()
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer


class UserLogin(generics.GenericAPIView):
    serializer_class = CustomLoginSerializer

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class UserRegistration(generics.GenericAPIView):
    serializer_class = CustomRegisterSerializer
    enderer_classes = (CustomUserRenderer,)

    def post(self, request):
        user = request.data
        serializer = self.serializer_class(data=user)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        user_data = serializer.data
        user = CustomUser.objects.get(email=user_data["email"])
        token = RefreshToken.for_user(user).access_token
        current_site = get_current_site(request).domain
        relative_link = "/api/auth/email-verify/"
        absurl = "http://" + current_site + relative_link + "?token=" + str(token)
        email_body = (
            "Hej "
            + user.first_name
            + "!\n\nAnvänd länken nedan för att bekräfta din email:\n"
            + absurl
        )
        data = {
            "email_body": email_body,
            "to_email": user.email,
            "email_subject": "Bekräfta din email",
        }

        Util.send_email(data)

        return Response(user_data, status=status.HTTP_201_CREATED)


class VerifyEmail(views.APIView):
    serializer_class = EmailVerificationSerializer

    token_param_config = openapi.Parameter(
        "token",
        in_=openapi.IN_QUERY,
        description="Description",
        type=openapi.TYPE_STRING,
    )

    @swagger_auto_schema(manual_parameters=[token_param_config])
    def get(self, request):
        token = request.GET.get("token")
        try:
            payload = jwt.decode(token, settings.SECRET_KEY)
            user = CustomUser.objects.get(id=payload["user_id"])
            if not user.is_verified:
                user.is_verified = True
                user.save()
            return Response(
                {"Email": "Successfully Activated"}, status=status.HTTP_200_OK
            )
        except jwt.ExpiredSignatureError as identifier:
            return Response(
                {"Error": "Activation Expired"}, status=status.HTTP_400_BAD_REQUEST
            )
        except jwt.exceptions.DecodeError as identifier:
            return Response(
                {"Error": "Invalid Token"}, status=status.HTTP_400_BAD_REQUEST
            )


class UserLogout(views.APIView):
    serializer_class = CustomLogoutSerializer
    permission_classes = (permissions.AllowAny,)

    def post(self, request):

        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(status=status.HTTP_204_NO_CONTENT)


class RequestPasswordResetEmail(generics.GenericAPIView):
    serializer_class = ResetPasswordEmailRequestSerializer

    def post(self, request):
        serializer = self.serializer_class(data=request.data)

        email = request.data.get("email", "")

        if CustomUser.objects.filter(email=email).exists():
            user = CustomUser.objects.get(email=email)
            uidb64 = urlsafe_base64_encode(smart_bytes(user.id))
            token = PasswordResetTokenGenerator().make_token(user)
            current_site = get_current_site(request=request).domain
            relative_link = "/api/auth/password-reset/" + str(uidb64) + "/" + str(token)
            absurl = "http://" + current_site + relative_link
            email_body = (
                "Hej "
                + user.first_name
                + ",\n\nAnvänd länken nedan för att återställa ditt lösenord:\n"
                + absurl
            )
            data = {
                "email_body": email_body,
                "to_email": user.email,
                "email_subject": "Återställa ditt lösenord",
            }
            Util.send_email(data)
        return Response(
            {"Success": "We have sent you a link to reset your password."},
            status=status.HTTP_200_OK,
        )


class SetNewPassword(generics.GenericAPIView):
    serializer_class = SetNewPasswordSerializer

    def patch(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        return Response(
            {"success": True, "Message": "Password Reset Success."},
            status=status.HTTP_200_OK,
        )


class PasswordTokenCheck(generics.GenericAPIView):
    serializer_class = SetNewPasswordSerializer

    def get(self, request, uidb64, token):
        try:
            id = smart_str(urlsafe_base64_decode(uidb64))
            user = CustomUser.objects.get(id=id)

            if not PasswordResetTokenGenerator().check_token(user, token):
                return Response(
                    {"Error": "Token is not acceptable. Try again."},
                    status=status.HTTP_400_BAD_REQUEST,
                )

            return Response(
                {
                    "Success": True,
                    "Message": "Valid Credentials",
                    "uidb64": uidb64,
                    "Token": token,
                },
                status=status.HTTP_200_OK,
            )

        except DjangoUnicodeDecodeError as identifier:
            if not PasswordResetTokenGenerator().check_token(user):
                return Response(
                    {"Error": "Token is not acceptable"},
                    status=status.HTTP_400_BAD_REQUEST,
                )
