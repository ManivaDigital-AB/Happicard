from django.conf import settings
from requests.auth import HTTPBasicAuth
from django.core.exceptions import ObjectDoesNotExist
from rest_framework import permissions, status, generics
from rest_framework.response import Response
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
from uuid import UUID
import requests
import json

from .serializers import (
    OrderSerializer,
    CheckoutSerializer,
    OrderCampaignSerializer,
    OrderGiftCardSerializer,
    HappicardSerializer,
)
from .models import (
    Order,
    OrderCampaign,
    OrderGiftCard,
    Happicard,
)

from backend.utils import Util

DEFAULT_FROM_NUMBER = settings.DEFAULT_FROM_NUMBER

klarna_un = settings.KLARNA_UN
klarna_pw = settings.KLARNA_PW


class UUIDEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, UUID):
            return obj.hex
        return json.JSONEncoder.default(self, obj)


class OrderCampaignListView(generics.ListAPIView):
    permission_classes = (permissions.AllowAny,)
    authentification_classes = ()
    queryset = OrderCampaign.objects.all()
    serializer_class = OrderCampaignSerializer


class OrderGiftCardListView(generics.ListAPIView):
    permission_classes = (permissions.AllowAny,)
    authentification_classes = ()
    queryset = OrderGiftCard.objects.all()
    serializer_class = OrderGiftCardSerializer


class OrderListView(generics.ListAPIView):
    permission_classes = (permissions.AllowAny,)
    authentification_classes = ()
    queryset = Order.objects.all()
    serializer_class = OrderSerializer


class OrderGiftCardCreateView(generics.CreateAPIView):
    """
    Create Order Gift Cards View
    """

    permission_classes = (permissions.AllowAny,)
    serializer_class = OrderGiftCardSerializer

    def post(self, request):
        order = request.data
        serializer = self.serializer_class(data=order)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class OrderCampaignCreateView(generics.CreateAPIView):
    """
    Create Order Campaigns View
    """

    permission_classes = (permissions.AllowAny,)
    serializer_class = OrderCampaignSerializer

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


class KlarnaCheckoutView(generics.GenericAPIView):
    """
    Checkout View with Klarna API
    """

    permission_classes = (permissions.AllowAny,)
    serializer_class = CheckoutSerializer

    order_param_config = openapi.Parameter(
        "id",
        in_=openapi.IN_QUERY,
        description="Place the Happi Order ID here:",
        type=openapi.TYPE_STRING,
    )

    @swagger_auto_schema(manual_parameters=[order_param_config])
    def get(self, request):
        auth = HTTPBasicAuth(klarna_un, klarna_pw)
        headers = {"content-type": "application/json"}
        order_id = request.GET.get("id")
        order = Order.objects.get(id=order_id)

        try:
            order_lines = []
            campaign_order_amount = 0
            giftcard_order_amount = 0
            for item in order.campaigns.all():
                order_lines.append(
                    {
                        "type": "gift_card",
                        "reference": item.campaign.id,
                        "name": item.campaign.title,
                        "quantity": int(item.quantity),
                        "unit_price": int(item.price_choice * 100),
                        "tax_rate": int(00),
                        "total_amount": int((item.price_choice * 100) * item.quantity),
                        "total_discount_amount": 0,
                        "total_tax_amount": 0,
                    }
                )
                campaign_order_amount += (item.price_choice * 100) * item.quantity
            for item in order.giftcards.all():
                if item.giftcard.has_offer:
                    order_lines.append(
                        {
                            "type": "gift_card",
                            "reference": item.giftcard.id,
                            "name": item.giftcard.title,
                            "quantity": int(item.quantity),
                            "unit_price": int(item.price_choice * 100),
                            "tax_rate": int(00),
                            "total_amount": int(
                                int((item.price_choice * 100) * item.quantity)
                                - int(item.giftcard.discount_price * 100)
                            ),
                            "total_discount_amount": int(
                                item.giftcard.discount_price * 100
                            ),
                            "total_tax_amount": 0,
                        }
                    )
                    giftcard_order_amount += (
                        (item.price_choice * 100) * item.quantity
                    ) - int(item.giftcard.discount_price * 100)
                else:
                    order_lines.append(
                        {
                            "type": "gift_card",
                            "reference": item.giftcard.id,
                            "name": item.giftcard.title,
                            "quantity": int(item.quantity),
                            "unit_price": int((item.price_choice * 100)),
                            "tax_rate": int(00),
                            "total_amount": int(
                                (item.price_choice * 100) * item.quantity
                            ),
                            "total_discount_amount": 0,
                            "total_tax_amount": 0,
                        }
                    )
                    giftcard_order_amount += (item.price_choice * 100) * item.quantity
            order_amount = int(campaign_order_amount + giftcard_order_amount)
            body = {
                "purchase_country": "SE",
                "purchase_currency": "SEK",
                "locale": "sv-SE",
                "order_amount": order_amount,
                "order_tax_amount": 0,
                "order_lines": order_lines,
                "billing_address": {
                    "given_name": order.first_name,
                    "family_name": order.last_name,
                    "email": order.email,
                    "street_address": order.street_address1,
                    "street_address2": order.street_address2,
                    "postal_code": order.postcode,
                    "city": order.town_or_city,
                    "region": order.region,
                    "phone": order.phone_number,
                    "country": str(order.country),
                },
                "merchant_urls": {
                    "terms": "http://localhost:3000/terms",
                    "checkout": "http://localhost:3000/checkout?oid={checkout.order.id}",
                    "confirmation": "http://localhost:3000/confirmation?oid={checkout.order.id}",
                    "push": "https://localhost:3000/klarna/push?oid={checkout.order.id}",
                },
            }
            data = json.dumps(body, cls=UUIDEncoder)
            response = requests.post(
                settings.KLARNA_BASE_URL + "/checkout/v3/orders",
                auth=auth,
                headers=headers,
                data=data,
            )
            klarna_order = response.json()
            return Response(
                {"Klarna Checkout Order": klarna_order},
                status=status.HTTP_200_OK,
            )

        except ObjectDoesNotExist:
            return Response({"Error": "You do not have an active order."})


