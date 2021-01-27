from django.shortcuts import render, redirect, get_object_or_404
from django.conf import settings
from requests.auth import HTTPBasicAuth
from rest_framework.parsers import MultiPartParser, FormParser
from django.core.exceptions import ObjectDoesNotExist
from rest_framework import permissions, status
from rest_framework import generics, viewsets
from django.core import serializers
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
    OrderProduct,
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


class OrderCampaignList(generics.ListAPIView):
    permission_classes = (permissions.AllowAny,)
    authentification_classes = ()
    queryset = OrderCampaign.objects.all()
    serializer_class = OrderCampaignSerializer


class OrderGiftCardList(generics.ListAPIView):
    permission_classes = (permissions.AllowAny,)
    authentification_classes = ()
    queryset = OrderGiftCard.objects.all()
    serializer_class = OrderGiftCardSerializer


class OrderList(generics.ListAPIView):
    permission_classes = (permissions.AllowAny,)
    authentification_classes = ()
    queryset = Order.objects.all()
    serializer_class = OrderSerializer


class CreateOrderGiftCard(generics.CreateAPIView):
    """
    Create Order Gift Cards
    """

    permission_classes = (permissions.AllowAny,)
    parser_classes = (MultiPartParser, FormParser)
    serializer_class = OrderGiftCardSerializer

    def post(self, request, format=None):
        order = request.data
        serializer = self.serializer_class(data=order)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CreateOrderCampaign(generics.CreateAPIView):
    """
    Create Order Campaigns
    """

    permission_classes = (permissions.AllowAny,)
    parser_classes = (MultiPartParser, FormParser)
    serializer_class = OrderCampaignSerializer

    def post(self, request, format=None):
        order = request.data
        serializer = self.serializer_class(data=order)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CreateOrder(generics.CreateAPIView):
    """
    Create General Order
    """

    permission_classes = (permissions.AllowAny,)
    parser_classes = (MultiPartParser, FormParser)
    serializer_class = OrderSerializer

    def post(self, request, format=None):
        order = request.data
        serializer = self.serializer_class(data=order)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class KlarnaCheckout(generics.GenericAPIView):
    """
    Checkout with Klarna API
    """

    permission_classes = (permissions.AllowAny,)
    serializer_class = CheckoutSerializer

    order_param_config = openapi.Parameter(
        "id",
        in_=openapi.IN_QUERY,
        description="Place the Order ID here:",
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
                        "unit_price": int(item.campaign.price),
                        "tax_rate": int(00),
                        "total_amount": int(item.campaign.price * item.quantity),
                        "total_discount_amount": 0,
                        "total_tax_amount": 0,
                    }
                )
                campaign_order_amount += item.campaign.price * item.quantity
            for item in order.giftcards.all():
                if item.giftcard.has_offer:
                    order_lines.append(
                        {
                            "type": "gift_card",
                            "reference": item.giftcard.id,
                            "name": item.giftcard.title,
                            "quantity": int(item.quantity),
                            "unit_price": int(item.giftcard.price),
                            "tax_rate": int(00),
                            "total_amount": int(
                                (item.giftcard.price * item.quantity)
                                - item.giftcard.discount_price
                            ),
                            "total_discount_amount": int(item.giftcard.discount_price),
                            "total_tax_amount": 0,
                        }
                    )
                else:
                    order_lines.append(
                        {
                            "type": "gift_card",
                            "reference": item.giftcard.id,
                            "name": item.giftcard.title,
                            "quantity": int(item.quantity),
                            "unit_price": int(item.giftcard.price),
                            "tax_rate": int(00),
                            "total_amount": int(item.giftcard.price * item.quantity),
                            "total_discount_amount": item.giftcard.discount_price,
                            "total_tax_amount": 0,
                        }
                    )
                giftcard_order_amount += (
                    item.giftcard.price * item.quantity
                ) - item.giftcard.discount_price
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
                    "push": "https://7ed00556b751.ngrok.io/klarna/push?oid={checkout.order.id}",
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


class CompleteHappicardCheckout(generics.GenericAPIView):
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
        klarna_order_id = recipient.get("klarna_order_id")
        order = Order.objects.get(id=happi_order_id)

        if happi_order_id and klarna_order_id:
            sender_name = order.first_name
            recipient_name = recipient.get("recipient_name")
            recipient_email_choice = recipient.get("recipient_email_choice")
            recipient_sms_choice = recipient.get("recipient_sms_choice")
            personal_message = recipient.get("personal_message")
            email_subject = f"{sender_name} sent you a Happicard"

            rebate_code = [
                item.giftcard.rebate_code for item in order.giftcards.all()
            ].pop()
            redeem_website = [
                item.giftcard.redeem_website for item in order.giftcards.all()
            ].pop()

            # CHANGE TO BE DYNAMIC
            Util.create_qrcode(
                "backend/api/orders/qr_data/happicard.png", klarna_order_id
            )
            outbound_media = (
                "https://media.giphy.com/media/IwAZ6dvvvaTtdI8SD5/giphy.gif"
            )

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
                    outbound_media=outbound_media,
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
                    outbound_media=outbound_media,
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
