from django.shortcuts import render
from rest_framework import permissions, status, generics
from rest_framework.response import Response

from .serializers import PromoSerializer
from .models import Promo


class PromoListView(generics.ListAPIView):
    permission_classes = (permissions.AllowAny,)
    authentication_classes = ()
    queryset = Promo.objects.all()
    serializer_class = PromoSerializer


class PromoCreateView(generics.CreateAPIView):
    permission_classes = (permissions.AllowAny,)
    serializer_class = PromoSerializer

    def post(self, request):
        promo = request.data
        serializer = self.serializer_class(data=promo)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)