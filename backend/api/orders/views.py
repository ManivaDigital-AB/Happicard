from django.shortcuts import render, redirect, get_object_or_404
from django.conf import settings
import requests
from requests.auth import HTTPBasicAuth
from django.http import HttpResponse
from django.urls import reverse
from django.contrib.auth.decorators import login_required
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
    OrderProductSerializer,
)
from decimal import Decimal
from backend.api.authentification.utils import Util

from .models import Order, OrderProduct

klarna_un = settings.KLARNA_UN
klarna_pw = settings.KLARNA_PW


class UUIDEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, UUID):
            return obj.hex
        return json.JSONEncoder.default(self, obj)


class KlarnaCheckout(generics.GenericAPIView):
    permission_classes = (permissions.AllowAny,)
    serializer_class = OrderSerializer

    order_param_config = openapi.Parameter(
        "order_id",
        in_=openapi.IN_QUERY,
        description="Place the Order ID here:",
        type=openapi.TYPE_STRING,
    )

    @swagger_auto_schema(manual_parameters=[order_param_config])
    def get(self, request):
        auth = HTTPBasicAuth(klarna_un, klarna_pw)
        headers = {"content-type": "application/json"}
        order_id = request.GET.get("order_id")
        order = Order.objects.get(order_id=order_id)

        try:
            order_lines = []
            order_amount = 0
            products = order.products

            for item in products.all():
                order_lines.append(
                    {
                        "reference": item.product.product_id,
                        "name": item.product.title,
                        "quantity": int(item.product.quantity),
                        "unit_price": int(item.product.price),
                        "tax_rate": int(00),
                        "total_amount": int(item.product.price * item.product.quantity),
                        "total_discount_amount": 0,
                        "total_tax_amount": 0,
                    }
                )
                order_amount += item.product.price * item.product.quantity
            order_amount = int(order_amount)
            body = {
                "purchase_country": "SE",
                "purchase_currency": "SEK",
                "locale": "sv-SE",
                "order_amount": order_amount,
                "order_tax_amount": 0,
                "order_lines": order_lines,
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
                {"Successful Klarna Checkout Order": klarna_order},
                status=status.HTTP_200_OK,
            )

        except ObjectDoesNotExist:
            return Response({"Error": "You do not have an active order."})


class KlarnaCheckoutCompletion(generics.GenericAPIView):
    serializer_class = OrderSerializer
    permission_classes = (permissions.AllowAny,)
    auth = HTTPBasicAuth(klarna_un, klarna_pw)
    headers = {"content-type": "application/json"}

    def get(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        checkout = serializer.data
        response = requests.get(
            settings.KLARNA_BASE_URL + "/checkout/v3/orders/" + order_id,
            auth=auth,
            headers=headers,
        )
        klarna_order = response.json()
        order = Order(
            order_id=klarna_order["order_id"],
            status=klarna_order["status"],
            first_name=klarna_order["billing_address"]["first_name"],
            last_name=klarna_order["billing_address"]["last_name"],
            email=klarna_order["billing_address"]["email"],
            phone_number=klarna_order["billing_address"]["phone"],
            country=klarna_order["billing_address"]["country"],
            postcode=klarna_order["billing_address"]["postal_code"],
            town_or_city=klarna_order["billing_address"]["city"],
            street_address1=klarna_order["billing_address"]["street_address"],
            order_total=klarna_order["order_amount"],
            klarna_line_items=klarna_order["order_lines"],
        )
        order.save()
        context = {"klarna_order": klarna_order}
        confirm_subject = "Order Confirmation!"
        confirm_body = "Grattis, your order has been confirmed! Redeem your Happicard purchase with this QR Code:\n{}".format(
            "QR Code goes here"
        )
        confirmation = {
            "email_body": confirm_body,
            "to_email": vendor.email,
            "email_subject": confirm_subject,
        }
        Util.send_email(confirmation)
        return Response(
            {"Success": "Order confirmed"}, context, status=status.HTTP_200_OK
        )


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