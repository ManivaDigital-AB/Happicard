from django.contrib import admin
from .models import (
    HomePage,
    SocialMedia,
    Footer,
    AboutPage,
    PartnersPage,
    StorePage,
    NGOPage,
)


admin.site.register(HomePage)
admin.site.register(SocialMedia)
admin.site.register(Footer)
admin.site.register(AboutPage)
admin.site.register(PartnersPage)
admin.site.register(StorePage)
admin.site.register(NGOPage)
