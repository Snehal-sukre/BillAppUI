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
          <p>Near Kakade City<br />KarveNager, Pune 411052</p>
        </div>

        <div className="footer-box">
          <FaPhoneAlt className="footer-icon" />
          <h4>Contact</h4>
          <p><strong>Phone:</strong> +91 8789 5548 55<br />
             <strong>Email:</strong> foodieskitchen@gmail.com</p>
        </div>

        <div className="footer-box">
          <FaClock className="footer-icon" />
          <h4>Opening Hours</h4>
          <p><strong>Mon-Sat:</strong> 11AM - 23PM<br />
             <strong>Sunday:</strong> 9AM - 23PM</p>
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
        <p>Designed by <span className="red">Snehal Sukre</span> Distributed by <span className="red">Software Company</span></p>
      </div>
    </footer>
  );
};

export default Contact;
