from django.contrib import admin
from .models import Banner

@admin.register(Banner)
class BannerAdmin(admin.ModelAdmin):
    list_display = ('title', 'link', 'order', 'is_active')
    list_editable = ('link', 'order', 'is_active')