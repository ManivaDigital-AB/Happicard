"""Main Settings"""

import os
import pathlib
from datetime import timedelta
from decouple import config

BASE_DIR = pathlib.Path(__file__).parent.parent
PROJECT_ROOT = BASE_DIR.parent

DEBUG = True

SECRET_KEY = config("DJANGO_SECRET_KEY")

INSTALLED_APPS = [
    "admin_interface",
    "colorfield",
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    "django_countries",
    "backend.api.accounts",
    "backend.api.orders",
    "backend.api.items",
    "backend.api.profiles",
    "backend.api.customizations",
    "backend.api.seo",
    "drf_yasg",
    "storages",
    "rest_framework",
    "rest_framework_simplejwt.token_blacklist",
    "django_rest_passwordreset",
    "rest_auth",
    "corsheaders",
]

MIDDLEWARE = [
    "corsheaders.middleware.CorsMiddleware",
    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

ROOT_URLCONF = "backend.urls"

TEMPLATE_DIR = os.path.join(BASE_DIR, "templates")

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [TEMPLATE_DIR],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

AUTH_USER_MODEL = "accounts.User"

# Permission settings
REST_FRAMEWORK = {
    "DEFAULT_PERMISSION_CLASSES": ("rest_framework.permissions.AllowAny",),
    "DEFAULT_AUTHENTICATION_CLASSES": (
        "rest_framework_simplejwt.authentication.JWTAuthentication",
    ),
}

# JWT settings
SIMPLE_JWT = {
    "ACCESS_TOKEN_LIFETIME": timedelta(minutes=30),
    "REFRESH_TOKEN_LIFETIME": timedelta(days=30),
    "ROTATE_REFRESH_TOKENS": True,
    "BLACKLIST_AFTER_ROTATION": False,
    "ALGORITHM": "HS256",
    "SIGNING_KEY": SECRET_KEY,
    "VERIFYING_KEY": None,
    "AUTH_HEADER_TYPES": ("JWT",),
    "USER_ID_FIELD": "id",
    "USER_ID_CLAIM": "user_id",
    "AUTH_TOKEN_CLASSES": ("rest_framework_simplejwt.tokens.AccessToken",),
    "TOKEN_TYPE_CLAIM": "token_type",
}

LOGIN_URL = "/login"
LOGIN_REDIRECT_URL = "/"
LOGOUT_REDIRECT_URL = "/login"

# Internationalization
if DEBUG:
    LANGUAGE_CODE = "en-us"
else:
    LANGUAGE_CODE = "sv-eu"

TIME_ZONE = "Europe/Stockholm"
USE_I18N = True
USE_L10N = True
USE_TZ = True

# Storage
USE_S3 = True

if USE_S3:
    # AWS settings
    AWS_ACCESS_KEY_ID = config("AWS_ACCESS_KEY_ID")
    AWS_SECRET_ACCESS_KEY = config("AWS_SECRET_ACCESS_KEY")
    AWS_STORAGE_BUCKET_NAME = config("AWS_STORAGE_BUCKET_NAME")
    AWS_S3_REGION_NAME = "us-west-2"
    AWS_S3_CUSTOM_DOMAIN = f"{AWS_STORAGE_BUCKET_NAME}.s3.amazonaws.com"
    AWS_S3_OBJECT_PARAMETERS = {"CacheControl": "max-age=86400"}
    # S3 static settings
    STATIC_LOCATION = "static"
    STATIC_URL = f"https://{AWS_S3_CUSTOM_DOMAIN}/{STATIC_LOCATION}/"
    STATICFILES_STORAGE = "backend.settings.storage_backends.StaticStorage"
    # S3 media settings
    MEDIA_LOCATION = "media"
    MEDIA_URL = f"https://{AWS_S3_CUSTOM_DOMAIN}/{MEDIA_LOCATION}/"
    DEFAULT_FILE_STORAGE = "backend.settings.storage_backends.MediaStorage"
    # Other static files
    STATICFILES_DIRS = [
        os.path.join(PROJECT_ROOT, "static"),
    ]
else:
    STATIC_URL = "/staticfiles/"
    STATIC_ROOT = os.path.join(BASE_DIR, "staticfiles")
    pathlib.Path(STATIC_ROOT).mkdir(exist_ok=True, parents=True)
    MEDIA_URL = "/mediafiles/"
    MEDIA_ROOT = os.path.join(BASE_DIR, "mediafiles")
    pathlib.Path(MEDIA_ROOT).mkdir(exist_ok=True, parents=True)

# Email
EMAIL_BACKEND = "django.core.mail.backends.smtp.EmailBackend"
EMAIL_USE_TLS = True
EMAIL_HOST = config("EMAIL_HOST")
EMAIL_PORT = 587

# Task Scheduling
CELERY_TIMEZONE = "Europe/Stockholm"
CELERY_TASK_TRACK_STARTED = True
CELERY_TASK_TIME_LIMIT = 30 * 60
CELERY_ACCEPT_CONTENT = ["json"]
CELERY_TASK_SERIALIZER = "json"

# Logging
LOG_DIR = PROJECT_ROOT / "log"
LOG_DIR.mkdir(exist_ok=True)
LOGGING = {
    "version": 1,
    "disable_existing_loggers": False,
    "formatters": {
        "console": {
            "format": "%(levelname)-8s %(name)-12s %(module)s:%(lineno)s\n"
            "%(message)s"
        },
        "file": {
            "format": "%(asctime)s %(levelname)-8s %(name)-12s "
            "%(module)s:%(lineno)s\n%(message)s"
        },
    },
    "handlers": {
        "console": {
            "class": "logging.StreamHandler",
            "formatter": "console",
        },
        "file": {
            "class": "logging.handlers.RotatingFileHandler",
            "formatter": "file",
            "filename": LOG_DIR / "django.log",
            "backupCount": 10,  # keep at most 10 files
            "maxBytes": 5 * 1024 * 1024,  # 5MB
        },
    },
    "loggers": {
        "django.request": {
            "handlers": ["console", "file"],
            "level": "DEBUG",
            "propagate": True,
        },
    },
}
LOGGING["loggers"].update(
    {
        app: {
            "handlers": ["console", "file"],
            "level": "DEBUG",
            "propagate": True,
        }
        for app in INSTALLED_APPS
    }
)

# Different development and production settings
if DEBUG:
    try:
        from .dev import *
    except ModuleNotFoundError:
        print("Dev config not found")
else:
    try:
        from .prod import *
    except ModuleNotFoundError:
        print("Prod config not found")
