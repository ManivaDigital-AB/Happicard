from django.urls import path
from . import views

app_name = "products"
urlpatterns = [
    path("giftcard/list/", views.GiftCardList.as_view(), name="giftcards"),
    path(
        "giftcard/offers/list/",
        views.GiftCardOffersList.as_view(),
        name="giftcardoffers",
    ),
    path("campaign/list/", views.CampaignList.as_view(), name="campaigns"),
    path("create/giftcard/", views.GiftCardCreate.as_view(), name="create-giftcard"),
    path("giftcard/<int:pk>/", views.GiftCardDetail.as_view(), name="giftcard-detail"),
    path("create/campaign/", views.CampaignCreate.as_view(), name="create-campaign"),
    path("campaign/<int:pk>/", views.CampaignDetail.as_view(), name="campaign-detail"),
]