from django.conf import settings
from django.core.exceptions import ObjectDoesNotExist
from rest_framework import permissions, status, generics, views
from rest_framework.response import Response
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
from uuid import UUID
import requests
import stripe
import json

from .serializers import (
    OrderSerializer,
    OrderItemSerializer,
    StripeTransferSerializer,
)
from .models import (
    Order,
    OrderItem,
)

from backend.tasks import send_happicard_email_task, outbound_mms_task
from backend.utils import Util

DEFAULT_FROM_NUMBER = settings.DEFAULT_FROM_NUMBER

stripe.api_key = settings.STRIPE_DEV_SK


class OrderItemListView(generics.ListAPIView):
    permission_classes = (permissions.AllowAny,)
    authentification_classes = ()
    queryset = OrderItem.objects.all()
    serializer_class = OrderItemSerializer


class OrderListView(generics.ListAPIView):
    permission_classes = (permissions.AllowAny,)
    authentification_classes = ()
    queryset = Order.objects.all()
    serializer_class = OrderSerializer


class OrderItemCreateView(generics.CreateAPIView):
    """
    Create Order Item View
    """

    permission_classes = (permissions.AllowAny,)
    serializer_class = OrderItemSerializer

    def post(self, request):
        order = request.data
        serializer = self.serializer_class(data=order)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class OrderCreateView(generics.CreateAPIView):
    """
    Create Order View
    """

    permission_classes = (permissions.AllowAny,)
    serializer_class = OrderSerializer

    def post(self, request):
        order = request.data
        serializer = self.serializer_class(data=order)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class StripePaymentView(views.APIView):
    """
    Stripe Payment View
    """

    permission_classes = (permissions.AllowAny,)

    def get(self, request):
        payment_intent = stripe.PaymentIntent.create(
            amount=10000,
            currency="usd",
            payment_method_types=["card"],
            transfer_group="{ORDER10}",
        )
        transfer = stripe.Transfer.create(
            amount=7000,
            currency="usd",
            destination="acct_1IO3nh2VgnDoOgtm",
            transfer_group="{ORDER10}",
        )

        return Response(status=status.HTTP_200_OK, data=transfer)


class StripeChargeView(views.APIView):
    """
    Stripe Charge View
    """

    permission_classes = (permissions.AllowAny,)

    def get(self, request):
        charge = stripe.Charge.create(
            amount=2000,
            currency="sek",
            source="tok_se",
            description="Testing charges with transfers",
        )
        return Response(status=status.HTTP_200_OK, data=charge)


class StripeTransferView(generics.GenericAPIView):
    """
    Stripe Transfer View
    """

    permission_classes = (permissions.AllowAny,)
    serializer_class = StripeTransferSerializer

    def post(self, request):

        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        transfer = serializer.data
        charge_id = transfer.get("charge_id")
        destination = transfer.get("destination")

        transfer = stripe.Transfer.create(
            amount=1000,
            currency="sek",
            source_transaction=charge_id,
            destination=destination,
        )
        return Response(status=status.HTTP_200_OK, data=transfer)


class StripePayoutView(views.APIView):
    """
    Stripe Payout View
    """

    permission_classes = (permissions.AllowAny,)

    def get(self, request):
        payout = stripe.Payout.create(amount=2100, currency="sek")
        return Response(status=status.HTTP_200_OK, data=payout)


class HappicardCreateView(generics.CreateAPIView):
    """
    Create Happicard View
    """

    permission_classes = (permissions.AllowAny,)
    serializer_class = OrderSerializer

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        recipient = serializer.data
        order_id = recipient.get("order_id")
        order = Order.objects.get(id=order_id)

        if order_id:
            sender_name = order.first_name
            recipient_name = recipient.get("happicard_recipient_name")
            recipient_email_choice = recipient.get("happicard_recipient_email_choice")
            recipient_sms_choice = recipient.get("happicard_recipient_sms_choice")
            personal_message = recipient.get("happicard_personal_message")
            email_subject = f"{sender_name} sent you a Happicard"

            if recipient.get("happicard_personal_image"):
                personal_image = recipient.get("happicard_personal_image")
            if recipient.get("happicard_personal_video"):
                personal_video = recipient.get("happicard_personal_video")

            rebate_code = [
                item.match_price_choice_with_rebate for item in order.items.all()
            ].pop()
            redeem_website = [item.redeem_website for item in order.items.all()].pop()

            if recipient_email_choice and recipient_sms_choice:
                recipient_email = recipient.get("happicard_recipient_email")
                confirmation = {
                    "to_email": recipient_email,
                    "email_body": personal_message,
                    "email_subject": email_subject,
                }
                send_happicard_email_task.delay(
                    confirmation, recipient_name, rebate_code, redeem_website
                )

                recipient_number = recipient.get("happicard_recipient_number")
                outbound_mms_task.delay(
                    to_number=recipient_number,
                    from_number=DEFAULT_FROM_NUMBER,
                    personal_message=personal_message,
                    recipient_name=recipient_name,
                    sender_name=sender_name,
                    rebate_code=rebate_code,
                    redeem_website=redeem_website,
                )
                return Response(
                    {"Success": "Happicard email and SMS successfully sent."},
                    status=status.HTTP_200_OK,
                )
            elif recipient_sms_choice and not recipient_email_choice:
                recipient_number = recipient.get("happicard_recipient_number")
                outbound_mms_task.delay(
                    to_number=recipient_number,
                    from_number=DEFAULT_FROM_NUMBER,
                    personal_message=personal_message,
                    recipient_name=recipient_name,
                    sender_name=sender_name,
                    rebate_code=rebate_code,
                    redeem_website=redeem_website,
                )
                return Response(
                    {"Success": "Happicard SMS successfully sent."},
                    status=status.HTTP_200_OK,
                )
            else:
                recipient_email = recipient.get("happicard_recipient_email")
                confirmation = {
                    "to_email": recipient_email,
                    "email_body": personal_message,
                    "email_subject": email_subject,
                }
                send_happicard_email_task.delay(
                    confirmation, recipient_name, rebate_code, redeem_website
                )
                return Response(
                    {
                        "Success": f"Happicard email will be successfully sent on {happicard_delivery_date}."
                    },
                    status=status.HTTP_200_OK,
                )


class OrderItemDetailView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = (permissions.AllowAny,)
    authentication_classes = ()
    queryset = OrderItem.objects.all()
    serializer_class = OrderItemSerializer


class OrderDetailView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = (permissions.AllowAny,)
    authentication_classes = ()
    queryset = Order.objects.all()
    serializer_class = OrderSerializer