from decouple import config
from django.shortcuts import render
from django.conf import settings
from django.urls import reverse
from django.core.mail import send_mail
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
    NewsletterSerializer,
    VendorSerializer,
    VendorRegisterSerializer,
    VendorLoginSerializer,
    CustomerSerializer,
    CustomerRegisterSerializer,
    CustomerLoginSerializer,
    UserLogoutSerializer,
    CustomerEmailVerificationSerializer,
    ContactSerializer,
)
from .models import User, Vendor, Customer, Subscriber
from .renderers import UserRenderer
from .utils import Util


class Newsletter(generics.GenericAPIView):
    serializer_class = NewsletterSerializer

    def post(self, request):
        sub = request.data
        serializer = self.serializer_class(data=sub)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        sub_data = serializer.data
        subscriber = Subscriber.objects.get(email=sub_data["email"])
        email_body = "Tack för att du registrerade dig för Happicards nyhetsbrev!"
        data = {
            "email_body": email_body,
            "to_email": subscriber.email,
            "email_subject": "Välkommen till Happicard!",
        }
        Util.send_email(data)

        return Response({"Email": "Successfully Sent"}, status=status.HTTP_201_CREATED)


class SubscriberDetail(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = (permissions.AllowAny,)
    authentication_classes = ()
    queryset = Subscriber.objects.all()
    serializer_class = NewsletterSerializer


class VendorList(generics.ListAPIView):
    permission_classes = (permissions.AllowAny,)
    authentication_classes = ()
    queryset = Vendor.objects.all()
    serializer_class = VendorSerializer


class CustomerList(generics.ListAPIView):
    permission_classes = (permissions.AllowAny,)
    authentication_classes = ()
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer


class VendorDetail(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = (permissions.AllowAny,)
    authentication_classes = ()
    queryset = Vendor.objects.all()
    serializer_class = VendorSerializer


class CustomerDetail(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = (permissions.AllowAny,)
    authentication_classes = ()
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer


class VendorRegistration(generics.GenericAPIView):
    serializer_class = VendorRegisterSerializer

    def post(self, request):
        user = request.data
        serializer = self.serializer_class(data=user)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        user_data = serializer.data

        return Response(user_data, status=status.HTTP_201_CREATED)


class CustomerRegistration(generics.GenericAPIView):
    serializer_class = CustomerRegisterSerializer
    renderer_classes = (UserRenderer,)

    def post(self, request):
        user = request.data
        serializer = self.serializer_class(data=user)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        user_data = serializer.data
        user = Customer.objects.get(email=user_data["email"])
        token = RefreshToken.for_user(user).access_token
        current_site = get_current_site(request).domain
        relative_link = "/api/auth/customer/email-verify/"
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


class CustomerEmailVerification(views.APIView):
    serializer_class = CustomerEmailVerificationSerializer

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
            user = Customer.objects.get(id=payload["user_id"])
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


class VendorLogin(generics.GenericAPIView):
    serializer_class = VendorLoginSerializer

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class CustomerLogin(generics.GenericAPIView):
    serializer_class = CustomerLoginSerializer

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class UserLogout(views.APIView):
    serializer_class = UserLogoutSerializer
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


class ContactView(views.APIView):
    def post(self, request, *args, **kwargs):
        serializer_class = ContactSerializer(data=request.data)
        if serializer_class.is_valid():
            data = serializer_class.validated_data
            email_from = data.get("email")
            subject = data.get("subject")
            message = data.get("message")
            send_mail(
                subject,
                message,
                email_from,
                ["send to email"],
            )
        return Response({"Success": "Sent"})
        return Response({"Success": "Failed"}, status=status.HTTP_400_BAD_REQUEST)
