from django.shortcuts import render
from rest_framework import permissions
from rest_framework import generics
from rest_framework.response import Response
from rest_framework.views import APIView

from .serializers import ProfileSerializer
from .models import Profile


class ProfileList(generics.ListAPIView):
    permission_classes = (permissions.AllowAny,)
    authentication_classes = ()
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer


class ProfileDetail(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = (permissions.AllowAny,)
    authentication_classes = ()
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer


class Protected(APIView):
    def get(self, request):
        return Response(data={"type": "protected"})