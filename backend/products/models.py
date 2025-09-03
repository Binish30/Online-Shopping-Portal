from django.db import models

class Product(models.Model):
    name = models.CharField(max_length=200)
    description = models.TextField(blank=True, null=True)

    category = models.CharField(max_length=200)
    subcategory = models.CharField(max_length=100, blank=True, null=True)

    new_price = models.DecimalField(max_digits=8, decimal_places=2)
    old_price = models.DecimalField(max_digits=8, decimal_places=2, blank=True, null=True)

    image = models.CharField(max_length=255)

    date_added = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name
