from django.urls import path
from . import views

app_name = "orders"
urlpatterns = [
    path("checkout/", views.KlarnaCheckout.as_view(), name="checkout"),
    path(
        "checkout/confirm/",
        views.KlarnaCheckoutConfirmation.as_view(),
        name="checkout-confirm",
    ),
]