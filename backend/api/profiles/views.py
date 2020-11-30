from django.shortcuts import render
from rest_framework import permissions, status, generics
from rest_framework import filters, viewsets
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser, FormParser

from .serializers import StoreSerializer, NGOSerializer
from .models import Store, NGO


class StoreList(generics.ListAPIView):
    permission_classes = (permissions.AllowAny,)
    authentication_classes = ()
    queryset = Store.objects.all()
    serializer_class = StoreSerializer


class NGOList(generics.ListAPIView):
    permission_classes = (permissions.AllowAny,)
    authentication_classes = ()
    queryset = NGO.objects.all()
    serializer_class = NGOSerializer


class StoreDetail(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = (permissions.AllowAny,)
    authentication_classes = ()
    queryset = Store.objects.all()
    serializer_class = StoreSerializer


class NGODetail(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = (permissions.AllowAny,)
    authentication_classes = ()
    queryset = NGO.objects.all()
    serializer_class = NGOSerializer


class StoreCreate(generics.CreateAPIView):
    permission_classes = (permissions.AllowAny,)
    parser_classes = (MultiPartParser, FormParser)
    serializer_class = StoreSerializer

    def post(self, request, format=None):
        prof = request.data
        serializer = self.serializer_class(data=prof)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class NGOCreate(generics.CreateAPIView):
    permission_classes = (permissions.AllowAny,)
    parser_classes = (MultiPartParser, FormParser)
    serializer_class = NGOSerializer

    def post(self, request, format=None):
        prof = request.data
        serializer = self.serializer_class(data=prof)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)