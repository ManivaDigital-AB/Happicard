from django.urls import path
from rest_framework_simplejwt import views as jwt_views
from . import views

app_name = "orders"
urlpatterns = [
    path("list/", views.OrderList.as_view(), name="list-order"),
    path("detail/<int:pk>/", views.OrderDetail.as_view(), name="detail-order"),
    path("protected/", views.Protected.as_view(), name="protected-order"),
]