from decouple import config
from django.shortcuts import render
from django.conf import settings
from django.urls import reverse
from django.shortcuts import redirect
from rest_framework import permissions, status
from rest_framework import generics
from rest_framework.response import Response
from django.contrib.sites.shortcuts import get_current_site
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import views
from django.core.mail import send_mail
from django.dispatch import receiver
from django.template.loader import render_to_string
from django.urls import reverse
from django_rest_passwordreset.signals import reset_password_token_created
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
import jwt

from .serializers import (
    CustomUserSerializer,
    CustomRegisterSerializer,
    CustomLoginSerializer,
    CustomLogoutSerializer,
    EmailVerificationSerializer,
)
from .models import User
from .renderers import CustomUserRenderer
from .utils import Util


class UserList(generics.ListAPIView):
    permission_classes = (permissions.AllowAny,)
    authentication_classes = ()
    queryset = User.objects.all()
    serializer_class = CustomUserSerializer


class UserDetail(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = (permissions.AllowAny,)
    authentication_classes = ()
    queryset = User.objects.all()
    serializer_class = CustomUserSerializer


class UserRegistration(generics.GenericAPIView):
    serializer_class = CustomRegisterSerializer
    renderer_classes = (CustomUserRenderer,)

    def post(self, request):
        user = request.data
        serializer = self.serializer_class(data=user)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        user_data = serializer.data
        user = User.objects.get(email=user_data["email"])
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
            user = User.objects.get(id=payload["user_id"])
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


class UserLogin(generics.GenericAPIView):
    serializer_class = CustomLoginSerializer

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class UserLogout(views.APIView):
    serializer_class = CustomLogoutSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(status=status.HTTP_204_NO_CONTENT)


@receiver(reset_password_token_created)
def password_reset_token_created(
    sender, instance, reset_password_token, *args, **kwargs
):
    relative_link = "/api/auth/password-reset/reset-password-confirm"
    absurl = "{}?token={}".format(
        instance.request.build_absolute_uri(relative_link),
        reset_password_token.key,
    )
    email_body = (
        "Hej!\n\nAnvänd länken nedan för att återställa ditt lösenord:\n{}".format(
            absurl
        )
    )
    data = {
        "email_body": email_body,
        "to_email": reset_password_token.user.email,
        "email_subject": "Återställ lösenord för {title}".format(title="Happicard"),
    }
    Util.send_email(data)

    return Response({"Email": "Successfully Sent"})