// src/components/CartItems/CartItems.jsx

import React, { useContext } from 'react';
import './CartItems.css';
import { ShopContext } from '../../context/ShopContext';
import { XCircle } from 'lucide-react';

const CartItems = () => {
    const { all_products, cartItems, removeFromCart, getTotalCartAmount } = useContext(ShopContext);

    return (
        <div className="cartitems container my-5">
            {/* Header Row - This will now align perfectly with the item rows */}
            <div className="cartitems-format cartitems-format-header">
                <p>Products</p>
                <p>Title</p>
                <p>Price</p>
                <p>Quantity</p>
                <p>Total</p>
                <p>Remove</p>
            </div>
            <hr />

            {/* Item Rows - We loop and create a row for each item */}
            {all_products.map((e) => {
                if (cartItems[e.id] > 0) {
                    return (
                        <div key={e.id}>
                            <div className="cartitems-format">
                                <img src={e.image} alt="" className='carticon-product-icon' />
                                <p>{e.name}</p>
                                <p>${e.new_price.toFixed(2)}</p>
                                <button className='cartitems-quantity'>{cartItems[e.id]}</button>
                                <p>${(e.new_price * cartItems[e.id]).toFixed(2)}</p>
                                <XCircle className="cartitems-remove-icon" onClick={() => { removeFromCart(e.id) }} />
                            </div>
                            <hr />
                        </div>
                    );
                }
                return null;
            })}

            {/* The rest of the component (Totals and Promo Code) remains the same */}
            <div className="cartitems-down">
                <div className="cartitems-total">
                    <h1>Cart Totals</h1>
                    <div>
                        <div className="cartitems-total-item">
                            <p>Subtotal</p>
                            <p>${getTotalCartAmount().toFixed(2)}</p>
                        </div>
                        <hr />
                        <div className="cartitems-total-item">
                            <p>Shipping Fee</p>
                            <p>Free</p>
                        </div>
                        <hr />
                        <div className="cartitems-total-item">
                            <h3>Total</h3>
                            <h3>${getTotalCartAmount().toFixed(2)}</h3>
                        </div>
                    </div>
                    <button className="btn btn-primary mt-4">PROCEED TO CHECKOUT</button>
                </div>

                <div className="cartitems-promocode">
                    <p>If you have a promo code, enter it here</p>
                    <div className="cartitems-promobox input-group">
                        <input type="text" className="form-control" placeholder='Promo code' />
                        <button className="btn btn-dark">Submit</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CartItems;