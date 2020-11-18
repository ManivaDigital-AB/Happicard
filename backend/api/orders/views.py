from django.shortcuts import render
from rest_framework import permissions
from rest_framework import generics
from rest_framework.response import Response
from rest_framework.views import APIView

from .serializers import OrderSerializer
from .models import Order


class OrderList(generics.ListAPIView):
    permission_classes = (permissions.AllowAny,)
    authentication_classes = ()
    queryset = Order.objects.all()
    serializer_class = OrderSerializer


class OrderDetail(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = (permissions.AllowAny,)
    authentication_classes = ()
    queryset = Order.objects.all()
    serializer_class = OrderSerializer


class Protected(APIView):
    def get(self, request):
        return Response(data={"type": "protected"})