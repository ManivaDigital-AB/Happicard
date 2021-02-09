from django.urls import path
from . import views

app_name = "items"
urlpatterns = [
    path(
        "list/giftcards/",
        views.GiftCardListView.as_view(),
        name="list-giftcards",
    ),
    path(
        "list/giftcard/offers/",
        views.GiftCardOfferListView.as_view(),
        name="list-giftcardoffers",
    ),
    path(
        "list/campaigns/",
        views.CampaignListView.as_view(),
        name="list-campaigns",
    ),
    path(
        "create/giftcard/",
        views.GiftCardCreateView.as_view(),
        name="create-giftcard",
    ),
    path(
        "create/campaign/",
        views.CampaignCreateView.as_view(),
        name="create-campaign",
    ),
    path(
        "giftcard/<int:pk>/",
        views.GiftCardDetailView.as_view(),
        name="giftcard-detail",
    ),
    path(
        "campaign/<int:pk>/",
        views.CampaignDetailView.as_view(),
        name="campaign-detail",
    ),
]