import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  const year = new Date();
  return (
    <footer className="footer bg-dark text-white py-4 mt-auto">
      <div className="container">
        <div className="d-flex justify-content-between align-items-center">

          <div className="footer-copyright">
            <p className="mb-0">&copy;{year.getFullYear()}, All rights reserved</p>
          </div>

          <div className="footer-links">
            <Link to="/about-us" className="text-white me-3">About Us</Link>
            <Link to="/contact-us" className="text-white">Contact Us</Link>
          </div>

        </div>
      </div>
    </footer>
  );
}

export default Footer;