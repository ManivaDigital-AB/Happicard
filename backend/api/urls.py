from django.urls import path, include

app_name = "api"
urlpatterns = [
    path(
        "accounts/",
        include("backend.api.accounts.urls"),
        name="accounts",
    ),
    path(
        "orders/",
        include("backend.api.orders.urls"),
        name="orders",
    ),
    path(
        "items/",
        include("backend.api.items.urls"),
        name="items",
    ),
    path(
        "profiles/",
        include("backend.api.profiles.urls"),
        name="profiles",
    ),
    path(
        "promotionals/",
        include("backend.api.promotionals.urls"),
        name="promotionals",
    ),
]