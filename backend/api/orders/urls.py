from django.urls import path
from . import views

app_name = "orders"
urlpatterns = [
    path(
        "order-management/",
        views.KlarnaOrderManagement.as_view(),
        name="order-management",
    ),
    path("checkout/", views.KlarnaCheckout.as_view(), name="checkout"),
]