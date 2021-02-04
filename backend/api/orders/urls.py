from django.urls import path
from . import views

app_name = "orders"
urlpatterns = [
    path(
        "basket-campaigns/",
        views.OrderCampaignList.as_view(),
        name="basket-campaigns-list",
    ),
    path(
        "basket-giftcards/",
        views.OrderGiftCardList.as_view(),
        name="basket-giftcards-list",
    ),
    path("", views.OrderList.as_view(), name="list-order"),
    path(
        "campaign-to-basket/",
        views.CreateOrderCampaign.as_view(),
        name="campaign-to-basket",
    ),
    path(
        "giftcard-to-basket/",
        views.CreateOrderGiftCard.as_view(),
        name="giftcard-to-basket",
    ),
    path("order/", views.CreateOrder.as_view(), name="create-order"),
    path("order/<int:pk>", views.CreateOrder.as_view(), name="order-detail"),
    path("checkout/", views.KlarnaCheckout.as_view(), name="checkout"),
    path(
        "checkout-confirm/",
        views.KlarnaCheckoutConfirmation.as_view(),
        name="checkout-confirm",
    ),
    path(
        "create/happicard/",
        views.CreateHappicard.as_view(),
        name="create-happicard",
    ),
    path(
        "happicard/<int:pk>/",
        views.HappicardDetail.as_view(),
        name="happicard-detail",
    ),
]