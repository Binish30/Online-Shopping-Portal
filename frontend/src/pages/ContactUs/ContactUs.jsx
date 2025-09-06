import React from 'react';

const ContactUs = () => {
    return (
        <div className="container my-5">
            <h1>Contact Us</h1>
            <p>Have questions? We'd love to hear from you!</p>

            <div className="row">
                <div className="col-md-6">
                    <h4>Our Address</h4>
                    <p>123 Shopping Lane<br />Commerce City, 400092<br />India</p>

                    <h4>Email Us</h4>
                    <p>support@shopper.com</p>

                    <h4>Call Us</h4>
                    <p>+91 98765 43210</p>
                </div>
            </div>
        </div>
    );
};

export default ContactUs;