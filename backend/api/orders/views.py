from django.shortcuts import render, redirect, get_object_or_404
from django.conf import settings
import requests
from requests.auth import HTTPBasicAuth
import json
from django.http import HttpResponse
from django.urls import reverse
from django.contrib.auth.decorators import login_required
from rest_framework import permissions, status
from rest_framework import generics
from rest_framework.response import Response

from backend.api.products.utils import get_product
from .models import Order, Cart
from .serializers import (
    OrderSerializer,
    CheckoutSerializer,
    CartSerializer,
)
from decimal import Decimal

klarna_un = settings.KLARNA_UN
klarna_pw = settings.KLARNA_PW


class KlarnaOrderManagement(generics.GenericAPIView):
    serializer_class = OrderSerializer
    auth = HTTPBasicAuth(klarna_un, klarna_pw)
    headers = {"content-type": "application/json"}

    def get(self, request):
        order_id = request.GET.get("sid")
        response = requests.get(
            settings.KLARNA_BASE_URL + "/ordermanagement/v1/orders/" + order_id,
            auth=auth,
            headers=headers,
        )
        klarna_order = response.json()
        klarna_order["order_id"]
        if Order.objects.filter(order_id=klarna_order["order_id"]).count() == 1:
            order = Order.objects.filter(order_id=klarna_order["order_id"]).first()
            order.status = klarna_order["status"]
            order.save()
            requests.post(
                settings.KLARNA_BASE_URL
                + "/ordermanagement/v1/orders/"
                + order_id
                + "/acknowledge",
                auth=auth,
                headers=headers,
            )
        else:
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
            requests.post(
                settings.KLARNA_BASE_URL
                + "/ordermanagement/v3/orders/"
                + order_id
                + "/acknowledge",
                auth=auth,
                headers=headers,
            )
        return Response({"Order": "Successfully Handled"}, status=status.HTTP_200_OK)


class KlarnaCheckout(generics.GenericAPIView):
    serializer_class = CheckoutSerializer
    auth = HTTPBasicAuth(klarna_un, klarna_pw)
    headers = {"content-type": "application/json"}

    def post(self, request):
        total = 0
        order_lines = []
        order_id = 0
        try:
            order_id = request.session["order_id"]
        except:
            pass
        for item in Cart:
            product = utils.get_product(item)
            order_lines.append(
                {
                    "name": product[1].name,
                    "reference": product[1].id,
                    "unit_price": int(product[1].price * 100),
                    "quantity": int(Cart[item]),
                    "tax_rate": int(00),
                    "total_amount": int(product[1].price * cart[item] * 100),
                    "total_tax_amount": 0,
                }
            )
            total += product[1].price * cart[item] * 100
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

    def get(self, request):
        order_id = ""
        try:
            order_id = request.session["order_id"]
        except:
            pass
        if order_id != "":
            auth = HTTPBasicAuth(klarna_un, klarna_pw)
            headers = {"content-type": "application/json"}
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
            request.session["cart"] = {}
            request.session["order_id"] = ""
            context = {"klarna_order": klarna_order}
            return Response(context, status=status.HTTP_200_OK)
        else:
            return Response(reverse(CartList))


class CartContents(generics.ListAPIView):
    serializer_class = CartSerializer
    permission_classes = (permissions.AllowAny,)

    def get(self, request):
        cart_items = []
        total = 0
        product_count = 0

        for item_id, quantity in Cart.items():
            product = get_object_or_404(Product, pk=item_id)
            total += quantity * product.price
            subtotal = quantity * product.price
            product_count += quantity
            cart_items.append(
                {
                    "item_id": item_id,
                    "quantity": quantity,
                    "product": product,
                    "subtotal": subtotal,
                }
            )

        content = {
            "cart_items": cart_items,
            "total": total,
            "product_count": product_count,
        }
        return Response({"Cart contents": content})


# Cart Options
class ViewCart(generics.ListAPIView):
    permission_classes = (permissions.AllowAny,)
    queryset = Cart.objects.all()
    serializer_class = CartSerializer


class AddtoCart(generics.CreateAPIView):
    def post(self, request, item_id):
        quantity = int(request.POST.get("amount"))
        if item_id in list(Cart.keys()):
            cart[item_id] += quantity
        else:
            cart[item_id] = quantity
        request.session["cart"] = cart
        return redirect(redirect_url)


class UpdateCart(generics.UpdateAPIView):
    def patch(self, request):
        quantity = int(request.POST.get("amount"))
        cart[item_id] = quantity
        request.session["cart"] = cart
        return Response({"Success": "Cart Updated"}, status=status.HTTP_200_OK)


class DeleteCart(generics.DestroyAPIView):
    def de(self, request, item_id):
        cart = request.session.get("cart", {})
        cart.pop(item_id)
        request.session["cart"] = cart
        return render(request)
