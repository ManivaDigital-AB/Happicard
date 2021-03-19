from django.utils.translation import ugettext_lazy as _
from django.conf import settings
from django.db import models
from django.utils import timezone
import uuid


from backend.settings.storage_backends import CustomStorage

OPTIONS = (
    ("draft", "Draft"),
    ("published", "Published"),
)


class HomePage(models.Model):
    """
    Home Page Customization Model
    """

    class HomePageObjects(models.Manager):
        def get_queryset(self):
            return super().get_queryset().filter(status="published")

    class Meta:
        ordering = ("-published",)
        verbose_name = _("Home Page")
        verbose_name_plural = _("Home Page")

    id = models.UUIDField(
        default=uuid.uuid4,
        unique=True,
        db_index=True,
        editable=False,
        primary_key=True,
    )

    home_page_carousel_img_1 = models.FileField(storage=CustomStorage())
    home_page_carousel_img_2 = models.FileField(storage=CustomStorage())
    home_page_carousel_img_3 = models.FileField(storage=CustomStorage())

    home_page_giftcards_img = models.FileField(storage=CustomStorage())
    home_page_happioffers_img = models.FileField(storage=CustomStorage())
    home_page_campaigns_img = models.FileField(storage=CustomStorage())

    published = models.DateTimeField(default=timezone.now)
    author = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="+",
        null=True,
        blank=True,
    )
    status = models.CharField(max_length=10, choices=OPTIONS, default="published")

    def __str__(self):
        return "Home Page Customizations"


class SocialMedia(models.Model):
    class Meta:
        verbose_name = _("Social Media")
        verbose_name_plural = _("Social Media")

    name = models.CharField(max_length=20)
    icon = models.FileField(storage=CustomStorage())
    link = models.CharField(max_length=200, blank=True)

    def __str__(self):
        return self.name


class Footer(models.Model):
    """
    Footer Customization Model
    """

    class FooterObjects(models.Manager):
        def get_queryset(self):
            return super().get_queryset().filter(status="published")

    class Meta:
        ordering = ("-published",)
        verbose_name = _("Footer")
        verbose_name_plural = _("Footer")

    id = models.UUIDField(
        default=uuid.uuid4,
        unique=True,
        db_index=True,
        editable=False,
        primary_key=True,
    )

    footer_subscription_details = models.CharField(max_length=50)
    social_media = models.ManyToManyField(SocialMedia, blank=True)

    published = models.DateTimeField(default=timezone.now)
    author = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="+",
        null=True,
        blank=True,
    )
    status = models.CharField(max_length=10, choices=OPTIONS, default="published")

    def __str__(self):
        return "Footer Customizations"


class AboutPage(models.Model):
    """
    About Page Customization Model
    """

    class AboutPageObjects(models.Manager):
        def get_queryset(self):
            return super().get_queryset().filter(status="published")

    class Meta:
        ordering = ("-published",)
        verbose_name = _("About Page")
        verbose_name_plural = _("About Page")

    id = models.UUIDField(
        default=uuid.uuid4,
        unique=True,
        db_index=True,
        editable=False,
        primary_key=True,
    )

    about_page_title = models.CharField(max_length=50)
    about_page_title_img = models.FileField(storage=CustomStorage())

    about_page_paragraph_top = models.TextField(max_length=250)
    about_page_paragraph_bottom = models.TextField(max_length=250)

    about_page_process_main_title = models.CharField(max_length=50)
    about_page_process_title_1 = models.CharField(max_length=50)
    about_page_process_paragraph_1 = models.TextField(max_length=250)
    about_page_process_title_2 = models.CharField(max_length=50)
    about_page_process_paragraph_2 = models.TextField(max_length=250)
    about_page_process_title_3 = models.CharField(max_length=50)
    about_page_process_paragraph_3 = models.TextField(max_length=250)

    contact_title = models.CharField(max_length=50)
    contact_address = models.CharField(max_length=50)
    contact_number = models.CharField(max_length=50)
    contact_email = models.CharField(max_length=50)

    published = models.DateTimeField(default=timezone.now)
    author = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="+",
        null=True,
        blank=True,
    )
    status = models.CharField(max_length=10, choices=OPTIONS, default="published")

    def __str__(self):
        return "About Page Customizations"


class PartnersPage(models.Model):
    """
    Partners Page Customization Model
    """

    class PartnersPageObjects(models.Manager):
        def get_queryset(self):
            return super().get_queryset().filter(status="published")

    class Meta:
        ordering = ("-published",)
        verbose_name = _("Partners Page")
        verbose_name_plural = _("Partners Page")

    id = models.UUIDField(
        default=uuid.uuid4,
        unique=True,
        db_index=True,
        editable=False,
        primary_key=True,
    )

    partners_page_title = models.CharField(max_length=50)
    partners_page_img = models.FileField(storage=CustomStorage())
    partners_page_banner = models.FileField(storage=CustomStorage())
    partners_page_paragraph = models.TextField(max_length=500)

    published = models.DateTimeField(default=timezone.now)
    author = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="+",
        null=True,
        blank=True,
    )
    status = models.CharField(max_length=10, choices=OPTIONS, default="published")

    def __str__(self):
        return "Partner Page Customizations"


class StorePage(models.Model):
    """
    Store Page Customization Model
    """

    class StorePageObjects(models.Manager):
        def get_queryset(self):
            return super().get_queryset().filter(status="published")

    class Meta:
        ordering = ("-published",)
        verbose_name = _("Store Page")
        verbose_name_plural = _("Store Page")

    id = models.UUIDField(
        default=uuid.uuid4,
        unique=True,
        db_index=True,
        editable=False,
        primary_key=True,
    )

    main_store_banner_1 = models.FileField(storage=CustomStorage())
    main_store_banner_2 = models.FileField(storage=CustomStorage())
    main_store_banner_3 = models.FileField(storage=CustomStorage())

    published = models.DateTimeField(default=timezone.now)
    author = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="+",
        null=True,
        blank=True,
    )
    status = models.CharField(max_length=10, choices=OPTIONS, default="published")

    def __str__(self):
        return "Store Page Customizations"


class NGOPage(models.Model):
    """
    NGO Page Customization Model
    """

    class NGOPageObjects(models.Manager):
        def get_queryset(self):
            return super().get_queryset().filter(status="published")

    class Meta:
        ordering = ("-published",)
        verbose_name = _("NGO Page")
        verbose_name_plural = _("NGO Page")

    id = models.UUIDField(
        default=uuid.uuid4,
        unique=True,
        db_index=True,
        editable=False,
        primary_key=True,
    )

    main_ngo_banner_1 = models.FileField(storage=CustomStorage())
    main_ngo_banner_2 = models.FileField(storage=CustomStorage())
    main_ngo_banner_3 = models.FileField(storage=CustomStorage())

    published = models.DateTimeField(default=timezone.now)
    author = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="+",
        null=True,
        blank=True,
    )
    status = models.CharField(max_length=10, choices=OPTIONS, default="published")

    def __str__(self):
        return "NGO Page Customizations"
