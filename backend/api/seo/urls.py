from django.urls import path
from . import views

app_name = "seo"
urlpatterns = [
    path(
        "list/",
        views.SEOListView.as_view(),
        name="list-seo",
    ),
    path(
        "create/",
        views.SEOCreateView.as_view(),
        name="create-seo",
    ),
    path(
        "detail/",
        views.SEODetailView.as_view(),
        name="detail-seo",
    ),
]