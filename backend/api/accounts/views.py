from django.shortcuts import render
from rest_framework import permissions, status
from rest_framework import generics
from rest_framework.response import Response
from rest_framework.views import APIView
from django.conf import settings
import jwt

from .serializers import (
    CustomUserSerializer,
    CustomRegisterSerializer,
    LoginSerializer,
    EmailVerificationSerializer,
)
from .models import CustomUser


class UserCreate(generics.CreateAPIView):
    permission_classes = (permissions.AllowAny,)
    authentication_classes = ()
    serializer_class = CustomUserSerializer


class UserDestroy(generics.DestroyAPIView):
    permission_classes = (permissions.AllowAny,)
    authentication_classes = ()
    serializer_class = CustomUserSerializer


class UserList(generics.ListAPIView):
    permission_classes = (permissions.AllowAny,)
    authentication_classes = ()
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer


class UserDetail(generics.RetrieveAPIView):
    permission_classes = (permissions.AllowAny,)
    authentication_classes = ()
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer


class Protected(APIView):
    def get(self, request):
        return Response(data={"type": "protected"})


class UserLogin(generics.GenericAPIView):
    serializer_class = LoginSerializer

    def post(self, request):
        serializer = self.serializer_class(data=request)
        serializer.is_valid(raise_exception=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class UserRegistration(APIView):
    def post(self, request):
        serializer = CustomRegisterSerializer(data=request.data)
        data = {}
        if serializer.is_valid():
            account = serializer.save()
            data["response"] = "Successfully registered a new user"
            data["email"] = account.email
            data["username"] = account.username
        else:
            data = serializer.errors
        return Response(data)


class VerifyEmail(generics.GenericAPIView):
    serializer_class = EmailVerificationSerializer

    def get(self, request):
        token = request.GET.get("token")
        try:
            payload = jwt.decode(token, settings.SECRET_KEY)
            user = User.get.objects.get(id=payload["user_id"])
            if not user.is_verified:
                user.save()
            return Response(
                {"email": "Successfully Activated"}, status=status.HTTP_200_OK
            )
        except jwt.ExpiredSignatureError as identifier:
            return Response(
                {"error": "Activation Expired"}, status=status.HTTP_400_BAD_REQUEST
            )
        except jwt.ExpiredSignatureError as identifier:
            return Response(
                {"error": "Invalid Token"}, status=status.HTTP_400_BAD_REQUEST
            )
