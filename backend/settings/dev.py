"""Development Settings"""

from .base import *

ALLOWED_HOSTS = ["*"]
LOGGING["handlers"]["file"]["backupCount"] = 1

CORS_ORIGIN_ALLOW_ALL = True
CORS_ORIGIN_WHITELIST = [
    "http://localhost:3000",
    "http://localhost:8000",
    "http://localhost:8080",
]

WSGI_APPLICATION = "backend.settings.wsgi.dev.application"

DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.sqlite3",
        "NAME": os.path.join(BASE_DIR, "db.sqlite3"),
    }
}

# Email
EMAIL_HOST_USER = config("EMAIL_DEV_HOST_USER")
EMAIL_HOST_PASSWORD = config("EMAIL_DEV_HOST_PASSWORD")
DEFAULT_FROM_EMAIL = config("DEFAULT_DEV_FROM_EMAIL")

# Twilio
TWILIO_ACCOUNT_SID = config("TWILIO_ACCOUNT_SID")
TWILIO_AUTH_TOKEN = config("TWILIO_AUTH_TOKEN")
DEFAULT_FROM_NUMBER = config("TWILIO_NUMBER")

# Stripe
STRIPE_DEV_PK = config("STRIPE_DEV_PK")
STRIPE_DEV_SK = config("STRIPE_DEV_SK")

# Celery
BROKER_URL = config("CELERY_DEV_BROKER_URL")
