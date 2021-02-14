from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.contrib import messages
from django.utils.translation import ngettext
from django.contrib.auth.models import Group
from .models import User, Vendor, Customer, Subscriber

from backend.utils import Util


class VendorAdmin(admin.ModelAdmin):
    list_display = ("email", "company_name", "is_verified")

    actions = ["make_verified"]

    def make_verified(self, request, queryset):
        rows_updated = queryset.update(is_verified=True)
        if rows_updated == 1:
            message_bit = "1 vendor was"
        else:
            message_bit = "%s vendors were" % rows_updated
        self.message_user(request, "%s successfully verified." % message_bit)

        for q in queryset.all():
            curr_vendor = Vendor.objects.get(email=q)
            Group.objects.get(name="Partners").user_set.add(curr_vendor)
            vendor_body = f"Använd dessa autentiseringsuppgifter för att logga in på Happicard. Email: {curr_vendor.email} Password: välkommen-till-happicard"
            vendor_data = {
                "email_body": vendor_body,
                "to_email": curr_vendor.email,
                "email_subject": "Happicard inloggning och lösenord",
            }
            if curr_vendor.is_staff == True and curr_vendor.is_verified == True:
                Util.send_email(vendor_data)

    make_verified.short_description = "Verify vendors and send email"


admin.site.register(User)
admin.site.register(Customer)
admin.site.register(Vendor, VendorAdmin)
admin.site.register(Subscriber)

admin.site.site_header = "Happicard Admin"
admin.site.site_title = "Happicard Admin"
admin.site.site_url = "https://happicard.se/"
admin.site.index_title = "Manage Happicard"
admin.empty_value_display = "**Empty**"
