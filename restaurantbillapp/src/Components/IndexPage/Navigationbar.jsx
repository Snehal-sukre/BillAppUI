import React, { useState } from 'react';
import './index.css';

const Navigationbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="navbar">
      <div className="logo">Foodie's Kitchen</div>

      {/* Hamburger Icon */}
      <div className="hamburger" onClick={toggleMenu}>
        <span></span>
        <span></span>
        <span></span>
      </div>

      {/* Navigation Links */}
      <ul className={`nav-links ${menuOpen ? 'show' : ''}`}>
        <li><a href="#home" onClick={() => setMenuOpen(false)}>Home</a></li>
        <li><a href="#about" onClick={() => setMenuOpen(false)}>About</a></li>
        <li><a href="#menu" onClick={() => setMenuOpen(false)}>Menu</a></li>
        <li><a href="#chefs" onClick={() => setMenuOpen(false)}>Chefs</a></li>
        <li><a href="#gallery" onClick={() => setMenuOpen(false)}>Gallery</a></li>
        <li><a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a></li>
        <li><a href="/login" className="login-btn" onClick={() => setMenuOpen(false)}>Login</a></li>
      </ul>
    </nav>
  );
};

export default Navigationbar;
