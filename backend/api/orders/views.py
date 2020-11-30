from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import permissions, status
from rest_framework.permissions import IsAuthenticated
from rest_framework import generics
from django.conf import settings
from django.contrib import messages
from django.core.exceptions import ObjectDoesNotExist
from django.contrib.auth.decorators import login_required
from django.contrib.auth.mixins import LoginRequiredMixin
from django.shortcuts import get_object_or_404
from django.shortcuts import redirect
from django.utils import timezone
from .models import Item, OrderItem, Order

import requests
import random
import string

from .serializers import OrderSerializer
from .models import Order, OrderItem

klarna_un = settings.KLARNA_UN
klarna_pw = settings.KLARNA_PW


class CreateKlarnaOrder(LoginRequiredMixin, generics.GenericAPIView):
    serializer_class = OrderSerializer

    def post(self, *args, **kwargs):
        auth = HTTPBasicAuth(klarna_un, klarna_pw)
        headers = {"content-type": "application/json"}
        cart = self.request.session.get("cart")
        total = 0
        orderlines = []
        order_id = 0
        try:
            order_id = self.request.session["order_id"]
        except:
            pass
        for item in cart:
            product = utils.get_product(item)
            orderlines.append(
                {
                    "name": product[1].name,
                    "reference": product[1].id,
                    "unit_price": int(product[1].price * 100),
                    "quantity": int(cart[item]),
                    "tax_rate": int(00),
                    "total_amount": int(product[1].price * cart[item] * 100),
                    "total_tax_amount": 0,
                }
            )
            total += product[1].price * cart[item] * 100
        integer_total = int(total)
        if order_id:
            response = requests.get(
                settings.KLARNA_BASE_URL + "/checkout/v3/orders" + order_id,
                auth=auth,
                headers=headers,
            )
            klarna_order = response.json()
            if klarna_order["order_lines"] == orderlines:
                context = {"klarna_order": klarna_order}
            return render(request, context)

        return Response(status=status.HTTP_200_OK)


class OrderList(generics.ListAPIView):
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)
    authentication_classes = ()
    queryset = Order.objects.all()
    serializer_class = OrderSerializer


class OrderDetail(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)
    authentication_classes = ()
    queryset = Order.objects.all()
    serializer_class = OrderSerializer


class OrderSummary(LoginRequiredMixin, generics.GenericAPIView):
    serializer_class = OrderSerializer

    def get(self, *args, **kwargs):
        try:
            order = Order.objects.get(user=self.request.user, ordered=False)
            context = {"object": order}
            return Response(self.request, context)
        except ObjectDoesNotExist:
            messages.warning(self.request, "You do not have an active order")
            return redirect("/")


# Cart Options
def view_cart(request):
    return render(request, "cart/cart.html")


def add_to_cart(request, item_id):
    quantity = int(request.POST.get("amount"))
    redirect_url = request.POST.get("redirect_url")
    cart = request.session.get("cart", {})
    if item_id in list(cart.keys()):
        cart[item_id] += quantity
    else:
        cart[item_id] = quantity
    request.session["cart"] = cart
    return redirect(redirect_url)


def update_cart(request, item_id):
    quantity = int(request.POST.get("amount"))
    redirect_url = request.POST.get("redirect_url")
    cart = request.session.get("cart", {})
    cart[item_id] = quantity
    request.session["cart"] = cart
    return redirect(redirect_url)


def delete_from_cart(request, item_id):
    cart = request.session.get("cart", {})
    cart.pop(item_id)
    request.session["cart"] = cart
    return render(request, "cart/cart.html")
