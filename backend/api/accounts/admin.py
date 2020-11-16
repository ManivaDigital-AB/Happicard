from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as AccountAdmin

from .models import Account

admin.site.register(Account, AccountAdmin)