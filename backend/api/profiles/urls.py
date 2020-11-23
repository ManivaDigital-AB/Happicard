from django.urls import path
from rest_framework_simplejwt import views as jwt_views
from . import views

app_name = "profiles"
urlpatterns = [
    path("list/", views.ProfileList.as_view(), name="list-profile"),
    path("detail/<int:pk>/", views.ProfileDetail.as_view(), name="detail-profile"),
    path("create/", views.ProfileCreate.as_view(), name="create-profile"),
]