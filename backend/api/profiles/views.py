from django.shortcuts import render
from rest_framework import permissions, status, generics
from rest_framework import filters, viewsets
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser, FormParser

from .serializers import ProfileSerializer
from .models import Profile


class ProfileList(generics.ListAPIView):
    permission_classes = (permissions.IsAuthenticated,)
    authentication_classes = ()
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer


class ProfileDetail(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = (permissions.IsAuthenticated,)
    authentication_classes = ()
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer


class ProfileCreate(generics.CreateAPIView):
    permission_classes = (permissions.IsAuthenticated,)
    parser_classes = (MultiPartParser, FormParser)
    serializer_class = ProfileSerializer

    def post(self, request, format=None):
        prof = request.data
        serializer = self.serializer_class(data=prof)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
