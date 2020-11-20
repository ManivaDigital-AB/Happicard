"""Development Settings"""

from .base import *

ALLOWED_HOSTS = ["*"]
LOGGING["handlers"]["file"]["backupCount"] = 1

CORS_ORIGIN_ALLOW_ALL = True
CORS_ORIGIN_WHITELIST = ("http://localhost:3000",)

WSGI_APPLICATION = "backend.settings.wsgi.dev.application"

DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.sqlite3",
        "NAME": os.path.join(BASE_DIR, "db.sqlite3"),
    }
}

DEFAULT_FROM_EMAIL = "drew@manivadigital.com"
EMAIL_USE_TLS = True
EMAIL_HOST = "email-smtp.eu-central-1.amazonaws.com"
EMAIL_PORT = 587
EMAIL_HOST_USER = config("EMAIL_DEV_HOST_USER")
EMAIL_HOST_PASSWORD = config("EMAIL_DEV_HOST_PASSWORD")