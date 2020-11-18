from django.urls import path
from rest_framework_simplejwt import views as jwt_views
from . import views

app_name = "payments"
urlpatterns = [
    path("list/", views.PaymentList.as_view(), name="list-payment"),
    path("detail/<int:pk>/", views.PaymentDetail.as_view(), name="detail-payment"),
    path("protected/", views.Protected.as_view(), name="protected-payment"),
]