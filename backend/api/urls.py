from django.urls import path, include

app_name = "api"
urlpatterns = [
    path("auth/", include("backend.api.authentification.urls"), name="auth"),
    path("orders/", include("backend.api.orders.urls"), name="orders"),
    path("payments/", include("backend.api.payments.urls"), name="payments"),
    path("profiles/", include("backend.api.profiles.urls"), name="profiles"),
]