from django.urls import path
from . import views

app_name = "orders"
urlpatterns = [
    path(
        "list/order/",
        views.OrderListView.as_view(),
        name="list-order",
    ),
    path(
        "list/order-items/",
        views.OrderItemListView.as_view(),
        name="list-order-items",
    ),
    path(
        "create/item-to-basket/",
        views.OrderItemCreateView.as_view(),
        name="create-item-to-basket",
    ),
    path(
        "item-to-basket/<uuid:pk>",
        views.OrderItemDetailView.as_view(),
        name="item-to-basket-detail",
    ),
    path(
        "order/<uuid:pk>",
        views.OrderDetailView.as_view(),
        name="order-detail",
    ),
    path(
        "create/stripe-payment/",
        views.StripePaymentIntentView.as_view(),
        name="stripe-payment",
    ),
    path(
        "send/happicard/<uuid:pk>",
        views.HappicardSendView.as_view(),
        name="send-happicard",
    ),
    path(
        "create/stripe-payout/",
        views.StripePayoutView.as_view(),
        name="stripe-payout",
    ),
    path(
        "create/stripe-transfer/",
        views.StripeTransferView.as_view(),
        name="stripe-transfer",
    ),
]