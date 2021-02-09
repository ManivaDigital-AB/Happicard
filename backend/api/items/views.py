from django.conf import settings
from requests.auth import HTTPBasicAuth
from rest_framework import permissions, status
from rest_framework import generics
from rest_framework.response import Response
import requests

from .models import GiftCard, Campaign
from .serializers import (
    GiftCardSerializer,
    CampaignSerializer,
)


class GiftCardListView(generics.ListAPIView):
    permission_classes = (permissions.AllowAny,)
    authentification_classes = ()
    queryset = GiftCard.objects.filter(has_offer=False).all()
    serializer_class = GiftCardSerializer


class GiftCardOfferListView(generics.ListAPIView):
    permission_classes = (permissions.AllowAny,)
    authentification_classes = ()
    queryset = GiftCard.objects.filter(has_offer=True).all()
    serializer_class = GiftCardSerializer


class CampaignListView(generics.ListAPIView):
    permission_classes = (permissions.AllowAny,)
    authentification_classes = ()
    queryset = Campaign.objects.all()
    serializer_class = CampaignSerializer


class GiftCardCreateView(generics.CreateAPIView):
    permission_classes = (permissions.AllowAny,)
    serializer_class = GiftCardSerializer

    def post(self, request):
        product = request.data
        serializer = self.serializer_class(data=product)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CampaignCreateView(generics.CreateAPIView):
    permission_classes = (permissions.AllowAny,)
    serializer_class = CampaignSerializer

    def post(self, request):
        product = request.data
        serializer = self.serializer_class(data=product)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class GiftCardDetailView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = (permissions.AllowAny,)
    authentication_classes = ()
    queryset = GiftCard.objects.all()
    serializer_class = GiftCardSerializer


class CampaignDetailView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = (permissions.AllowAny,)
    authentication_classes = ()
    queryset = Campaign.objects.all()
    serializer_class = CampaignSerializer