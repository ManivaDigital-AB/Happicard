from django.db import models
from django.utils.translation import gettext_lazy as _
import uuid


class Keyword(models.Model):
    class Meta:
        verbose_name = _("Keyword")
        verbose_name_plural = _("Keywords")

    keyword = models.CharField(max_length=20)

    def __str__(self):
        return self.keyword


class SEO(models.Model):
    class Meta:
        verbose_name = _("Metadata")
        verbose_name_plural = _("Metadata")

    id = models.UUIDField(
        default=uuid.uuid4,
        unique=True,
        db_index=True,
        editable=False,
        primary_key=True,
    )
    title = models.CharField(max_length=68, blank=True)
    keywords = models.ManyToManyField(Keyword, blank=True)
    description = models.TextField(max_length=155)
    heading = models.CharField(max_length=20)
    subheading = models.CharField(max_length=20)
    extra = models.CharField(max_length=20)

    def __str__(self):
        return f"Metadata with {self.title}"