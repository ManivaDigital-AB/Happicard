from django.urls import path
from rest_framework_simplejwt import views as jwt_views
from . import views

app_name = "orders"
urlpatterns = [
    path("list/", views.OrderList.as_view(), name="list-order"),
    path("detail/<int:pk>/", views.OrderDetail.as_view(), name="detail-order"),
    path("order-summary/", views.OrderSummary.as_view(), name="order-summary"),
    path("add-to-cart/<slug>/", views.add_to_cart, name="add-to-cart"),
    path("remove-from-cart/<slug>/", views.remove_from_cart, name="remove-from-cart"),
    path(
        "remove-card-from-cart/<slug>/",
        views.remove_single_item_from_cart,
        name="remove-single-card-from-cart",
    ),
    path("payment/<payment_option>/", views.PaymentProcess.as_view(), name="payment"),
]