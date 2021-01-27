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

KLARNA_BASE_URL = "https://api.playground.klarna.com"

DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.sqlite3",
        "NAME": os.path.join(BASE_DIR, "db.sqlite3"),
    }
}

EMAIL_HOST_USER = config("EMAIL_DEV_HOST_USER")
EMAIL_HOST_PASSWORD = config("EMAIL_DEV_HOST_PASSWORD")
DEFAULT_FROM_EMAIL = config("DEFAULT_DEV_FROM_EMAIL")

TWILIO_ACCOUNT_SID = config("TWILIO_ACCOUNT_SID")
TWILIO_AUTH_TOKEN = config("TWILIO_AUTH_TOKEN")
TWILIO_NUMBER = config("TWILIO_NUMBER")
