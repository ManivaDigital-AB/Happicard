from rest_framework import permissions, status, generics
from rest_framework.response import Response

from .serializers import StoreSerializer, NGOSerializer
from .models import Store, NGO


class StoreListView(generics.ListAPIView):
    permission_classes = (permissions.AllowAny,)
    authentication_classes = ()
    serializer_class = StoreSerializer
    queryset = ""

    def get(self, request):
        queryset = [
            {
                "id": b.id,
                "title": b.title,
                "about": b.about,
                "banner_image": b.banner_image.url,
                "header_image": b.header_image.url,
                "store_category": b.store_category,
                "giftcards": [
                    {
                        "giftcard_id": a.id,
                        "giftcard_title": a.title,
                        "price_option_1": a.price_option_1,
                        "price_option_2": a.price_option_2,
                        "price_option_3": a.price_option_3,
                        "rebate_code_1": a.rebate_code_1,
                        "rebate_code_2": a.rebate_code_2,
                        "rebate_code_3": a.rebate_code_3,
                        "giftcard_image": a.image.url,
                        "giftcard_description": a.description,
                        "giftcard_has_offer": a.has_offer,
                        "giftcard_discount_price": a.discount_price,
                        "giftcard_store_category": a.store_category,
                    }
                    for a in b.giftcards.all()
                ],
            }
            for b in Store.objects.prefetch_related("giftcards")
        ]
        return Response(queryset)


class NGOListView(generics.GenericAPIView):
    permission_classes = (permissions.AllowAny,)
    authentication_classes = ()
    serializer_class = NGOSerializer
    queryset = ""

    def get(self, request):
        queryset = [
            {
                "id": b.id,
                "title": b.title,
                "about": b.about,
                "banner_image": b.banner_image.url,
                "header_image": b.header_image.url,
                "ngo_category": b.ngo_category,
                "campaigns": [
                    {
                        "campaign_id": a.id,
                        "campaign_title": a.title,
                        "price_option_1": a.price_option_1,
                        "price_option_2": a.price_option_2,
                        "price_option_3": a.price_option_3,
                        "rebate_code_1": a.rebate_code_1,
                        "rebate_code_2": a.rebate_code_2,
                        "rebate_code_3": a.rebate_code_3,
                        "campaign_image": a.image.url,
                        "campaign_description": a.description,
                        "campaign_ngo_category": a.ngo_category,
                    }
                    for a in b.campaigns.all()
                ],
            }
            for b in NGO.objects.prefetch_related("campaigns")
        ]
        return Response(queryset)


class StoreDetailView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = (permissions.AllowAny,)
    authentication_classes = ()
    queryset = Store.objects.all()
    serializer_class = StoreSerializer


class NGODetailView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = (permissions.AllowAny,)
    authentication_classes = ()
    queryset = NGO.objects.all()
    serializer_class = NGOSerializer


class StoreCreateView(generics.CreateAPIView):
    permission_classes = (permissions.AllowAny,)
    serializer_class = StoreSerializer

    def post(self, request):
        prof = request.data
        serializer = self.serializer_class(data=prof)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class NGOCreateView(generics.CreateAPIView):
    permission_classes = (permissions.AllowAny,)
    serializer_class = NGOSerializer

    def post(self, request):
        prof = request.data
        serializer = self.serializer_class(data=prof)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class StoreSearchView(generics.ListAPIView):
    permission_classes = (permissions.AllowAny,)
    authentication_classes = ()
    serializer_class = StoreSerializer

    def get_queryset(self):
        try:
            title = self.kwargs["title"]
            return Store.objects.filter(title=title)
        except:
            return Response("Store does not exist in the database.")