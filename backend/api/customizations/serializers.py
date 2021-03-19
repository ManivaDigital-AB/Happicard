from rest_framework import serializers
from .models import (
    HomePage,
    Footer,
    AboutPage,
    PartnersPage,
    StorePage,
    NGOPage,
)


class HomePageSerializer(serializers.ModelSerializer):
    class Meta:
        model = HomePage
        fields = (
            "id",
            "home_page_carousel_img_1",
            "home_page_carousel_img_2",
            "home_page_carousel_img_3",
            "home_page_giftcards_img",
            "home_page_happioffers_img",
            "home_page_campaigns_img",
        )


class FooterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Footer
        fields = (
            "id",
            "footer_subscription_details",
            "social_media",
        )
        depth = 2


class AboutPageSerializer(serializers.ModelSerializer):
    class Meta:
        model = AboutPage
        fields = (
            "id",
            "about_page_title",
            "about_page_title_img",
            "about_page_paragraph_top",
            "about_page_paragraph_bottom",
            "about_page_process_main_title",
            "about_page_process_title_1",
            "about_page_process_paragraph_1",
            "about_page_process_title_2",
            "about_page_process_paragraph_2",
            "about_page_process_title_3",
            "about_page_process_paragraph_3",
            "contact_title",
            "contact_address",
            "contact_number",
            "contact_email",
        )


class PartnersPageSerializer(serializers.ModelSerializer):
    class Meta:
        model = PartnersPage
        fields = (
            "id",
            "partners_page_title",
            "partners_page_img",
            "partners_page_banner",
            "partners_page_paragraph",
        )


class StorePageSerializer(serializers.ModelSerializer):
    class Meta:
        model = StorePage
        fields = (
            "id",
            "main_store_banner_1",
            "main_store_banner_2",
            "main_store_banner_3",
        )


class NGOPageSerializer(serializers.ModelSerializer):
    class Meta:
        model = NGOPage
        fields = (
            "id",
            "main_ngo_banner_1",
            "main_ngo_banner_2",
            "main_ngo_banner_3",
        )