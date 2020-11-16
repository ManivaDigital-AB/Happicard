from django.shortcuts import render
from rest_framework import permissions
from rest_framework.generics import CreateAPIView, DestroyAPIView
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import AccountSerializer


class AccountCreate(CreateAPIView):
    permission_classes = (permissions.AllowAny,)
    authentication_classes = ()
    serializer_class = AccountSerializer


class AccountDestroy(DestroyAPIView):
    permission_classes = (permissions.AllowAny,)
    authentication_classes = ()
    serializer_class = AccountSerializer


class Protected(APIView):
    def get(self, request):
        return Response(data={"type": "protected"})