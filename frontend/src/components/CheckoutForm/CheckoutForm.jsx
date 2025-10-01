// import React, { useState } from 'react';
// import {PaymentElement, useStripe, useElemets} from '@stripe/react-stripe-js';

// const CheckoutForm = ({ clientSecret }) => {
//     const stripe = useStripe();
//     const elements = useElemets();

//     const[message, setMessage] = useState(null);
//     const[isProcessing, setIsProcessing] = useState(false);

//     const handleSubmit = async(e) => {
//         e.PreventDefault();

//         if(!stripe || !elements) {
//             return;
//         }

//         setIsProcessing(true);

//         const { error, paymentIntent} = await stripe.confirmPayment({
//             elements,
//             confirmParams: {},
//             redirect:"if_required"
//         });

//         if(error) {
//             setMessage(error.message);
//         } else if(paymentIntent && paymentIntent.status === 'succeeded') {
//             setMessage("Payment succeeded!");
//         } else {
//             setMessage("An unexcepted error occurred.");
//         }

//         setIsProcessing(false);
//     };

//   return (
//     <form id="payment-form" onSubmit={handleSubmit}>
//         <PaymentElement id="payment-element" />
//         <button disabled={isProcessing || !stripe || !elements} id="submit" className="w-100 btn btn-primary btn-lng mt-4">
//             <span id="button-text">
//                 {isProcessing?"Processing...":"Pay Now"}
//             </span>
//         </button>
//         {message && <div id="payment-message" className="alert alert-info mt-3">{message}</div>}  
//     </form>
//   );
// };

// export default CheckoutForm;

import React, { useState } from "react";
import { PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';

const CheckoutForm = ({ onPaymentSuccess, shippingDetails }) => {
    const stripe = useStripe();
    const elements = useElements();

    const [message, setMessage] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        // Simple validation to ensure shipping details are filled
        if (!shippingDetails.firstName || !shippingDetails.address_flat || !shippingDetails.city || !shippingDetails.zipCode) {
            setMessage("Please fill in all required shipping address fields.");
            return;
        }

        setIsProcessing(true);

        const { error, paymentIntent } = await stripe.confirmPayment({
            elements,
            redirect: "if_required"
        });

        if (error) {
            setMessage(error.message);
            setIsProcessing(false);
        } else if (paymentIntent && paymentIntent.status === 'succeeded') {
            setMessage("Payment Succeeded! Please wait while we confirm your order.");
            onPaymentSuccess(paymentIntent.id); // Pass the ID to the parent
        } else {
            setMessage("An unexpected error occurred.");
            setIsProcessing(false);
        }
    };

    return (
        <form id="payment-form" onSubmit={handleSubmit}>
            <PaymentElement id="payment-element" />
            <button disabled={isProcessing || !stripe || !elements} id="submit" className="w-100 btn btn-primary btn-lg mt-4">
                <span>
                    {isProcessing ? "Processing..." : "Pay Now"}
                </span>
            </button>
            {message && <div id="payment-message" className="alert alert-info mt-3">{message}</div>}
        </form>
    );
};

export default CheckoutForm;