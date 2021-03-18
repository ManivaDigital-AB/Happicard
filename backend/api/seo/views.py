from rest_framework.response import Response
from rest_framework import permissions, status, generics

from .serializers import SEOSerializer
from .models import SEO


class SEOListView(generics.ListAPIView):
    permission_classes = (permissions.AllowAny,)
    authentication_classes = ()
    queryset = SEO.objects.all()
    serializer_class = SEOSerializer


class SEOCreateView(generics.CreateAPIView):
    permission_classes = (permissions.AllowAny,)
    serializer_class = SEOSerializer

    def post(self, request):
        seo = request.data
        serializer = self.serializer_class(data=seo)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class SEODetailView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = (permissions.AllowAny,)
    authentication_classes = ()
    queryset = SEO.objects.all()
    serializer_class = SEOSerializer