from django.urls import path
from . import views

app_name = "orders"
urlpatterns = [
    path(
        "list/basket-items/",
        views.OrderItemListView.as_view(),
        name="basket-items-list",
    ),
    path(
        "list/orders/",
        views.OrderListView.as_view(),
        name="list-orders",
    ),
    path(
        "create/item-to-basket/",
        views.OrderItemCreateView.as_view(),
        name="create-item-to-basket",
    ),
    path(
        "create/order/",
        views.OrderCreateView.as_view(),
        name="create-order",
    ),
    path(
        "create/happicard/",
        views.HappicardCreateView.as_view(),
        name="create-happicard",
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
        "create/stripe-charge/",
        views.StripeChargeView.as_view(),
        name="stripe-charge",
    ),
    path(
        "create/stripe-payment/",
        views.StripePaymentView.as_view(),
        name="stripe-payment",
    ),
    path(
        "create/stripe-transfer/",
        views.StripeTransferView.as_view(),
        name="stripe-transfer",
    ),
    path(
        "create/stripe-payout/",
        views.StripePayoutView.as_view(),
        name="stripe-payout",
    ),
]