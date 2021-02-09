from django.urls import path
from . import views

app_name = "promos"
urlpatterns = [
    path(
        "list/promos/",
        views.PromoListView.as_view(),
        name="list-promos",
    ),
    path(
        "create/promo/",
        views.PromoCreateView.as_view(),
        name="create-promo",
    ),
]