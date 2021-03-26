from decouple import config
from django.conf import settings
from django.urls import reverse
from django.core.mail import send_mail
from django.shortcuts import redirect
from rest_framework import permissions, status
from rest_framework import generics, viewsets
from rest_framework.response import Response
from django.contrib.sites.shortcuts import get_current_site
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import views
from django.core.mail import send_mail
from django.dispatch import receiver
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
    VendorListSerializer,
    CustomerSerializer,
    CustomerRegisterSerializer,
    CustomerLoginSerializer,
    UserLogoutSerializer,
    VendorVerificationSerializer,
    CustomerEmailVerificationSerializer,
    ContactSerializer,
)
from .models import User, Vendor, Customer, Subscriber
from backend.utils import Util


class NewsletterCreateView(generics.CreateAPIView):
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

        return Response({"Success": "Email Delivered"}, status=status.HTTP_201_CREATED)


class SubscriberListView(generics.ListAPIView):
    permission_classes = (permissions.AllowAny,)
    authentication_classes = ()
    queryset = Subscriber.objects.all()
    serializer_class = NewsletterSerializer


class VendorListView(generics.ListAPIView):
    permission_classes = (permissions.AllowAny,)
    authentication_classes = ()
    serializer_class = VendorListSerializer
    queryset = Vendor.objects.filter(is_verified=True)


class PendingVendorListView(generics.ListAPIView):
    permission_classes = (permissions.AllowAny,)
    authentication_classes = ()
    queryset = Vendor.objects.filter(is_verified=False)
    serializer_class = VendorSerializer


class CustomerListView(generics.ListAPIView):
    permission_classes = (permissions.AllowAny,)
    authentication_classes = ()
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer


class VendorDetailView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = (permissions.AllowAny,)
    authentication_classes = ()
    queryset = Vendor.objects.all()
    serializer_class = VendorSerializer


class CustomerDetailView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = (permissions.AllowAny,)
    authentication_classes = ()
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer


class SubscriberDetailView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = (permissions.AllowAny,)
    authentication_classes = ()
    queryset = Subscriber.objects.all()
    serializer_class = NewsletterSerializer


class VendorRegistrationView(generics.GenericAPIView):
    serializer_class = VendorRegisterSerializer

    def post(self, request):
        vendor = request.data
        serializer = self.serializer_class(data=vendor)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        form = serializer.data
        email = form["email"]
        name = form["first_name"]
        onboard_staff_body = f"Denna leverantör väntar på verifiering med det här e-postmeddelandet: {email}. Uppdatera deras status nu på Happicard-adminpanelen!"
        onboard_staff_data = {
            "email_body": onboard_staff_body,
            "to_email": settings.DEFAULT_FROM_EMAIL,
            "email_subject": "Ombordstigningsprocess",
        }
        Util.send_email(onboard_staff_data)
        onboard_vendor_body = f"Tack för att du registrerade dig, {name}! Vår administration kommer snart tillbaka till dig för att uppdatera din partnerstatus."
        onboard_vendor_data = {
            "email_body": onboard_vendor_body,
            "to_email": email,
            "email_subject": "Ombordstigningsprocess",
        }
        Util.send_email(onboard_vendor_data)

        return Response(
            {"Success": "Onboarding Emails Delivered"}, status=status.HTTP_201_CREATED
        )


class CustomerRegistrationView(generics.GenericAPIView):
    serializer_class = CustomerRegisterSerializer

    def post(self, request):
        customer = request.data
        serializer = self.serializer_class(data=customer)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        customer_data = serializer.data
        customer = Customer.objects.get(email=customer_data["email"])
        token = RefreshToken.for_user(customer).access_token
        current_site = get_current_site(request).domain
        relative_link = "/api/auth/customer-verify/"
        absurl = "http://" + current_site + relative_link + "?token=" + str(token)
        email_body = (
            "Hej "
            + customer.first_name
            + "!\n\nAnvänd länken nedan för att bekräfta din email:\n"
            + absurl
        )
        data = {
            "email_body": email_body,
            "to_email": customer.email,
            "email_subject": "Bekräfta din email",
        }
        Util.send_email(data)

        return Response(customer_data, status=status.HTTP_201_CREATED)


class CustomerEmailVerificationView(views.APIView):
    serializer_class = CustomerEmailVerificationSerializer

    token_param_config = openapi.Parameter(
        "token",
        in_=openapi.IN_QUERY,
        description="Token",
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


class VendorLoginView(generics.GenericAPIView):
    serializer_class = VendorLoginSerializer

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class CustomerLoginView(generics.GenericAPIView):
    serializer_class = CustomerLoginSerializer

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class UserLogoutView(views.APIView):
    serializer_class = UserLogoutSerializer
    permission_classes = (permissions.AllowAny,)

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


class ContactFormView(generics.GenericAPIView):
    serializer_class = ContactSerializer
    permission_classes = (permissions.AllowAny,)

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        contact = serializer.data
        from_email = contact.get("email")
        contact_subject = contact.get("subject")
        contact_message = contact.get("message")
        contact_data = {
            "email_body": contact_message,
            "email_subject": contact_subject,
            "from_email": from_email,
        }
        Util.send_contactform(contact_data)
        # confirm email
        confirm_data = {
            "email_body": "Vi återkommer så snart som möjligt.",
            "to_email": from_email,
            "email_subject": "Tack för att du kontaktade oss!",
        }
        Util.send_email(confirm_data)
        return Response({"Contact Form": "Successfully Sent"})


class SubscriberCountView(generics.GenericAPIView):
    permission_classes = (permissions.AllowAny,)
    authentication_classes = ()
    serializer_class = NewsletterSerializer

    def get(self, request, format=None):
        subscriber_count = Subscriber.objects.count()
        data = {"Subscriber Count": subscriber_count}
        return Response(data)


class VendorCountView(generics.GenericAPIView):
    permission_classes = (permissions.AllowAny,)
    authentication_classes = ()
    serializer_class = VendorSerializer

    def get(self, request, format=None):
        vendor_count = Vendor.objects.count()
        data = {"Vendor Count": vendor_count}
        return Response(data)


class CustomerCountView(generics.GenericAPIView):
    permission_classes = (permissions.AllowAny,)
    authentication_classes = ()
    serializer_class = CustomerSerializer

    def get(self, request, format=None):
        customer_count = Customer.objects.count()
        data = {"Customer Count": customer_count}
        return Response(data)