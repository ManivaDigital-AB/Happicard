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


class HomePageCreateView(generics.CreateAPIView):
    permission_classes = (permissions.AllowAny,)
    serializer_class = HomePageSerializer

    def post(self, request):
        page = request.data
        serializer = self.serializer_class(data=page)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class HomePageDetailView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = (permissions.AllowAny,)
    authentication_classes = ()
    queryset = HomePage.objects.all()
    serializer_class = HomePageSerializer


class FooterListView(generics.ListAPIView):
    permission_classes = (permissions.AllowAny,)
    authentication_classes = ()
    queryset = Footer.objects.all()
    serializer_class = FooterSerializer


class FooterCreateView(generics.CreateAPIView):
    permission_classes = (permissions.AllowAny,)
    serializer_class = FooterSerializer

    def post(self, request):
        footer = request.data
        serializer = self.serializer_class(data=footer)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class FooterDetailView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = (permissions.AllowAny,)
    authentication_classes = ()
    queryset = Footer.objects.all()
    serializer_class = FooterSerializer


class AboutPageListView(generics.ListAPIView):
    permission_classes = (permissions.AllowAny,)
    authentication_classes = ()
    queryset = AboutPage.objects.all()
    serializer_class = AboutPageSerializer


class AboutPageCreateView(generics.CreateAPIView):
    permission_classes = (permissions.AllowAny,)
    serializer_class = AboutPageSerializer

    def post(self, request):
        page = request.data
        serializer = self.serializer_class(data=page)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class AboutPageDetailView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = (permissions.AllowAny,)
    authentication_classes = ()
    queryset = AboutPage.objects.all()
    serializer_class = AboutPageSerializer


class PartnersPageListView(generics.ListAPIView):
    permission_classes = (permissions.AllowAny,)
    authentication_classes = ()
    queryset = PartnersPage.objects.all()
    serializer_class = PartnersPageSerializer


class PartnersPageCreateView(generics.CreateAPIView):
    permission_classes = (permissions.AllowAny,)
    serializer_class = PartnersPageSerializer

    def post(self, request):
        page = request.data
        serializer = self.serializer_class(data=page)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class PartnersPageDetailView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = (permissions.AllowAny,)
    authentication_classes = ()
    queryset = PartnersPage.objects.all()
    serializer_class = PartnersPageSerializer


class StorePageListView(generics.ListAPIView):
    permission_classes = (permissions.AllowAny,)
    authentication_classes = ()
    queryset = StorePage.objects.all()
    serializer_class = StorePageSerializer


class StorePageCreateView(generics.CreateAPIView):
    permission_classes = (permissions.AllowAny,)
    serializer_class = StorePageSerializer

    def post(self, request):
        page = request.data
        serializer = self.serializer_class(data=page)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class StorePageDetailView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = (permissions.AllowAny,)
    authentication_classes = ()
    queryset = StorePage.objects.all()
    serializer_class = StorePageSerializer


class NGOPageListView(generics.ListAPIView):
    permission_classes = (permissions.AllowAny,)
    authentication_classes = ()
    queryset = NGOPage.objects.all()
    serializer_class = NGOPageSerializer


class NGOPageCreateView(generics.CreateAPIView):
    permission_classes = (permissions.AllowAny,)
    serializer_class = NGOPageSerializer

    def post(self, request):
        page = request.data
        serializer = self.serializer_class(data=page)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class NGOPageDetailView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = (permissions.AllowAny,)
    authentication_classes = ()
    queryset = NGOPage.objects.all()
    serializer_class = NGOPageSerializer