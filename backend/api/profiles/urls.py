from django.urls import path, re_path
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
        "store/<uuid:pk>/",
        views.StoreDetailView.as_view(),
        name="store-detail",
    ),
    path(
        "ngo/<uuid:pk>/",
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
    re_path(
        "search/(?P<title>.+)/$",
        views.StoreSearchView.as_view(),
        name="search-stores",
    ),
]