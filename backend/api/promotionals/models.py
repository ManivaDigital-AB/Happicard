from django.utils.translation import ugettext_lazy as _
from django.conf import settings
from django.db import models
from django.utils import timezone
import uuid

from backend.settings.storage_backends import PromoStorage

OPTIONS = (
    ("draft", "Draft"),
    ("published", "Published"),
)


class Promo(models.Model):
    """
    Promotional Space Model
    """

    class PromosObjects(models.Manager):
        def get_queryset(self):
            return super().get_queryset().filter(status="published")

    class Meta:
        ordering = ("-published",)
        verbose_name = _("Promos")
        verbose_name_plural = _("Promos")

    id = models.UUIDField(
        default=uuid.uuid4,
        unique=True,
        db_index=True,
        editable=False,
        primary_key=True,
    )

    title = models.CharField(max_length=255, null=True, blank=True)
    description = models.TextField("Description", max_length=500, blank=True)
    promo_image_1 = models.FileField(storage=PromoStorage())
    promo_image_2 = models.FileField(storage=PromoStorage())
    promo_image_3 = models.FileField(storage=PromoStorage())
    promo_image_4 = models.FileField(storage=PromoStorage())
    promo_image_5 = models.FileField(storage=PromoStorage())
    promo_image_6 = models.FileField(storage=PromoStorage())
    promo_image_7 = models.FileField(storage=PromoStorage())
    promo_image_8 = models.FileField(storage=PromoStorage())
    promo_image_9 = models.FileField(storage=PromoStorage())
    promo_image_10 = models.FileField(storage=PromoStorage())
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
        return "Current promotional space"