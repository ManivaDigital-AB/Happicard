from django.urls import path
from rest_framework_simplejwt import views as jwt_views
from . import views

app_name = "accounts"
urlpatterns = [
    path("create/", views.AccountCreate.as_view(), name="create-account"),
    path("remove/", views.AccountDestroy.as_view(), name="remove-account"),
    path(
        "token/obtain/",
        jwt_views.TokenObtainPairView.as_view(),
        name="token-create-account",
    ),
    path(
        "token/refresh/",
        jwt_views.TokenRefreshView.as_view(),
        name="token-refresh-account",
    ),
    path("protected/", views.Protected.as_view(), name="protected-account"),
]