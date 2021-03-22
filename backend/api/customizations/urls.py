from django.urls import path
from . import views

app_name = "customizations"
urlpatterns = [
    path(
        "list/homepage/",
        views.HomePageListView.as_view(),
        name="list-homepage",
    ),
    path(
        "list/footer/",
        views.FooterListView.as_view(),
        name="list-footer",
    ),
    path(
        "list/aboutpage/",
        views.AboutPageListView.as_view(),
        name="list-aboutpage",
    ),
    path(
        "list/partnerspage/",
        views.PartnersPageListView.as_view(),
        name="list-partnerspage",
    ),
    path(
        "list/storepage/",
        views.StorePageListView.as_view(),
        name="list-storepage",
    ),
    path(
        "list/ngopage/",
        views.NGOPageListView.as_view(),
        name="list-ngopage",
    ),
]