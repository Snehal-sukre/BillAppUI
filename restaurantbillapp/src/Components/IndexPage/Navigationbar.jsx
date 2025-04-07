import React from 'react';
import './index.css';

const Navigationbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">Foodie's Kitchen</div>
      <ul className="nav-links">
        <li><a href="#home">Home</a></li>
        <li><a href="#about">About</a></li>
        <li><a href="#menu">Menu</a></li>
        <li><a href="#chefs">Chefs</a></li>
        <li><a href="#gallery">Gallery</a></li>
        <li><a href="#contact">Contact</a></li>
        <li><a href="/login" className="login-btn">Login</a></li> {/* Keep /login as it's a route */}
      </ul>
    </nav>
  );
};

export default Navigationbar;
