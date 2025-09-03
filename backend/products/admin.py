from django.contrib import admin
from .models import Product

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('id','name', 'category', 'subcategory', 'new_price', 'date_added')
    list_filter = ('category', 'subcategory')
    search_fields = ('name', 'description')
    ordering = ('-date_added',)
