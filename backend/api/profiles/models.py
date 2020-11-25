from django.db.models.signals import post_save
from django.conf import settings
from django.db import models
from django.db.models import Sum
from django.shortcuts import reverse
from django.conf import settings
from django.utils import timezone
from django.utils.translation import gettext_lazy as _


OPTIONS = (
    ("draft", "Draft"),
    ("published", "Published"),
)

PARTNER_CHOICES = (
    ("NGO", "NGO"),
    ("Store", "Store"),
)

BRAND_CHOICES = (
    ("Electronics", "Electronics"),
    ("Fashion & Accessories", "Fashion & Accessories"),
    ("Digital Entertainment", "Digital Entertainment"),
    ("Home & Garden", "Home & Garden"),
)


def upload_to(instance, filename):
    return "profiles/{filename}".format(filename=filename)


class Profile(models.Model):
    class ProfileObjects(models.Manager):
        def get_queryset(self):
            return super().get_queryset().filter(status="published")

    image = models.ImageField(
        "Image", upload_to=upload_to, default="profiles/default.jpg"
    )
    slug = models.SlugField(
        max_length=250, unique_for_date="published", null=True, blank=True
    )
    about = models.TextField("About", max_length=500, blank=True)
    published = models.DateTimeField(default=timezone.now)
    author = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="profile_pages",
        null=True,
        blank=True,
    )
    partner_category = models.CharField(
        max_length=50, choices=PARTNER_CHOICES, null=True, blank=True
    )
    brand_category = models.CharField(
        max_length=50, choices=BRAND_CHOICES, null=True, blank=True
    )
    status = models.CharField(max_length=10, choices=OPTIONS, default="published")
    objects = models.Manager()
    profobjects = ProfileObjects()

    class Meta:
        ordering = ("-published",)

    def __str__(self):
        return self.name