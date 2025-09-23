from django.urls import path
from .views import CreateOrderView, OrderHistoryView, CancelOrderView, OrderDetailView, GenerateInvoicePDFView

urlpatterns = [
    path('create-order/', CreateOrderView.as_view(), name='create-order'),
    path('my-orders/', OrderHistoryView.as_view(), name='my-orders'),
    path('orders/<int:order_id>/cancel/', CancelOrderView.as_view(), name='cancel-order'),
    path('orders/<int:order_id>/', OrderDetailView.as_view(), name='order_detail'),
    path('orders/<int:order_id>/invoice/',GenerateInvoicePDFView.as_view(), name='order_invoice'),
]