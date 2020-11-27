from django.urls import path
from rest_framework_simplejwt import views as jwt_views
from . import views

app_name = "orders"
urlpatterns = [
    path("list/", views.OrderList.as_view(), name="list-order"),
    path("detail/<int:pk>/", views.OrderDetail.as_view(), name="detail-order"),
    path("order-summary/", views.OrderSummary.as_view(), name="order-summary"),
    path(
        "create-klarna-order/",
        views.CreateKlarnaOrder.as_view(),
        name="order-klarna-register",
    ),
    path("read-cart", views.view_cart, name="read-cart"),
    path("add/<item_id>", views.add_to_cart, name="add-to-cart"),
    path("update-cart/<item_id>", views.update_cart, name="update-cart"),
    path("delete-from-cart/<item_id>", views.delete_from_cart, name="delete-from-cart"),
]