from django.contrib.auth.base_user import BaseUserManager
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from rest_framework_simplejwt.tokens import RefreshToken
from django.utils.translation import ugettext_lazy as _
from django.utils import timezone
from django.db import models
import uuid


STORE_CHOICES = (
    ("Mode", "Mode"),
    ("Mode kvinna", "Mode kvinna"),
    ("Mode herr", "Mode herr"),
    ("Hus & Hem", "Hus & Hem"),
    ("Livsmedel", "Livsmedel"),
    ("Mat & Dryck", "Mat & Dryck"),
    ("Musik, Böcker & Spel", "Musik, Böcker & Spel"),
    ("Semester & Resor", "Semester & Resor"),
    ("Underhållning & Upplevelser", "Underhållning & Upplevelser"),
    ("Annat", "Annat"),
)


NGO_CHOICES = (
    ("Anhörigstöd", "Anhörigstöd"),
    ("Barn", "Barn"),
    ("Bevarande projekt", "Bevarande projekt"),
    ("Fadderverksamhet", "Fadderverksamhet"),
    ("Familjer", "Familjer"),
    ("Flyktingar", "Flyktingar"),
    ("Förebyggande arbete", "Förebyggande arbete"),
    ("Föräldralösa barn", "Föräldralösa barn"),
    ("Hemlösa", "Hemlösa"),
    ("Hjälp till enskilda", "Hjälp till enskilda"),
    ("Jordbruk", "Jordbruk"),
    ("Jämställdhet", "Jämställdhet"),
    ("Katastrofhjälp", "Katastrofhjälp"),
    ("Kvinnor", "Kvinnor"),
    ("Mikrolån/Mikrokrediter", "Mikrolån/Mikrokrediter"),
    ("Personalutveckling", "Personalutveckling"),
    ("Rehabilitering", "Rehabilitering"),
    ("Rättshjälp", "Rättshjälp"),
    ("Second hand", "Second hand"),
    ("Sjukhus/Vårdhem/Äldreboende", "Sjukhus/Vårdhem/Äldreboende"),
    ("Skyddat boende", "Skyddat boende"),
    ("Telefonjour", "Telefonjour"),
    ("Ungdom", "Ungdom"),
    ("Utbildning - grund", "Utbildning - grund"),
    ("Utbildning - högre", "Utbildning - högre"),
    ("Utbildning - yrkes", "Utbildning - yrkes"),
    ("Vatten/Sanitets projekt", "Vatten/Sanitets projekt"),
    ("Verksamhet för sjuka", "Verksamhet för sjuka"),
    ("Volontärer", "Volontärer"),
    ("Vuxna", "Vuxna"),
    ("Äldre", "Äldre"),
    ("Annat", "Annat"),
)


class UserManager(BaseUserManager):
    """
    Base User Manager
    """

    def create_user(
        self,
        first_name,
        last_name,
        email,
        password="välkommen-till-happicard",
        **extra_fields,
    ):
        """
        Create user with the given email and password
        """
        if not email:
            raise ValueError("The email must be set.")
        first_name = first_name.capitalize()
        last_name = last_name.capitalize()

        user = self.model(
            first_name=first_name,
            last_name=last_name,
            email=self.normalize_email(email),
            **extra_fields,
        )
        user.set_password(password)
        user.save()
        return user

    def create_superuser(self, first_name, last_name, email, password, **extra_fields):
        """
        Create superuser with the given email and password.
        """
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)
        extra_fields.setdefault("is_active", True)

        if extra_fields.get("is_staff") is not True:
            raise ValueError("Superuser must have is_staff=True.")
        if extra_fields.get("is_superuser") is not True:
            raise ValueError("Superuser must have is_superuser=True.")
        return self.create_user(first_name, last_name, email, password, **extra_fields)


class User(AbstractBaseUser, PermissionsMixin):
    """
    Abstract User Model
    """

    id = models.UUIDField(
        default=uuid.uuid4,
        unique=True,
        db_index=True,
        editable=False,
        primary_key=True,
    )
    username = None
    email = models.EmailField(max_length=255, unique=True, db_index=True)
    first_name = models.CharField(max_length=255, verbose_name="First name")
    last_name = models.CharField(max_length=255, verbose_name="Last name")
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=True)
    is_verified = models.BooleanField(default=False)
    published = models.DateTimeField(default=timezone.now)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["first_name", "last_name", "password"]

    objects = UserManager()

    def __str__(self):
        return self.email

    def tokens(self):
        refresh = RefreshToken.for_user(self)
        return {"refresh": str(refresh), "access": str(refresh.access_token)}


class Vendor(User):
    """
    Vendor Model
    """

    phone_number = models.CharField(max_length=15, null=True, blank=True)
    company_name = models.CharField(max_length=255, null=True, blank=True)
    company_address = models.CharField(max_length=255, null=True, blank=True)
    company_role = models.CharField(max_length=255, null=True, blank=True)
    corporate_form = models.CharField(max_length=255, null=True, blank=True)
    company_store_category = models.CharField(
        max_length=100,
        choices=STORE_CHOICES,
        null=True,
        blank=True,
        verbose_name=_("Store Category"),
    )
    company_ngo_category = models.CharField(
        max_length=100,
        choices=NGO_CHOICES,
        null=True,
        blank=True,
        verbose_name=_("NGO Category"),
    )
    company_website = models.CharField(max_length=255, null=True, blank=True)
    comments = models.TextField(max_length=500, null=True, blank=True)

    def __str__(self):
        return self.email


class Customer(User):
    """
    Customer Model
    """

    pass


class Subscriber(models.Model):
    """
    Email Subscriber Model
    """

    email = models.EmailField(unique=True)

    def __str__(self):
        return self.email
