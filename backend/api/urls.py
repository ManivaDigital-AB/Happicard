from django.urls import path, include

app_name = "api"
urlpatterns = [
    path("accounts/", include("backend.api.accounts.urls"), name="accounts"),
    path("orders/", include("backend.api.orders.urls"), name="orders"),
    path("payments/", include("backend.api.payments.urls"), name="payments"),
]