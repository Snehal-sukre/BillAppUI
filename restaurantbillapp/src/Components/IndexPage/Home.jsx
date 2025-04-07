import React from 'react';
import './Index.css';
import heroimg from '../../assets/heroimg.png'

const Home = () => {
  return (
    <div className="home-section">
      <div className="home-content">
        <div className="text-content">
          <h1>Welcome to Our Restaurant</h1>
          <p>We serve delicious food made with fresh ingredients and 
            lots of love. Whether you're with family, friends, or just
             treating yourself, our cozy place is perfect for every 
             moment. From tasty meals to sweet treats, there's something 
             for everyone. Come in, relax, and enjoy every bite!</p>
        </div>
        <div className="image-content">
          <img src={heroimg} alt="Delicious Food" />
        </div>
      </div>
    </div>
  );
};

export default Home;
