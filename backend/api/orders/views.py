from django.shortcuts import render, redirect, get_object_or_404
from django.conf import settings
import requests
from requests.auth import HTTPBasicAuth
from django.http import HttpResponse
from django.urls import reverse
from django.contrib.auth.decorators import login_required
from rest_framework import permissions, status
from rest_framework import generics
from django.core import serializers
from rest_framework.response import Response

from .models import Order, OrderProduct
from .serializers import (
    OrderSerializer,
    OrderProductSerializer,
    CheckoutSerializer,
)
from decimal import Decimal
from backend.api.products.models import GiftCard, Campaign
from backend.api.authentification.utils import Util

klarna_un = settings.KLARNA_UN
klarna_pw = settings.KLARNA_PW


class KlarnaCheckout(generics.GenericAPIView):
    serializer_class = CheckoutSerializer
    permission_classes = (permissions.AllowAny,)
    auth = HTTPBasicAuth(klarna_un, klarna_pw)
    headers = {"content-type": "application/json"}

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        checkout = serializer.data
        product_type = checkout.get("product_type")
        total = 0
        order_lines = []
        order_id = 0
        if product_type == "GiftCard":
            order_lines.append(
                {
                    "name": GiftCard.name,
                    "reference": GiftCard.product_id,
                    "unit_price": int(GiftCard.price * 100),
                    "image_url": GiftCard.image_url,
                    "description": GiftCard.description,
                    "quantity": int(GiftCard.quantity),
                    "has_offer": GiftCard.has_offer,
                    "discount_price": GiftCard.discount_price,
                    "tax_rate": int(00),
                    "total_amount": int(
                        GiftCard.price * 100
                    ),  # WILL BE ADJUSTED FOR CART SYSTEM
                    "total_tax_amount": 0,
                }
            )
            total += Campaign.price * 100  # WILL BE ADJUSTED FOR CART SYSTEM
            integer_total = int(total)
        else:
            order_lines.append(
                {
                    "name": Campaign.name,
                    "reference": Campaign.product_id,
                    "unit_price": int(Campaign.price * 100),
                    "image_url": Campaign.image_url,
                    "description": Campaign.description,
                    "quantity": int(Campaign.quantity),
                    "tax_rate": int(00),
                    "total_amount": int(
                        Campaign.price * 100
                    ),  # WILL BE ADJUSTED FOR CART SYSTEM
                    "total_tax_amount": 0,
                }
            )
            total += Campaign.price * 100  # WILL BE ADJUSTED FOR CART SYSTEM
            integer_total = int(total)
        if order_id:
            response = requests.get(
                settings.KLARNA_BASE_URL + "/checkout/v3/orders/" + order_id,
                auth=auth,
                headers=headers,
            )

            klarna_order = response.json()
            if klarna_order["order_lines"] == order_lines:
                context = {"klarna_order": klarna_order}
                return Response(context, status=status.HTTP_200_OK)


class KlarnaCheckoutCompletion(generics.GenericAPIView):
    serializer_class = CheckoutSerializer
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
