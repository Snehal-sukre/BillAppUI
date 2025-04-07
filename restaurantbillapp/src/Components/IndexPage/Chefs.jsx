import React from 'react';
import chef1 from '../../assets/chefs-1.jpg';
import chef2 from '../../assets/chefs-2.jpg';
import chef3 from '../../assets/chefs-3.jpg';

const chefsData = [
  {
    name: 'Sanjeev Kapoor',
    role: 'Master Chef',
    img: chef1,
    info: 'Expert in continental cuisine with 20+ years of experience.',
  },
  {
    name: 'Nidhi Choubey',
    role: 'Patissier',
    img: chef2,
    info: 'Specialist in pastries and French desserts.',
  },
  {
    name: 'Vikas Khanna',
    role: 'Cook',
    img: chef3,
    info: 'Loves creating traditional Indian thalis.',
  },
];

const Chefs = () => {
  return (
    <section className="chefs-section" id="chefs">
      <div className="chefs-container">
        <h2 className="chefs-title">Our <span>Chefs</span></h2>
        <p className="chefs-subtitle">Meet our professional chefs</p>

        <div className="chefs-grid">
          {chefsData.map((chef, index) => (
            <div className="chef-card" key={index}>
              <img src={chef.img} alt={chef.name} className="chef-img" />
              <div className="chef-info">
                <h3>{chef.name}</h3>
                <p className="chef-role">{chef.role}</p>
                <p className="chef-desc">{chef.info}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Chefs;
