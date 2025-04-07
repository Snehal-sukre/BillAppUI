import React from 'react';
import about1 from '../../assets/about1.jpg'

const About = () => {
  return (
    <div className="about-section" id="about">
      <div className="about-container">
        <div className="about-image">
          <img src={about1} alt="Hotel View" />
        </div>
        <div className="about-content">
          <h2>About Us</h2>
          <h3>Welcome to Orchid Banquet</h3>
          <p>
            Since 2018, Orchid Banquet in Karve Nagar, Pune has been a trusted name in event hosting. 
            Known for exceptional service and customer satisfaction, our venue is ideal for weddings, 
            parties, and special events. Conveniently located at Warje Road, Opposite Kakade City, we’re easy to reach and ready to welcome you.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
