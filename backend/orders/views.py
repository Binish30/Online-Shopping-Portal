# orders/views.py

from django.http import HttpResponse
from django.template.loader import get_template
from django.conf import settings
import os
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status as drf_status
from rest_framework.permissions import IsAuthenticated
from weasyprint import HTML, CSS
from .models import Order, OrderItem
from products.models import Product
from .serializers import OrderSerializer, OrderDetailSerializer

class CreateOrderView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        cart_items = request.data.get('cart')
        shipping_address = request.data.get('shippingAddress')

        if not cart_items or not shipping_address:
            return Response(
                {'error': 'Cart Item and Shipping Address required.'},
                status=drf_status.HTTP_400_BAD_REQUEST
            )
        user = request.user
        try:
            total_price = 0
            for item in cart_items:
                product = Product.objects.get(id=item['id'])
                total_price += product.new_price * item['quantity']
            
            order = Order.objects.create(
                user=user,
                first_name=shipping_address['first_name'],
                last_name=shipping_address['last_name'],
                email=shipping_address['email'],
                phone=shipping_address['phone'],
                address=shipping_address['address'],
                city=shipping_address['city'],
                zip_code=shipping_address['zip_code'],
                order_total=total_price
            )

            for item in cart_items:
                product = Product.objects.get(id=item['id'])
                OrderItem.objects.create(
                    order=order, product=product,
                    price=product.new_price, quantity=item['quantity']
                )

            serializer = OrderDetailSerializer(order)
            return Response(serializer.data, status=drf_status.HTTP_201_CREATED) # Corrected typo 'cstatus'

        except Product.DoesNotExist:
            return Response({'error': 'A product in the cart was not found.'}, status=drf_status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'error': f'An error occurred: {str(e)}'}, status=drf_status.HTTP_500_INTERNAL_SERVER_ERROR)

class OrderHistoryView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        orders = Order.objects.filter(user=request.user).order_by('-created_at')
        serializer = OrderSerializer(orders, many=True)
        return Response(serializer.data)

class CancelOrderView(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request, order_id):
        try:
            order = Order.objects.get(id=order_id, user=request.user)
        except Order.DoesNotExist:
            return Response({'error': 'Order not Found.'}, status=drf_status.HTTP_404_NOT_FOUND)
        if order.status != 'Pending':
            return Response({'error': f'Cannot cancel an order with status "{order.status}".'}, status=drf_status.HTTP_400_BAD_REQUEST)
        order.status = 'Cancelled'
        order.save()
        serializer = OrderSerializer(order)
        return Response(serializer.data, status=drf_status.HTTP_200_OK)

class OrderDetailView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request, order_id):
        try:
            order = Order.objects.get(id=order_id, user=request.user)
        except Order.DoesNotExist:
            return Response({'error': 'Order not found.'}, status=drf_status.HTTP_404_NOT_FOUND) # Corrected status
        
        # Corrected: Moved this outside the except block
        serializer = OrderDetailSerializer(order)
        return Response(serializer.data)
        
class GenerateInvoicePDFView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request, order_id):
        try:
            order = Order.objects.get(id=order_id, user=request.user, status='Delivered')
        except Order.DoesNotExist:
            return Response({'error': 'Invoice not available.'}, status=drf_status.HTTP_404_NOT_FOUND)
        
        template = get_template('orders/invoice.html')
        html = template.render({'order': order})

        try:
            html_obj = HTML(string=html, base_url=request.build_absolute_uri())
            # Corrected path with no extra spaces
            font_path = os.path.join(settings.STATICFILES_DIRS[0], 'fonts', 'DejaVuSans.ttf')
            font_config = f"""
            @font-face {{
                font-family: 'DejaVu Sans';
                src: url('file://{font_path}');
            }}
            """
            font_css = CSS(string=font_config)
            pdf = html_obj.write_pdf(stylesheets=[font_css])
            
            response = HttpResponse(pdf, content_type='application/pdf')
            response['Content-Disposition'] = f'attachment; filename="invoice_{order.id}.pdf"'
            return response
        except Exception as e:
            print(f"Error generating PDF: {e}")
            # Corrected return statement
            return Response({'error': 'Failed to generate PDF.'}, status=drf_status.HTTP_500_INTERNAL_SERVER_ERROR)