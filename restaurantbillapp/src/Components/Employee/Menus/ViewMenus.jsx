import React, { useEffect, useState } from "react";
import MenuService from "./MenuService";
import "./ViewMenus.css"; // Make sure you have the CSS file

const ViewMenus = () => {
  const [menuData, setMenuData] = useState({});
  const [error, setError] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showAll, setShowAll] = useState(false);
  const [categories, setCategories] = useState(["All"]);
  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState([]); // State to hold the order

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError("");
      try {
        // Fetch categories
        const categoriesRes = await MenuService.getCategories();
        const categoryData = categoriesRes.data;
        if (categoryData && Array.isArray(categoryData)) {
          const categoryNames = ["All", ...categoryData.map((cat) => cat.name)];
          setCategories(categoryNames);
        } else {
          const errorMessage =
            categoryData?.message || "Invalid response from /viewCategory";
          setError(
            `Failed to load categories: ${errorMessage}. Expected an array.`
          );
          setLoading(false);
          return;
        }

        // Fetch menus
        const menuRes = await MenuService.getMenus();
        const menus = menuRes.data;
        if (menus && Array.isArray(menus)) {
          const groupedMenus = groupByCategory(menus);
          setMenuData(groupedMenus);
        } else {
          const errorMessage = menus?.message || "Invalid response from /viewmenus";
          setError(`Failed to load menus: ${errorMessage}. Expected an array.`);
          setLoading(false);
          return;
        }
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load menu items: " + err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const groupByCategory = (menus) => {
    const grouped = menus.reduce((groupedObj, menu) => {
      const category = menu.categoryName || "Others";
      if (!groupedObj[category]) {
        groupedObj[category] = [];
      }
      groupedObj[category].push(menu);
      return groupedObj;
    }, {});
    return grouped;
  };

  const handleAddToOrder = (item) => {
    // Basic add to order functionality.  Update as needed for your application.
    setOrder([...order, item]);
    console.log("Added to order:", item);
    // You might want to show a message to the user here (e.g., using a toast or alert)
  };

  const filteredItems =
    selectedCategory === "All"
      ? Object.values(menuData).flat()
      : menuData[selectedCategory] || [];

  const displayedItems = showAll ? filteredItems.slice(0, 8) : filteredItems.slice(0, 4);

  if (loading) {
    return (
      <section className="view-menu-section" id="menu">
        <div className="view-menu-container">
          <p>Loading menu...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="view-menu-section" id="menu">
        <div className="view-menu-container">
          <p className="error-message">{error}</p>
        </div>
      </section>
    );
  }

  return (
    <div className="staff-menus">
      <section className="view-menu-section" id="menu">
        <div className="view-menu-container">
          <h2 className="view-menu-title">
            Our <span>Menu</span>
          </h2>
          <p className="view-menu-subtitle">
            Delicious meals prepared fresh for you
          </p>

          <div className="view-menu-categories">
            {categories.map((category) => (
              <button
                key={category}
                className={`view-category-btn ${
                  selectedCategory === category ? "active" : ""
                }`}
                onClick={() => {
                  setSelectedCategory(category);
                  setShowAll(false);
                }}
              >
                {category}
              </button>
            ))}
          </div>
          {filteredItems.length === 0 ? (
            <p className="no-menu-message">
              Currently there are no menus in this category.
            </p>
          ) : (
            <>
              <div className="view-menu-grid">
                {displayedItems.map((item) => (
                  <div key={item.id} className="view-menu-card">
                    {item.image && (
                      <img
                        src={`http://localhost:8080${item.image}`}
                        alt={item.name}
                        className="view-menu-img"
                      />
                    )}
                    <div className="view-menu-content">
                      <h3>{item.name}</h3>
                      <p>{item.description}</p>
                      <span className="view-menu-price">₹{item.price}</span>
                      <button
                        className="add-to-order-btn" // Added class for styling
                        onClick={() => handleAddToOrder(item)}
                      >
                        Add to Order
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {filteredItems.length > 4 && (
                <div className="view-all-container">
                  <button
                    className="view-all-btn"
                    onClick={() => setShowAll(!showAll)}
                  >
                    {showAll ? "Show Less" : "View More"}
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  );
};

export default ViewMenus;
