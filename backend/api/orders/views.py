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
        if self.request.GET.get("sid"):
            order_id = self.request.GET.get("sid")
            response = self.requests.get(
                settings.KLARNA_BASE_URL + "/checkout/v1/orders/" + order_id,
                auth=auth,
                headers=headers,
            )
            klarna_order = self.response.json()
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
                    first_name=klarna_order["billing_address"]["given_name"],
                    last_name=klarna_order["billing_address"]["family_name"],
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
                self.requests.post(
                    settings.KLARNA_BASE_URL
                    + "/ordermanagement/v3/orders/"
                    + order_id
                    + "/acknowledge",
                    auth=auth,
                    headers=headers,
                )
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
