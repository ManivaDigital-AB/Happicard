from django.urls import path
from rest_framework_simplejwt import views as jwt_views
from . import views

app_name = "orders"
urlpatterns = [
    path("create/", views.OrderCreate.as_view(), name="create-order"),
    path("remove/", views.OrderDestroy.as_view(), name="remove-order"),
    path("protected/", views.Protected.as_view(), name="protected-order"),
]