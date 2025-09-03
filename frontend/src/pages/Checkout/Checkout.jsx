import React, { useState } from "react";
import "./Checkout.css";
import { useContext } from "react";
import { ShopContext } from "../../context/ShopContext";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const { all_products, cartItems, getTotalCartAmount, clearCart } =
    useContext(ShopContext);
  const [shippingDetails, setShippingDetails] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    address_flat: "",
    address_area: "",
    address_landmark: "",
    city: "",
    zip_code: "",
  });

  const navigate = useNavigate();

  const changeHandler = (e) => {
    setShippingDetails({ ...shippingDetails, [e.target.name]: e.target.value });
  };

  const placeOrder = async (e) => {
    e.preventDefault();

    const orderCartItems = all_products
      .filter(product => cartItems[product.id] > 0)
      .map(product => ({ id: product.id, quantity: cartItems[product.id] }));

    const combinedAddress = `${shippingDetails.address_flat}, ${shippingDetails.address_area}, ${shippingDetails.address_landmark}`;


    const finalShippingAddress = {
      first_name: shippingDetails.first_name,
      last_name: shippingDetails.last_name,
      email: shippingDetails.email,
      phone: shippingDetails.phone,
      address: combinedAddress,
      city: shippingDetails.city,
      zip_code: shippingDetails.zip_code,
    };

    const orderData = {
      cart: orderCartItems,
      shippingAddress: finalShippingAddress
    };

    try {
      const response = await fetch('http://localhost:8000/api/create-order/', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('auth-token')}`
        },
        body: JSON.stringify(orderData)
      });

      const responseData = await response.json();

      if (response.ok) {

        clearCart();
        navigate('/order-success', { state: { order: responseData } });
      } else {
        alert(`Failed to place the order: ${responseData.error || responseData.detail || 'Unknown error'}`);
      }
    } catch (error) {
      alert(`An error occurred: ${error.message}`);
    }
  };

  return (
    <div className="checkout-page container my-5">
      <div className="checkout-header text-center">
        <h1>Checkout</h1>
        <p className="lead">
          Please fill in your shipping and payment details to complete your
          order.
        </p>
      </div>

      <div className="row g-5">
        <div className="col-md-7 col-lg-8">
          <h4 className="mb-3">Shipping address</h4>
          <form className="needs-validation" onSubmit={placeOrder}>
            <div className="row g-3">
              <div className="col-sm-6">
                <label htmlFor="firs_name" className="form-label">
                  First name
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="first_name"
                  value={shippingDetails.first_name}
                  onChange={changeHandler}
                  required
                />
              </div>

              <div className="col-sm-6">
                <label htmlFor="last_name" className="form-label">
                  Last name
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="last_name"
                  value={shippingDetails.last_name}
                  onChange={changeHandler}
                  required
                />
              </div>

              <div className="col-12">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  value={shippingDetails.email}
                  onChange={changeHandler}
                  placeholder="E.g. you@example.com"
                  required
                />
              </div>

              <div className="col-12">
                <label htmlFor="phone" className="form-label">
                  Phone
                </label>
                <input
                  type="tel"
                  className="form-control"
                  name="phone"
                  value={shippingDetails.phone}
                  onChange={changeHandler}
                  required
                />
              </div>

              <div className="col-12">
                <label htmlFor="address_flat" className="form-label">
                  Flat, House no., Building
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="address_flat"
                  value={shippingDetails.address_flat}
                  onChange={changeHandler}
                  placeholder="E.g. flat 604, sky high building"
                  required
                />
              </div>
              <div className="col-12">
                <label htmlFor="address_area" className="form-label">
                  Area, Street
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="address_area"
                  value={shippingDetails.address_area}
                  onChange={changeHandler}
                  placeholder="E.g. 1234 Main St"
                />
              </div>
              <div className="col-12">
                <label htmlFor="address_landmark" className="form-label">
                  Landmark
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="address_landmark"
                  value={shippingDetails.address_landmark}
                  onChange={changeHandler}
                  placeholder="E.g. near metro station"
                />
              </div>

              <div className="col-md-6">
                <label htmlFor="city" className="form-label">
                  City
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="city"
                  value={shippingDetails.city}
                  onChange={changeHandler}
                  required
                />
              </div>

              <div className="col-md-6">
                <label htmlFor="zip_code" className="form-label">
                  Zip Code
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="zip_code"
                  value={shippingDetails.zip_code}
                  onChange={changeHandler}
                  required
                />
              </div>
            </div>

            <hr className="my-4" />

            <h4 className="mb-3">Payment</h4>
            <div className="my-3">
              <p>
                This is a demo store. No real payment will be processed. Your
                order will be treated as "Cash on Delivery".
              </p>
            </div>

            <hr className="my-4" />

            <button className="w-100 btn btn-primary btn-lg" type="submit">
              Place Order
            </button>
          </form>
        </div>

        <div className="col-md-5 col-lg-4 order-md-last">
          <h4 className="d-flex justify-content-between align-items-center mb-3">
            <span className="text-primary">Your Cart</span>
            <span className="badge bg-primary rounded-pill">
            </span>
          </h4>
          <ul className="list-group mb-3">
            {all_products.map((product) => {
              if (cartItems[product.id] > 0) {
                return (
                  <li
                    key={product.id}
                    className="list-group-item d-flex justify-content-between lh-sm"
                  >
                    <div>
                      <h6 className="my-0">{product.name}</h6>
                      <small className="text-muted">
                        Quantity: {cartItems[product.id]}
                      </small>
                    </div>
                    <span className="text-muted">₹{(parseFloat(product.new_price) * cartItems[product.id]).toFixed(2)}</span>
                  </li>
                );
              }
              return null;
            })}
            <li className="list-group-item d-flex justify-content-between bg-light">
              <div className="text-success">
                <h6 className="my-0">Promo code</h6>
                <small>EXAMPLECODE</small>
              </div>
              <span className="text-success">−₹0.00</span>
            </li>
            <li className="list-group-item d-flex justify-content-between">
              <span>Total (INR)</span>
              <strong>₹{getTotalCartAmount().toFixed(2)}</strong>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
