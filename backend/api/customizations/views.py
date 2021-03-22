from rest_framework.response import Response
from rest_framework import permissions, status, generics

from .serializers import (
    HomePageSerializer,
    FooterSerializer,
    AboutPageSerializer,
    PartnersPageSerializer,
    StorePageSerializer,
    NGOPageSerializer,
)
from .models import (
    HomePage,
    Footer,
    AboutPage,
    PartnersPage,
    StorePage,
    NGOPage,
)


class HomePageListView(generics.ListAPIView):
    permission_classes = (permissions.AllowAny,)
    authentication_classes = ()
    queryset = HomePage.objects.all()
    serializer_class = HomePageSerializer


class FooterListView(generics.ListAPIView):
    permission_classes = (permissions.AllowAny,)
    authentication_classes = ()
    queryset = Footer.objects.all()
    serializer_class = FooterSerializer


class AboutPageListView(generics.ListAPIView):
    permission_classes = (permissions.AllowAny,)
    authentication_classes = ()
    queryset = AboutPage.objects.all()
    serializer_class = AboutPageSerializer


class PartnersPageListView(generics.ListAPIView):
    permission_classes = (permissions.AllowAny,)
    authentication_classes = ()
    queryset = PartnersPage.objects.all()
    serializer_class = PartnersPageSerializer


class StorePageListView(generics.ListAPIView):
    permission_classes = (permissions.AllowAny,)
    authentication_classes = ()
    queryset = StorePage.objects.all()
    serializer_class = StorePageSerializer


class NGOPageListView(generics.ListAPIView):
    permission_classes = (permissions.AllowAny,)
    authentication_classes = ()
    queryset = NGOPage.objects.all()
    serializer_class = NGOPageSerializer