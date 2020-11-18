from django.shortcuts import render
from rest_framework import permissions
from rest_framework import generics
from rest_framework.response import Response
from rest_framework.views import APIView

from .serializers import PaymentSerializer
from .models import Payment


class PaymentList(generics.ListAPIView):
    permission_classes = (permissions.AllowAny,)
    authentication_classes = ()
    queryset = Payment.objects.all()
    serializer_class = PaymentSerializer


class PaymentDetail(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = (permissions.AllowAny,)
    authentication_classes = ()
    queryset = Payment.objects.all()
    serializer_class = PaymentSerializer


class Protected(APIView):
    def get(self, request):
        return Response(data={"type": "protected"})