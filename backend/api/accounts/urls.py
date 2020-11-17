from django.urls import path
from rest_framework_simplejwt import views as jwt_views
from . import views

app_name = "accounts"
urlpatterns = [
    path("create/", views.UserCreate.as_view(), name="create-user"),
    path("remove/", views.UserDestroy.as_view(), name="remove-user"),
    path("list/", views.UserList.as_view(), name="list-user"),
    path("detail/<int:pk>/", views.UserDetail.as_view(), name="detail-user"),
    path("protected/", views.Protected.as_view(), name="protected-user"),
    path("register/", views.UserRegistration.as_view(), name="register-user"),
    path("login/", views.UserLogin.as_view(), name="login-user"),
    path("email-verify/", views.VerifyEmail.as_view(), name="email-verify"),
]
