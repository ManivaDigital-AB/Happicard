from django.test import TestCase
from rest_framework.test import APITestCase
from rest_framework import status

from .models import Item
from .serializers import ItemSerializer

from django.conf import settings.DEFAULT_FROM_EMAIL as test_email


