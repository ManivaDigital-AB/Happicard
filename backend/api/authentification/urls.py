from django.urls import path
from django.conf.urls import url, include
from rest_framework_simplejwt import views as jwt_views
from . import views

app_name = "auth"
urlpatterns = [
    path("newsletter/", views.Newsletter.as_view(), name="email-newsletter"),
    path("customer/count/", views.CustomerCount.as_view(), name="count-customer"),
    path("customer/list/", views.CustomerList.as_view(), name="list-customer"),
    path("customer/<int:pk>/", views.CustomerDetail.as_view(), name="customer"),
    path(
        "register/customer/",
        views.CustomerRegistration.as_view(),
        name="vendor-register",
    ),
    path(
        "customer-verify/",
        views.CustomerEmailVerification.as_view(),
        name="customer-register",
    ),
    path("subscriber/count/", views.SubscriberCount.as_view(), name="count-subscriber"),
    path("subscriber/list/", views.SubscriberList.as_view(), name="list-subscriber"),
    path("subscriber/<int:pk>/", views.SubscriberDetail.as_view(), name="subscriber"),
    path("vendor/count/", views.VendorCount.as_view(), name="count-vendor"),
    path(
        "pending-vendor/list/",
        views.PendingVendorList.as_view(),
        name="list-pending-vendor",
    ),
    path("vendor/list/", views.VendorList.as_view(), name="list-vendor"),
    path("vendor/<int:pk>/", views.VendorDetail.as_view(), name="vendor"),
    path(
        "register/vendor/", views.VendorRegistration.as_view(), name="vendor-register"
    ),
    path(
        "vendor-verify/",
        views.VendorCMSVerification.as_view(),
        name="vendor-verify",
    ),
    path("token/", jwt_views.TokenObtainPairView.as_view(), name="token-obtain-pair"),
    path("token/refresh/", jwt_views.TokenRefreshView.as_view(), name="token-refresh"),
    path("login/customer/", views.CustomerLogin.as_view(), name="login-customer"),
    path("login/vendor/", views.VendorLogin.as_view(), name="login-vendor"),
    path("logout/", views.UserLogout.as_view(), name="logout"),
    path(
        "password-reset/",
        include("django_rest_passwordreset.urls", namespace="password-reset"),
    ),
    path("contact/", views.ContactForm.as_view(), name="contact"),
]
