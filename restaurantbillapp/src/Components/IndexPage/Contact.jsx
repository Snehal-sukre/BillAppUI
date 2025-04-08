import React from 'react';
import { FaMapMarkerAlt, FaPhoneAlt, FaClock, FaFacebookF, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

const Contact = () => {
  return (
    <footer className="footer-section" id="contact">
      {/* 👇 Heading */}
      <div className="contact-heading">
        <p className="contact-subtitle">CONTACT</p>
        <h2 className="contact-title">
          Need Help? <span>Contact Us</span>
        </h2>
      </div>

      {/* 👇 Top Footer Section */}
      <div className="footer-top">
        <div className="footer-box">
          <FaMapMarkerAlt className="footer-icon" />
          <h4>Address</h4>
          <p>A108 Adam Street<br />New York, NY 535022</p>
        </div>

        <div className="footer-box">
          <FaPhoneAlt className="footer-icon" />
          <h4>Contact</h4>
          <p><strong>Phone:</strong> +1 5589 55488 55<br />
             <strong>Email:</strong> info@example.com</p>
        </div>

        <div className="footer-box">
          <FaClock className="footer-icon" />
          <h4>Opening Hours</h4>
          <p><strong>Mon-Sat:</strong> 11AM - 23PM<br />
             <strong>Sunday:</strong> Closed</p>
        </div>

        <div className="footer-box">
          <h4>Follow Us</h4>
          <div className="footer-socials">
            <a href="#"><FaXTwitter /></a>
            <a href="#"><FaFacebookF /></a>
            <a href="#"><FaInstagram /></a>
            <a href="#"><FaLinkedinIn /></a>
          </div>
        </div>
      </div>

      {/* 👇 Footer Bottom */}
      <div className="footer-bottom">
        <p>© Copyright <strong>Foodies Kitchen</strong> All Rights Reserved</p>
        <p>Designed by <span className="red">Snehal Sukre</span> Distributed by <span className="red">ThemeWagon</span></p>
      </div>
    </footer>
  );
};

export default Contact;
