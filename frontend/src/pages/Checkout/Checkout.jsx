import React, { useState, useEffect, useContext } from "react";
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { ShopContext } from "../../context/ShopContext";
import { useNavigate } from "react-router-dom";
import CheckoutForm from "../../components/CheckoutForm/CheckoutForm";
import "./Checkout.css";

// Load Stripe outside the component.
// REPLACE with your actual Stripe Publishable Key.
const stripePromise = loadStripe('pk_test_51SANSfERqocsLnBMdb8Ty2k8Dh8BFjHhbDEIwd5fXJ3rEcksz6qsOQdW3Jpf8rMEMHSKWGJJ7xhHB9kHF114JoPp00pstAnfgQ');

const Checkout = () => {
    const { all_products, cartItems, getTotalCartAmount, clearCart } = useContext(ShopContext);
    const [clientSecret, setClientSecret] = useState("");
    const [shippingDetails, setShippingDetails] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        address_flat: "",
        address_area: "",
        address_landmark: "",
        city: "",
        zipCode: "",
    });
    const [paymentMethod, setPaymentMethod] = useState('Card');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (isSubmitting) return;

        const createPaymentIntent = async () => {
            const orderCartItems = all_products
                .filter(product => cartItems[product.id] > 0)
                .map(product => ({ id: product.id, quantity: cartItems[product.id] }));

            if (orderCartItems.length === 0) {
                navigate('/cart'); // Redirect if cart is empty
                return;
            };

            try {
                const apiUrl = import.meta.env.VITE_API_URL;
    const response = await fetch(`${apiUrl}/api/create-payment-intent/`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('auth-token')}` },
                    body: JSON.stringify({ cart: orderCartItems })
                });
const data = await response.json();
                if (response.ok) {
                    setClientSecret(data.clientSecret);
                } else {
                    console.error("Failed to create payment intent:", data.error);
                }
            } catch (error) {
                console.error("Error creating payment intent:", error);
            }
        };
        createPaymentIntent();
    }, [all_products, cartItems, navigate, isSubmitting]);

    const changeHandler = (e) => {
        setShippingDetails({ ...shippingDetails, [e.target.name]: e.target.value });
    };
   const saveOrderToBackend = async (paymentIntentId = null) => {
      setIsSubmitting(true);
        const orderCartItems = all_products.filter(p => cartItems[p.id] > 0).map(p => ({ id: p.id, quantity: cartItems[p.id] }));
        
        // Simple validation check before sending
        if (!shippingDetails.firstName || !shippingDetails.address_flat) {
            alert("Please fill in all required shipping details.");
            return;
        }
        
        const combinedAddress = `${shippingDetails.address_flat}, ${shippingDetails.address_area}, ${shippingDetails.address_landmark}`;
        
        const finalShippingAddress = {
            firstName: shippingDetails.firstName,
            lastName: shippingDetails.lastName,
            email: shippingDetails.email,
            phone: shippingDetails.phone,
            address: combinedAddress,
            city: shippingDetails.city,
            zipCode: shippingDetails.zipCode,
        };

        const orderData = {
            cart: orderCartItems,
            shippingAddress: finalShippingAddress,
            paymentMethod: paymentMethod,
            paymentIntentId: paymentIntentId
        };

        try {
            const apiUrl = import.meta.env.VITE_API_URL;
    const response = await fetch(`${apiUrl}/api/create-order/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('auth-token')}` },
                body: JSON.stringify(orderData)
            });
            const responseData = await response.json();
            if (response.ok) {
                clearCart();
                navigate('/order-success', { state: { order: responseData } });
            } else {
                alert(`Failed to save order: ${responseData.error || 'Unknown error'}`);
            }
        } catch (error) {
            alert(`An error occurred while saving the order: ${error.message}`);
        }
    };

    const appearance = { theme: 'stripe' };
    const options = { clientSecret, appearance };

    return (
        <div className="checkout-page container my-5">
            <div className="row g-5">
                <div className="col-md-7 col-lg-8">
                    <h4 className="mb-3">Shipping address</h4>
                    <form>
                        <div className="row g-3">
                            <div className="col-sm-6">
                                <label htmlFor="firstName" className="form-label">First name</label>
                                <input type="text" className="form-control" name="firstName" value={shippingDetails.firstName} onChange={changeHandler} required />
                            </div>
                            <div className="col-sm-6">
                                <label htmlFor="lastName" className="form-label">Last name</label>
                                <input type="text" className="form-control" name="lastName" value={shippingDetails.lastName} onChange={changeHandler} required />
                            </div>
                            <div className="col-12">
                                <label htmlFor="email" className="form-label">Email</label>
                                <input type="email" className="form-control" name="email" value={shippingDetails.email} onChange={changeHandler} required />
                            </div>
                            <div className="col-12">
                                <label htmlFor="phone" className="form-label">Phone</label>
                                <input type="tel" className="form-control" name="phone" value={shippingDetails.phone} onChange={changeHandler} required />
                            </div>
                            <div className="col-12">
                                <label htmlFor="address_flat" className="form-label">Flat, House no., Building</label>
                                <input type="text" className="form-control" name="address_flat" value={shippingDetails.address_flat} onChange={changeHandler} required />
                            </div>
                            <div className="col-12">
                                <label htmlFor="address_area" className="form-label">Area, Street</label>
                                <input type="text" className="form-control" name="address_area" value={shippingDetails.address_area} onChange={changeHandler} />
                            </div>
                            <div className="col-12">
                                <label htmlFor="address_landmark" className="form-label">Landmark</label>
                                <input type="text" className="form-control" name="address_landmark" value={shippingDetails.address_landmark} onChange={changeHandler} />
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="city" className="form-label">City</label>
                                <input type="text" className="form-control" name="city" value={shippingDetails.city} onChange={changeHandler} required />
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="zipCode" className="form-label">Zip Code</label>
                                <input type="text" className="form-control" name="zipCode" value={shippingDetails.zipCode} onChange={changeHandler} required />
                            </div>
                        </div>
                    </form>
                    <hr className="my-4" />
                    <h4 className="mb-3">Payment Method</h4>
                     <div className="my-3">
                        <div className="form-check">
                            <input id="card" name="paymentMethod" type="radio" className="form-check-input" checked={paymentMethod === 'Card'} onChange={() => setPaymentMethod('Card')} required />
                            <label className="form-check-label" htmlFor="card">Pay with Card</label>
                        </div>
                        <div className="form-check">
                            <input id="cod" name="paymentMethod" type="radio" className="form-check-input" checked={paymentMethod === 'COD'} onChange={() => setPaymentMethod('COD')} required />
                            <label className="form-check-label" htmlFor="cod">Cash on Delivery (COD)</label>
                        </div>
                    </div>

                    {paymentMethod === 'Card' && (
                        clientSecret ? (
                            <Elements options={options} stripe={stripePromise}>
                                <CheckoutForm onPaymentSuccess={saveOrderToBackend} shippingDetails={shippingDetails} />
                            </Elements>
                        ) : <p>Loading payment gateway...</p>
                    )}
                    
                    {paymentMethod === 'COD' && (
                        <button className="w-100 btn btn-primary btn-lg mt-4" onClick={() => saveOrderToBackend()}>
                            Place Order (COD)
                        </button>
                    )}
                </div>
                <div className="col-md-5 col-lg-4 order-md-last">
                    <h4 className="d-flex justify-content-between align-items-center mb-3">
                        <span className="text-primary">Your Cart</span>
                    </h4>
                    <ul className="list-group mb-3">
                        {all_products.map((product) => {
                            if (cartItems[product.id] > 0) {
                                return (
                                    <li key={product.id} className="list-group-item d-flex justify-content-between lh-sm">
                                        <div>
                                            <h6 className="my-0">{product.name}</h6>
                                            <small className="text-muted">Quantity: {cartItems[product.id]}</small>
                                        </div>
                                        <span className="text-muted">₹{(parseFloat(product.new_price) * cartItems[product.id]).toFixed(2)}</span>
                                    </li>
                                );
                            }
                            return null;
                        })}
                        <li className="list-group-item d-flex justify-content-between">
                            <span>Total (USD)</span>
                            <strong>${getTotalCartAmount().toFixed(2)}</strong>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Checkout;