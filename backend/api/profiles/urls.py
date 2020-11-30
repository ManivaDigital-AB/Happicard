from django.urls import path
from rest_framework_simplejwt import views as jwt_views
from . import views

app_name = "profiles"
urlpatterns = [
    path("list/store/", views.StoreList.as_view(), name="list-store"),
    path("list/ngo/", views.NGOList.as_view(), name="list-ngo"),
    path("store/<int:pk>/", views.StoreDetail.as_view(), name="detail-store"),
    path("ngo/<int:pk>/", views.NGODetail.as_view(), name="detail-ngo"),
    path("create/store/", views.StoreCreate.as_view(), name="create-store"),
    path("create/ngo/", views.NGOCreate.as_view(), name="create-ngo"),
]