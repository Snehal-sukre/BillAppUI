import React, { useState } from 'react';
import pizza from '../../assets/pizza.jpg';
import idli from '../../assets/idli.jpg';
import pavbhaji from '../../assets/pavbhaji.jpg';
import rasmalai from '../../assets/rasmalai.jpg';
import gulabjamun from '../../assets/gulabjamun.jpg';
import paneer from '../../assets/paneer.jpg';
import Dhokla from '../../assets/Dhokla.jpg';
import lunch from '../../assets/lunch.jpg';
import Misal from '../../assets/Misal.jpg';
import upma from '../../assets/upma.webp';
import poha from '../../assets/poha.webp';
import cake from '../../assets/cake.jpg';
import thali from '../../assets/thali.webp';

const menuItems = [
  { name: "Poha", description: "Flattened rice cooked with turmeric & spices.", price: "₹109", image: poha, category: "Breakfast" },
  { name: "Soft Idli", description: "Steamed rice cakes served with chutney & sambhar.", price: "₹199", image: idli, category: "Breakfast" },
  { name: "Upma", description: "Healthy semolina cooked with veggies & spices.", price: "₹129", image: upma, category: "Breakfast" },

  { name: "Pav Bhaji", description: "Spicy mashed veggies with butter-toasted pav.", price: "₹149", image: pavbhaji, category: "Snacks" },
  { name: "Dhokla", description: "Soft & spongy Gujarati steamed snack.", price: "₹99", image: Dhokla, category: "Snacks" },
  { name: "Misal Pav", description: "Spicy curry made from moth beans served with pav.", price: "₹139", image: Misal, category: "Snacks" },
  { name: "Delicious Pizza", description: "Loaded with cheese, sauce, and veggies.", price: "₹249", image: pizza, category: "Snacks" },

  { name: "Rasmalai", description: "Soft cheese patties soaked in sweet milk.", price: "₹99", image: rasmalai, category: "Desserts" },
  { name: "Gulab Jamun", description: "Soft, melt-in-mouth sweet balls soaked in syrup.", price: "₹79", image: gulabjamun, category: "Desserts" },
  { name: "Cake Slice", description: "Soft and spongy chocolate cake slice.", price: "₹119", image: cake, category: "Desserts" },

  { name: "Paneer Masala", description: "Rich creamy curry with paneer cubes.", price: "₹229", image: paneer, category: "Lunch" },
  { name: "Lunch Thali", description: "Complete meal with chapati, rice, sabji & more.", price: "₹299", image: lunch, category: "Lunch" },
  { name: "Special Thali", description: "Authentic traditional Indian thali.", price: "₹349", image: thali, category: "Lunch" },
];

const categories = ["All", "Breakfast", "Snacks", "Desserts", "Lunch"];

const Menu = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showAll, setShowAll] = useState(false);

  const filteredItems =
    selectedCategory === "All"
      ? menuItems
      : menuItems.filter(item => item.category === selectedCategory);

  const displayedItems = showAll ? filteredItems.slice(0, 8) : filteredItems.slice(0, 4);

  return (
    <section className="menu-section" id="menu">
      <div className="menu-container">
        <h2 className="menu-title">Our <span>Menu</span></h2>
        <p className="menu-subtitle">Delicious meals prepared fresh for you</p>

        <div className="menu-categories">
          {categories.map(category => (
            <button
              key={category}
              className={`category-btn ${selectedCategory === category ? "active" : ""}`}
              onClick={() => {
                setSelectedCategory(category);
                setShowAll(false);
              }}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="menu-grid">
          {displayedItems.map((item, index) => (
            <div key={index} className="menu-card">
              <img src={item.image} alt={item.name} className="menu-img" />
              <div className="menu-content">
                <h3>{item.name}</h3>
                <p>{item.description}</p>
                <span className="menu-price">{item.price}</span>
              </div>
            </div>
          ))}
        </div>

        {filteredItems.length > 4 && (
          <div className="view-all-container">
            <button className="view-all-btn" onClick={() => setShowAll(!showAll)}>
              {showAll ? "Show Less" : "View More"}
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Menu;
