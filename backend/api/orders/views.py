from django.shortcuts import render, redirect, get_object_or_404
from django.conf import settings
import requests
from requests.auth import HTTPBasicAuth
from django.contrib.auth.decorators import login_required
from rest_framework.parsers import MultiPartParser, FormParser
from django.core.exceptions import ObjectDoesNotExist
from rest_framework import permissions, status
from rest_framework import generics, viewsets
from django.core import serializers
from rest_framework.response import Response
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
from uuid import UUID
import json

from .serializers import (
    OrderSerializer,
    CheckoutSerializer,
    OrderCampaignSerializer,
    OrderGiftCardSerializer,
)
from .models import (
    Order,
    OrderProduct,
    OrderCampaign,
    OrderGiftCard,
)

from backend.api.authentification.utils import Util

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
                    "terms": "https://www.example.com/terms.html",
                    "checkout": "https://www.example.com/checkout.html",
                    "confirmation": "https://www.example.com/confirmation.html",
                    "push": "https://www.example.com/api/push",
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


class KlarnaCheckoutConfirmation(generics.GenericAPIView):
    """
    Checkout Confirmation with Klarna API
    """

    permission_classes = (permissions.AllowAny,)
    serializer_class = CheckoutSerializer

    order_param_config = openapi.Parameter(
        "order_id",
        in_=openapi.IN_QUERY,
        description="Place the new Order ID here:",
        type=openapi.TYPE_STRING,
    )

    @swagger_auto_schema(manual_parameters=[order_param_config])
    def get(self, request):
        auth = HTTPBasicAuth(klarna_un, klarna_pw)
        headers = {"content-type": "application/json"}
        order_id = request.GET.get("order_id")

        response = requests.get(
            settings.KLARNA_BASE_URL + "/checkout/v3/orders/" + order_id,
            auth=auth,
            headers=headers,
        )
        klarna_order = response.json()
        Util.create_qrcode("backend/api/orders/qr_data/happicard.png", order_id)
        context = {"klarna_order": klarna_order}
        confirm_subject = "Orderbekräftelse"
        confirm_body = "Grattis, din beställning har bekräftats! Lös in ditt Happicard-köp med den här QR-koden:\n"
        confirmation = {
            "email_body": confirm_body,
            "to_email": klarna_order["shipping_address"]["email"],
            "email_subject": confirm_subject,
        }
        Util.send_qr_email(confirmation)
        return Response({"Success": "Order confirmed"}, status=status.HTTP_200_OK)


@login_required
def add_to_cart(request, slug):
    item = get_object_or_404(Product, slug=slug)
    order_item, created = OrderProduct.objects.get_or_create(
        item=item, user=request.user, ordered=False
    )
    order_qs = Order.objects.filter(user=request.user, ordered=False)
    if order_qs.exists():
        order = order_qs[0]
        if order.items.filter(item__slug=item.slug).exists():
            order_item.quantity += 1
            order_item.save()
            messages.info(request, "This item quantity was updated.")
        else:
            order.items.add(order_item)
            messages.info(request, "This item was added to your cart.")
    else:
        ordered_date = timezone.now()
        order = Order.objects.create(user=request.user, ordered_date=ordered_date)
        order.items.add(order_item)
        messages.info(request, "This item was added to your cart.")


@login_required
def remove_from_cart(request, slug):
    item = get_object_or_404(Item, slug=slug)
    order_qs = Order.objects.filter(user=request.user, ordered=False)
    if order_qs.exists():
        order = order_qs[0]
        if order.items.filter(item__slug=item.slug).exists():
            order_item = OrderProduct.objects.filter(
                item=item, user=request.user, ordered=False
            )[0]
            order.items.remove(order_item)
            messages.info(request, "This item was removed from your cart.")
        else:
            messages.info(request, "This item was not in your cart")
    else:
        messages.info(request, "You do not have an active order")


@login_required
def remove_single_item_from_cart(request, slug):
    product = get_object_or_404(Product, slug=slug)
    order_qs = Order.objects.filter(user=request.user, ordered=False)
    if order_qs.exists():
        order = order_qs[0]
        if order.items.filter(item__slug=item.slug).exists():
            order_item = OrderProduct.objects.filter(
                item=item, user=request.user, ordered=False
            )[0]
            if order_item.quantity > 1:
                order_item.quantity -= 1
                order_item.save()
            else:
                order.items.remove(order_item)
            messages.info(request, "This item quantity was updated.")
        else:
            messages.info(request, "This item was not in your cart")
    else:
        messages.info(request, "You do not have an active order")