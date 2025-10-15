// src/components/CartItems/CartItems.jsx

import React, { useContext } from 'react';
import './CartItems.css';
import { ShopContext } from '../../context/ShopContext';
import { XCircle, Plus, Minus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CartItems = () => {
    const { all_products, cartItems, removeFromCart, getTotalCartAmount, addToCart, deleteFromCart, getTotalCartItems } = useContext(ShopContext);
    const navigate = useNavigate();
    const totalItems = getTotalCartItems();

    return (
        <div className="cartitems container my-5">
            {/* --- 1. DESKTOP HEADER (This is modified) --- */}
            {/* These 'd-none d-md-grid' classes hide this on mobile screens */}
            <div className="cartitems-format cartitems-format-header d-none d-md-grid">
                <p>Products</p>
                <p>Title</p>
                <p>Price</p>
                <p>Quantity</p>
                <p>Total</p>
                <p>Remove</p>
            </div>
            <hr className="d-none d-md-block" />

            {/* --- 2. LOGIC FOR EMPTY CART (This is new) --- */}
            {totalItems === 0 ? (
                <div className="text-center my-5">
                    <h3>Your cart is empty.</h3>
                    <p>Looks like you haven't added anything to your cart yet.</p>
                </div>
            ) : (
                // If the cart is not empty, map over the products
                all_products.map((e) => {
                    if (cartItems[e.id] > 0) {
                        return (
                            <div key={e.id}>
                                {/* --- 3. DESKTOP VIEW (This is modified) --- */}
                                {/* This view is hidden on mobile */}
                                <div className="cartitems-format d-none d-md-grid">
                                    <img src={e.image} alt={e.name} className='carticon-product-icon' />
                                    <p>{e.name}</p>
                                    <p>₹{parseFloat(e.new_price).toFixed(2)}</p>
                                    <div className="cartitems-quantity-control">
                                        <button onClick={() => { removeFromCart(e.id) }}><Minus size={16} /></button>
                                        <div className='cartitems-quantity-display'>{cartItems[e.id]}</div>
                                        <button onClick={() => { addToCart(e.id) }}><Plus size={16} /></button>
                                    </div>
                                    <p>₹{(parseFloat(e.new_price) * cartItems[e.id]).toFixed(2)}</p>
                                    <XCircle className="cartitems-remove-icon" onClick={() => { deleteFromCart(e.id) }} />
                                </div>

                                {/* --- 4. MOBILE VIEW (This is new) --- */}
                                {/* This view is ONLY visible on mobile (d-md-none) */}
                                <div className="cartitems-mobile-view d-md-none">
                                    <div className="mobile-view-left">
                                        <img src={e.image} alt={e.name} className='carticon-product-icon' />
                                    </div>
                                    <div className="mobile-view-right">
                                        <p className="mobile-product-name">{e.name}</p>
                                        <p className="mobile-product-price">Price: ₹{parseFloat(e.new_price).toFixed(2)}</p>
                                        <div className="d-flex justify-content-between align-items-center mt-2">
                                            <div className="cartitems-quantity-control">
                                                <button onClick={() => { removeFromCart(e.id) }}><Minus size={16} /></button>
                                                <div className='cartitems-quantity-display'>{cartItems[e.id]}</div>
                                                <button onClick={() => { addToCart(e.id) }}><Plus size={16} /></button>
                                            </div>
                                            <XCircle className="cartitems-remove-icon" size={24} onClick={() => { deleteFromCart(e.id) }} />
                                        </div>
                                    </div>
                                </div>
                                <hr />
                            </div>
                        );
                    }
                    return null;
                })
            )}

            {/* --- 5. TOTALS SECTION (This is modified) --- */}
            {/* This section now only appears if there are items in the cart */}
            {totalItems > 0 && (
                <div className="cartitems-down">
                    <div className="cartitems-total">
                        <h1>Cart Totals</h1>
                        <div>
                            <div className="cartitems-total-item">
                                <p>Subtotal</p>
                                <p>₹{getTotalCartAmount().toFixed(2)}</p>
                            </div>
                            <hr />
                            <div className="cartitems-total-item">
                                <p>Shipping Fee</p>
                                <p>Free</p>
                            </div>
                            <hr />
                            <div className="cartitems-total-item">
                                <h3>Total</h3>
                                <h3>₹{getTotalCartAmount().toFixed(2)}</h3>
                            </div>
                        </div>
                        <button
                            className="btn btn-primary mt-4 w-100"
                            onClick={() => {
                                if (localStorage.getItem('auth-token')) {
                                    navigate('/checkout');
                                } else {
                                    alert('You must be logged in to proceed to checkout.');
                                    navigate('/login');
                                }
                            }}
                        >
                            PROCEED TO CHECKOUT
                        </button>
                    </div>

                    <div className="cartitems-promocode">
                        <p>If you have a promo code, enter it here</p>
                        <div className="cartitems-promobox input-group">
                            <input type="text" className="form-control" placeholder='Promo code' />
                            <button className="btn btn-dark">Submit</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default CartItems;