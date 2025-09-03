# products/views.py

from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Product
from .serializers import ProductSerializer

class ProductListView(APIView):
    """
    API view to list all products.
    This is a public endpoint and does not require authentication.
    """
    def get(self, request):
        # 1. Get all product objects from the database
        products = Product.objects.all().order_by('id')
        
        # 2. Use the serializer to convert the queryset into JSON-ready format
        serializer = ProductSerializer(products, many=True)
        
        # 3. Return the serialized data as a response
        return Response(serializer.data)