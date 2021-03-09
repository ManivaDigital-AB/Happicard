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
    OrderListSerializer,
    OrderItemListSerializer,
    HappicardSerializer,
    PayoutSerializer,
    TransferSerializer,
)
from .models import (
    Order,
    OrderItem,
)

from backend.tasks import send_happicard_email_task, outbound_mms_task
from backend.utils import Util

DEFAULT_FROM_NUMBER = settings.DEFAULT_FROM_NUMBER

stripe.api_key = settings.STRIPE_DEV_SK


class OrderListView(generics.ListAPIView):
    permission_classes = (permissions.AllowAny,)
    authentication_classes = ()
    serializer_class = OrderListSerializer
    queryset = Order.objects.all()


class OrderItemListView(generics.ListAPIView):
    permission_classes = (permissions.AllowAny,)
    authentication_classes = ()
    serializer_class = OrderItemListSerializer
    queryset = OrderItem.objects.all()


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


class StripePaymentIntentView(generics.GenericAPIView):
    """
    Stripe Payment View
    """

    permission_classes = (permissions.AllowAny,)
    serializer_class = OrderSerializer

    def post(self, request):
        order = request.data
        serializer = self.serializer_class(data=order)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
        order = serializer.data

        current_order = Order.objects.get(id=order["id"])
        total = current_order.get_order_total
        try:
            intent = stripe.PaymentIntent.create(
                amount=total,
                currency="sek",
                payment_method_types=["card"],
                receipt_email=current_order.email,
            )
            return Response(
                {
                    "client_secret": intent.client_secret,
                    "order": order,
                }
            )
        except stripe.error.CardError as e:
            body = e.json_body
            err = body.get("error", {})
            print("Status is: %s" % e.http_status)
            print("Type is: %s" % err.get("type"))
            print("Code is: %s" % err.get("code"))
            print("Message is %s" % err.get("message"))
            return Response({"message": err.get("message")}, status=e.http_status)
        except stripe.error.RateLimitError as e:
            return Response({"Error": "The API was not able to respond, try again."})
        except stripe.error.InvalidRequestError as e:
            return Response({"Error": "Invalid parameters, unable to process payment."})
        except stripe.error.AuthenticationError as e:
            pass
        except stripe.error.APIConnectionError as e:
            return Response({"Error": "Network communication failed, try again."})
        except stripe.error.StripeError as e:
            return Response({"Error": "Internal Stripe Error, contact support."})
        except Exception as e:
            return Response({"message": "Unable to process payment, try again."})


class HappicardSendView(generics.GenericAPIView):
    """
    Happicard Send View
    """

    permission_classes = (permissions.AllowAny,)
    serializer_class = HappicardSerializer

    def get(self, request, pk):

        order = Order.objects.get(id=pk)

        sender_name = order.first_name
        recipient_name = order.happicard_recipient_name
        recipient_email_choice = order.happicard_recipient_email_choice
        recipient_sms_choice = order.happicard_recipient_sms_choice
        personal_message = order.happicard_personal_message
        email_subject = f"{sender_name} sent you a Happicard"

        if order.happicard_personal_image:
            personal_image = order.happicard_personal_image
        if order.happicard_personal_video:
            personal_video = order.happicard_personal_video

        try:
            rebate_code = [
                item.match_price_choice_with_rebate for item in order.items.all()
            ].pop()
        except:
            return Response(
                {"Error": "An item in your basket is missing a rebate code."}
            )

        try:
            redeem_website = [
                item.get_redeem_website for item in order.items.all()
            ].pop()
        except:
            return Response(
                {
                    "Error": "An item in your basket doesn't include a website for redeeming code."
                }
            )

        if recipient_email_choice and recipient_sms_choice:
            recipient_email = order.happicard_recipient_email
            confirmation = {
                "to_email": recipient_email,
                "email_body": personal_message,
                "email_subject": email_subject,
            }
            send_happicard_email_task.apply_async(
                args=[
                    confirmation,
                    recipient_name,
                    rebate_code,
                    redeem_website,
                ],
                eta=order.happicard_delivery_date,
            )
            recipient_number = order.happicard_recipient_number
            outbound_mms_task.apply_async(
                args=[
                    recipient_number,
                    DEFAULT_FROM_NUMBER,
                    personal_message,
                    recipient_name,
                    sender_name,
                    rebate_code,
                    redeem_website,
                ],
                eta=order.happicard_delivery_date,
            )
            return Response(
                {"Success": "Happicard email and SMS successfully sent."},
                status=status.HTTP_200_OK,
            )
        elif recipient_sms_choice and not recipient_email_choice:
            recipient_number = order.happicard_recipient_number
            outbound_mms_task.apply_async(
                args=[
                    recipient_number,
                    DEFAULT_FROM_NUMBER,
                    personal_message,
                    recipient_name,
                    sender_name,
                    rebate_code,
                    redeem_website,
                ],
                eta=order.happicard_delivery_date,
            )
            return Response(
                {"Success": "Happicard SMS successfully sent."},
                status=status.HTTP_200_OK,
            )
        else:
            recipient_email = order.happicard_recipient_email
            confirmation = {
                "to_email": recipient_email,
                "email_body": personal_message,
                "email_subject": email_subject,
            }
            send_happicard_email_task.apply_async(
                args=[
                    confirmation,
                    recipient_name,
                    rebate_code,
                    redeem_website,
                ],
                eta=order.happicard_delivery_date,
            )
            return Response(
                {
                    "Success": f"Happicard email will be successfully sent on {happicard_delivery_date}."
                },
                status=status.HTTP_200_OK,
            )


class StripePayoutView(generics.GenericAPIView):
    """
    Stripe Payout View
    """

    permission_classes = (permissions.AllowAny,)
    serializer_class = PayoutSerializer

    def post(self, request):

        payout = request.data
        serializer = self.serializer_class(data=payout)
        serializer.is_valid(raise_exception=True)
        payout = serializer.data
        current_order = Order.objects.get(id=payout.get("order_id"))
        total = current_order.get_order_total

        payout_total = (4 * total) / 100.0

        try:
            payout = stripe.Payout.create(
                amount=int(payout_total),
                currency="sek",
                destination=payout.get("destination"),
            )
        except:
            return Response({"Error": "Payout Could Not Be Processed"})

        return Response(status=status.HTTP_200_OK, data=payout)


class StripeTransferView(generics.GenericAPIView):
    """
    Stripe Transfer View
    """

    permission_classes = (permissions.AllowAny,)
    serializer_class = TransferSerializer

    def post(self, request):

        transfer = request.data
        serializer = self.serializer_class(data=transfer)
        serializer.is_valid(raise_exception=True)
        transfer = serializer.data
        current_order = Order.objects.get(id=transfer.get("order_id"))
        total = current_order.get_order_total

        payout_total = (4 * total) / 100.0

        try:
            payout = stripe.Transfer.create(
                amount=int(payout_total),
                currency="sek",
                source=transfer.get("source"),
                destination=transfer.get("destination"),
            )
        except:
            return Response({"Error": "Transfer Could Not Be Completed"})

        return Response(status=status.HTTP_200_OK, data=payout)


class OrderItemDetailView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = (permissions.AllowAny,)
    authentication_classes = ()
    queryset = OrderItem.objects.all()
    serializer_class = OrderItemListSerializer


class OrderDetailView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = (permissions.AllowAny,)
    authentication_classes = ()
    queryset = Order.objects.all()
    serializer_class = OrderListSerializer