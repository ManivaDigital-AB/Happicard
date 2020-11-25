from django.urls import path
from django.conf.urls import url, include
from rest_framework_simplejwt import views as jwt_views
from . import views

app_name = "auth"
urlpatterns = [
    path("list/", views.UserList.as_view(), name="list-account"),
    path("account/<int:pk>/", views.UserDetail.as_view(), name="account"),
    path("register/", views.UserRegistration.as_view(), name="register"),
    path("email-verify/", views.VerifyEmail.as_view(), name="email-verify"),
    path("token/", jwt_views.TokenObtainPairView.as_view(), name="token-obtain-pair"),
    path("token/refresh/", jwt_views.TokenRefreshView.as_view(), name="token-refresh"),
    path("login/", views.UserLogin.as_view(), name="login"),
    path("logout/", views.UserLogout.as_view(), name="logout"),
    path(
        "password-reset/",
        include("django_rest_passwordreset.urls", namespace="password-reset"),
    ),
]
