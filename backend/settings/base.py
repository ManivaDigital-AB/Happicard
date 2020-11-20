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
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    "backend.api.authentification",
    "backend.api.orders",
    "backend.api.payments",
    "backend.api.profiles",
    "drf_yasg",
    "rest_framework",
    "rest_framework_simplejwt.token_blacklist",
    "rest_auth",
    "corsheaders",
]

MIDDLEWARE = [
    "corsheaders.middleware.CorsMiddleware",
    "django.middleware.security.SecurityMiddleware",
    "whitenoise.middleware.WhiteNoiseMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

ROOT_URLCONF = "backend.urls"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [],
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

AUTH_USER_MODEL = "authentification.CustomUser"

REST_FRAMEWORK = {
    "DEFAULT_PERMISSION_CLASSES": ("rest_framework.permissions.AllowAny",),
    "DEFAULT_AUTHENTICATION_CLASSES": (
        "rest_framework_simplejwt.authentication.JWTAuthentication",
    ),
}

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

LANGUAGE_CODE = "en-us"

TIME_ZONE = "Europe/Stockholm"

USE_I18N = True

USE_L10N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)

STATIC_URL = "/static/"
STATICFILES_DIRS = [
    PROJECT_ROOT.joinpath("static"),
]

STATIC_ROOT = PROJECT_ROOT / "public" / "static"
pathlib.Path(STATIC_ROOT).mkdir(exist_ok=True, parents=True)

MEDIA_URL = "/media/"
MEDIA_ROOT = PROJECT_ROOT / "public" / "media"
pathlib.Path(MEDIA_ROOT).mkdir(exist_ok=True, parents=True)


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
