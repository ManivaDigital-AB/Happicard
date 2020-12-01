from django.urls import path
from django.conf.urls import url, include
from rest_framework_simplejwt import views as jwt_views
from . import views

app_name = "auth"
urlpatterns = [
    path("newsletter/", views.Newsletter.as_view(), name="email-newsletter"),
    path("vendor/list/", views.VendorList.as_view(), name="list-account"),
    path("vendor/<int:pk>/", views.VendorDetail.as_view(), name="account"),
    path(
        "register/vendor/", views.VendorRegistration.as_view(), name="vendor-register"
    ),
    path("token/", jwt_views.TokenObtainPairView.as_view(), name="token-obtain-pair"),
    path("token/refresh/", jwt_views.TokenRefreshView.as_view(), name="token-refresh"),
    path("login/vendor/", views.VendorLogin.as_view(), name="login-vendor"),
    path("logout/", views.UserLogout.as_view(), name="logout"),
    path(
        "password-reset/",
        include("django_rest_passwordreset.urls", namespace="password-reset"),
    ),
    path("contact/", views.ContactView.as_view(), name="contact"),
]
