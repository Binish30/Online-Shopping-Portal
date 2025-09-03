from django.contrib import admin
from .models import Order, OrderItem

class OrderItemInline(admin.TabularInline):
    model = OrderItem
    readonly_fields = ('product', 'price', 'quantity')
    extra = 0
    can_delete = False

@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ('id', 'first_name', 'last_name', 'email', 'status', 'created_at', 'paid')
    list_filter = ('status', 'created_at', 'paid')
    search_fields = ('id', 'first_name', 'last_name', 'email')
    list_per_page = 20
    inlines = [OrderItemInline]
    readonly_fields = ('user', 'order_total', 'created_at')
