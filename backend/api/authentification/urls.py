from django.urls import path
from rest_framework_simplejwt import views as jwt_views
from . import views

app_name = "auth"
urlpatterns = [
    path("list/", views.UserList.as_view(), name="list-account"),
    path("account/<int:pk>/", views.UserDetail.as_view(), name="account"),
    path("register/", views.UserRegistration.as_view(), name="register"),
    path("email-verify/", views.VerifyEmail.as_view(), name="email-verify"),
    path("token/refresh/", jwt_views.TokenRefreshView.as_view(), name="token_refresh"),
    path(
        "password-email-reset/",
        views.RequestPasswordResetEmail.as_view(),
        name="password-email-reset",
    ),
    path(
        "password-reset/<uidb64>/<token>/",
        views.PasswordTokenCheck.as_view(),
        name="password-reset-confirm",
    ),
    path(
        "password-reset-complete/",
        views.SetNewPassword.as_view(),
        name="password-reset-complete",
    ),
    path("login/", views.UserLogin.as_view(), name="login"),
    path("logout/", views.UserLogout.as_view(), name="logout"),
]
