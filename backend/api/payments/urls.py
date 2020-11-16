from django.urls import path
from rest_framework_simplejwt import views as jwt_views
from . import views

app_name = "payments"
urlpatterns = [
    path("create/", views.PaymentCreate.as_view(), name="create-payment"),
    path("remove/", views.PaymentDestroy.as_view(), name="remove-payment"),
    path(
        "token/obtain/",
        jwt_views.TokenObtainPairView.as_view(),
        name="token-create-payment",
    ),
    path(
        "token/refresh/",
        jwt_views.TokenRefreshView.as_view(),
        name="token-refresh-payment",
    ),
    path("protected/", views.Protected.as_view(), name="protected-payment"),
]