from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.contrib.auth.models import Group
from .models import User, Vendor, Customer, Subscriber


admin.site.register(User)
admin.site.register(Customer)
admin.site.register(Vendor)
admin.site.register(Subscriber)

vendors = Vendor.objects.all()
for v in vendors:
    Group.objects.get(name="Partners").user_set.add(v)

admin.site.site_header = "Happicard Admin"
admin.site.site_title = "Happicard Admin"
admin.site.site_url = "https://happicard.se/"
admin.site.index_title = "Manage Happicard"
admin.empty_value_display = "**Empty**"
