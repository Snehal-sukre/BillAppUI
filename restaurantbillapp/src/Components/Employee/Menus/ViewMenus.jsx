import React, { useEffect, useState } from "react";
import MenuService from "./MenuService";
import "./ViewMenus.css";

const ViewMenus = () => {
  const [menuData, setMenuData] = useState({});
  const [error, setError] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showAll, setShowAll] = useState(false);
  const [categories, setCategories] = useState(["All"]); // State to store categories

  useEffect(() => {
    const fetchData = async () => { // Encapsulate the fetching logic
      try {
        const menuRes = await MenuService.getMenus();
        console.log("Menu data:", menuRes.data);
        const groupedMenus = groupByCategory(menuRes.data);
        setMenuData(groupedMenus);

        // Extract categories from the data
        const uniqueCategories = ["All", ...new Set(menuRes.data.map((item) => item.categoryName))];
        setCategories(uniqueCategories);

      } catch (err) {
        console.error(err);
        setError("Failed to load menu items.");
      }
    };
    fetchData();
  }, []);

  const groupByCategory = (menus) => {
    return menus.reduce((grouped, menu) => {
      const category = menu.categoryName || "Others";
      if (!grouped[category]) {
        grouped[category] = [];
      }
      grouped[category].push(menu);
      return grouped;
    }, {});
  };

  const filteredItems = selectedCategory === "All"
    ? Object.values(menuData).flat()
    : menuData[selectedCategory] || [];

  const displayedItems = showAll ? filteredItems.slice(0, 8) : filteredItems.slice(0, 4);

  return (
    <section className="menu-section" id="menu">
      <div className="menu-container">
        <h2 className="menu-title">
          Our <span>Menu</span>
        </h2>
        <p className="menu-subtitle">Delicious meals prepared fresh for you</p>

        <div className="menu-categories">
          {categories.map((category) => (
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
              {item.image && (
                <img
                  src={`http://localhost:8080${item.image}`}
                  alt={item.name}
                  className="menu-img"
                />
              )}
              <div className="menu-content">
                <h3>{item.name}</h3>
                <p>{item.description}</p>
                <span className="menu-price">₹{item.price}</span>
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

export default ViewMenus;
