import React from 'react';
import './OrderSuccess.css';
import { useLocation } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';

const OrderSuccess = () => {
    const location = useLocation();
    const { order } = location.state || {};

    if (!order) {
        return (
            <div className="container my-5 text-center">
                <h1 className="text-success">Order Placed Successfully!</h1>
                <p> You can view your order details in the "My Orders" section.</p>
            </div>
        )
    }
    return (
        <div className="order-success-page container my-5">
            <div className="success-header text-center">
                <CheckCircle size={64} className="text-success mb-3" />
                <h1 className="text-success">Order Placed Successfully!</h1>
                <p className="lead">Thank you for your purchase. Your order details are below.</p>
            </div>

            <hr className="my-4" />
            <div className="row">
                <div className="col-md-6">
                    <h4>Order Summary</h4>
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item"><strong>Order ID:</strong>#{order.id}</li>
                        <li className="list-group-item"><strong>Date:</strong>{new Date(order.created_at).toLocaleDateString()}</li>
                        <li className="list-group-item"><strong>Status:</strong>{order.status}</li>
                        <li className="list-group-item"><strong>Payment Method:</strong>{order.payment_method}</li>
                        <li className="list-group-item"><strong>Order Total</strong>₹{parseFloat(order.order_total).toFixed(2)}</li>
                    </ul>
                </div>
                <div className="col-md-6">
                    <h4>Shipping Address</h4>
                    <p>
                        {order.first_name} {order.last_name}<br />
                        {order.address}<br />
                        {order.city}, {order.zip_code}<br />
                        Email: {order.email}<br />
                        phone: {order.phone}
                    </p>
                </div>
            </div>

            <hr className="my-4" />

            <h4>Items Ordered</h4>
            <ul className="list-group">
                {order.items.map((item, index) => (
                    <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                        <div>
                            <strong>{item.product.name}</strong>
                            <br />
                            <small>Quantity: {item.quantity}</small>
                        </div>
                        <span>₹{parseFloat(item.price).toFixed(2)}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default OrderSuccess;