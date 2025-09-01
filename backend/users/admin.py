from django.contrib import admin
from django.contrib.auth.models import User
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin

class UserAdmin(BaseUserAdmin):
    list_display = ('username', 'email', 'is_staff', 'is_active')

    list_filter = ('is_staff', 'is_superuser', 'is_active', 'groups')

    actions=['approve_selected_users']

    def approve_selected_users(self, request, queryset):
        queryset.update(is_active=True)
    approve_selected_users.short_discription = "Approve selected users"

admin.site.unregister(User)
admin.site.register(User, UserAdmin)
