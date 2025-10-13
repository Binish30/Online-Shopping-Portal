from django.contrib import admin
from django.contrib.auth.models import User
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .models import UserProfile

class UserProfileInline(admin.StackedInline):
    model = UserProfile
    can_delete = False
    verbose_name_plural = 'Profile'
    fk_name = 'user'

class UserAdmin(BaseUserAdmin):
    list_display = ('username', 'email', 'first_name', 'last_name', 'is_staff', 'is_active')

    list_filter = ('is_staff', 'is_superuser', 'is_active', 'groups')

#     actions=['approve_selected_users']

#     def approve_selected_users(self, request, queryset):
#         queryset.update(is_active=True)
#     approve_selected_users.short_discription = "Approve selected users"

# admin.site.unregister(User)
# admin.site.register(User, UserAdmin)
    inlines = (UserProfileInline,)
    
    actions = ['make_users_active']

    def make_users_active(self, request, queryset):
        queryset.update(is_active=True)
    make_users_active.short_description = "Approve selected users"

# 4. Unregister the default User admin and reregister with our custom one
admin.site.unregister(User)
admin.site.register(User,UserAdmin)
