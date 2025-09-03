import React from 'react';
import "./Footer.css";

const Footer = () => {
  const year = new Date();

  return (
    <footer className="footer bg-dark text-white text-center py-4 mt-auto">
      <div className="container">
        <p className="mb-0">&copy;{year.getFullYear()}, All rights reserved</p>
      </div>
    </footer>
  );
};

export default Footer;