class KlarnaCheckoutConfirmView(generics.GenericAPIView):
    """
    Checkout Confirmation View with Klarna API
    """

    permission_classes = (permissions.AllowAny,)
    serializer_class = CheckoutSerializer

    order_param_config = openapi.Parameter(
        "id",
        in_=openapi.IN_QUERY,
        description="Place the Klarna Order ID here:",
        type=openapi.TYPE_STRING,
    )

    @swagger_auto_schema(manual_parameters=[order_param_config])
    def get(self, request):
        auth = HTTPBasicAuth(klarna_un, klarna_pw)
        headers = {"content-type": "application/json"}
        klarna_order_id = request.GET.get("id")

        try:
            response = requests.get(
                settings.KLARNA_BASE_URL + "/checkout/v3/orders/" + klarna_order_id,
                auth=auth,
                headers=headers,
            )
            klarna_confirm = response.json()
            return Response(
                {"Klarna Checkout Confirmation": klarna_confirm},
                status=status.HTTP_200_OK,
            )

        except ObjectDoesNotExist:
            return Response({"Error": "You do not have an active order."})


class HappicardCreateView(generics.CreateAPIView):
    """
    Create Happicard View
    """

    permission_classes = (permissions.AllowAny,)
    serializer_class = HappicardSerializer

    def post(self, request):
        auth = HTTPBasicAuth(klarna_un, klarna_pw)
        headers = {"content-type": "application/json"}

        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        recipient = serializer.data
        happi_order_id = recipient.get("happi_order_id")
        klarna_order_confirm = recipient.get("klarna_order_confirm")
        order = Order.objects.get(id=happi_order_id)

        if happi_order_id and klarna_order_confirm:
            sender_name = order.first_name
            recipient_name = recipient.get("recipient_name")
            recipient_email_choice = recipient.get("recipient_email_choice")
            recipient_sms_choice = recipient.get("recipient_sms_choice")
            personal_message = recipient.get("personal_message")
            email_subject = f"{sender_name} sent you a Happicard"

            if recipient.get("personal_image"):
                personal_image = recipient.get("personal_image")
            if recipient.get("personal_video"):
                personal_video = recipient.get("personal_video")

            rebate_code = [
                item.match_price_choice_with_rebate for item in order.giftcards.all()
            ].pop()
            redeem_website = [
                item.giftcard.redeem_website for item in order.giftcards.all()
            ].pop()

            if recipient_email_choice and recipient_sms_choice:
                recipient_email = recipient.get("recipient_email")
                confirmation = {
                    "to_email": recipient_email,
                    "email_body": personal_message,
                    "email_subject": email_subject,
                }
                Util.send_happicard_email(
                    confirmation, recipient_name, rebate_code, redeem_website
                )

                recipient_number = recipient.get("recipient_number")
                Util.outbound_mms(
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
                recipient_number = recipient.get("recipient_number")
                Util.outbound_mms(
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
                recipient_email = recipient.get("recipient_email")
                confirmation = {
                    "to_email": recipient_email,
                    "email_body": personal_message,
                    "email_subject": email_subject,
                }
                Util.send_happicard_email(
                    confirmation, recipient_name, rebate_code, redeem_website
                )
                return Response(
                    {"Success": "Happicard email successfully sent."},
                    status=status.HTTP_200_OK,
                )


class OrderCampaignDetailView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = (permissions.AllowAny,)
    authentication_classes = ()
    queryset = OrderCampaign.objects.all()
    serializer_class = OrderCampaignSerializer


class OrderGiftCardDetailView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = (permissions.AllowAny,)
    authentication_classes = ()
    queryset = OrderGiftCard.objects.all()
    serializer_class = OrderGiftCardSerializer


class OrderDetailView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = (permissions.AllowAny,)
    authentication_classes = ()
    queryset = Order.objects.all()
    serializer_class = OrderSerializer


class HappicardDetailView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = (permissions.AllowAny,)
    authentication_classes = ()
    queryset = Happicard.objects.all()
    serializer_class = HappicardSerializer