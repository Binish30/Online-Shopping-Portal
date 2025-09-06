from django.db import models

class Banner(models.Model):
    image = models.CharField(max_length=255)
    title = models.CharField(max_length=200)
    subtitle = models.CharField(max_length=300, blank=True, null=True)
    link = models.CharField(max_length=255, default="/shop", help_text="e.g., /women, /shop, /product/12")
    is_active = models.BooleanField(default=True)
    order = models.PositiveIntegerField(default=0, help_text="Banners will be ordered by this number.")

    class Meta:
        ordering = ['order'] 

    def __str__(self):
        return self.title