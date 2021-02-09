from django.urls import path
from rest_framework_simplejwt import views as jwt_views
from . import views

app_name = "profiles"
urlpatterns = [
    path(
        "list/stores/",
        views.StoreListView.as_view(),
        name="list-stores",
    ),
    path(
        "list/ngos/",
        views.NGOListView.as_view(),
        name="list-ngos",
    ),
    path(
        "store/<int:pk>/",
        views.StoreDetailView.as_view(),
        name="store-detail",
    ),
    path(
        "ngo/<int:pk>/",
        views.NGODetailView.as_view(),
        name="ngo-detail",
    ),
    path(
        "create/store/",
        views.StoreCreateView.as_view(),
        name="create-store",
    ),
    path(
        "create/ngo/",
        views.NGOCreateView.as_view(),
        name="create-ngo",
    ),
]