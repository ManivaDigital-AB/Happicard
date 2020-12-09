from django.urls import path
from . import views

app_name = "orders"
urlpatterns = [
    path(
        "create/campaign-order",
        views.CreateOrderCampaign.as_view(),
        name="create-campaign-order",
    ),
    path(
        "create/giftcard-order",
        views.CreateOrderGiftCard.as_view(),
        name="create-giftcard-order",
    ),
    path("create/order/", views.CreateOrder.as_view(), name="create-order"),
    path("checkout/", views.KlarnaCheckout.as_view(), name="checkout"),
    path(
        "checkout/confirm/",
        views.KlarnaCheckoutConfirmation.as_view(),
        name="checkout-confirm",
    ),
]