"""Development Settings"""

from .base import *

ALLOWED_HOSTS = ["127.0.0.1", "localhost", "127.0.0.1:8000", "0.0.0.0:8000"]
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