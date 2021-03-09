"""Production Settings"""

from .base import *
from decouple import config

ALLOWED_HOSTS = ["happicard.se", "www.happicard.se"]

WSGI_APPLICATION = "backend.settings.wsgi.prod.application"

KLARNA_BASE_URL = "https://api.klarna.com"

DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.postgresql_psycopg2",
        "NAME": config("POSTGRES_NAME"),
        "USER": config("POSTGRES_USER"),
        "PASSWORD": config("POSTGRES_PASSWORD"),
        "HOST": config("POSTGRES_HOSTNAME"),
        "PORT": config("POSTGRES_PORT"),
    }
}

EMAIL_HOST_USER = config("EMAIL_PROD_HOST_USER")
EMAIL_HOST_PASSWORD = config("EMAIL_PROD_HOST_PASSWORD")
DEFAULT_FROM_EMAIL = config("DEFAULT_PROD_FROM_EMAIL")

TWILIO_ACCOUNT_SID = config("TWILIO_ACCOUNT_SID")
TWILIO_AUTH_TOKEN = config("TWILIO_AUTH_TOKEN")
TWILIO_NUMBER = config("TWILIO_NUMBER")

# Stripe
STRIPE_PROD_PK = config("STRIPE_PROD_PK")
STRIPE_PROD_SK = config("STRIPE_PROD_SK")


# Celery
BROKER_URL = config("CELERY_PROD_BROKER_URL")

AUTH_PASSWORD_VALIDATORS = [
    {
        "NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.MinimumLengthValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.CommonPasswordValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.NumericPasswordValidator",
    },
]