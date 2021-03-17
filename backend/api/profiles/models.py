import uuid
from django.conf import settings
from django.db import models
from django.utils import timezone
from django.utils.translation import gettext_lazy as _

from backend.api.items.models import GiftCard, Campaign
from backend.api.accounts.models import STORE_CHOICES, NGO_CHOICES
from backend.settings.storage_backends import NGOProfileStorage, StoreProfileStorage


OPTIONS = (
    ("draft", "Draft"),
    ("published", "Published"),
)


class Profile(models.Model):
    """
    Abstract Profile Model
    """

    class ProfileObjects(models.Manager):
        def get_queryset(self):
            return super().get_queryset().filter(status="published")

    class Meta:
        ordering = ("-published",)

    id = models.UUIDField(
        default=uuid.uuid4,
        unique=True,
        db_index=True,
        editable=False,
        primary_key=True,
    )
    title = models.CharField(max_length=255, unique=True)
    about = models.TextField("About", max_length=750, blank=True)
    published = models.DateTimeField(default=timezone.now)
    author = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="publishers",
        null=True,
        blank=True,
    )
    status = models.CharField(max_length=10, choices=OPTIONS, default="published")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    objects = models.Manager()
    profobjects = ProfileObjects()

    def __str__(self):
        return self.title


class Store(Profile):
    """
    Store Model
    """

    class Meta:
        verbose_name = _("Store")
        verbose_name_plural = _("Stores")

    banner_image = models.FileField(storage=StoreProfileStorage())
    header_image = models.FileField(storage=StoreProfileStorage())
    giftcards = models.ManyToManyField(GiftCard, blank=True)
    store_category = models.CharField(
        max_length=100,
        choices=STORE_CHOICES,
        null=True,
        blank=True,
        verbose_name=_("Store Category"),
    )


class NGO(Profile):
    """
    NGO Model
    """

    class Meta:
        verbose_name = _("NGO")
        verbose_name_plural = _("NGOs")

    banner_image = models.FileField(storage=NGOProfileStorage())
    header_image = models.FileField(storage=NGOProfileStorage())
    campaigns = models.ManyToManyField(Campaign, blank=True)
    ngo_category = models.CharField(
        max_length=100,
        choices=NGO_CHOICES,
        null=True,
        blank=True,
        verbose_name=_("NGO Category"),
    )