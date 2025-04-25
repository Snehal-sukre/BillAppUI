import React, { useEffect, useState } from "react";
import MenuService from "./MenuService";
import OrderPage from "../Orders/OrderPage"; // Assuming you have an OrderPage component
import "./ViewMenus.css"; // Make sure you have the correct CSS

const ViewMenus = () => {
  const [menuData, setMenuData] = useState({});
  const [error, setError] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showAll, setShowAll] = useState(false);
  const [categories, setCategories] = useState(["All"]);
  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState([]); // Order state
  const [activeItem, setActiveItem] = useState(null); // Active item for order form

  // Fetch menu categories and menu items
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError("");
      try {
        const categoriesRes = await MenuService.getCategories();
        const categoryData = categoriesRes.data;
        if (categoryData && Array.isArray(categoryData)) {
          const categoryNames = ["All", ...categoryData.map((cat) => cat.name)];
          setCategories(categoryNames);
        } else {
          throw new Error(
            `Failed to load categories: Expected an array but got ${typeof categoryData}`
          );
        }

        const menuRes = await MenuService.getMenus();
        const menus = menuRes.data;
        if (menus && Array.isArray(menus)) {
          const groupedMenus = groupByCategory(menus);
          setMenuData(groupedMenus);
        } else {
          throw new Error(
            `Failed to load menus: Expected an array but got ${typeof menus}`
          );
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

  // Group menus by category
  const groupByCategory = (menus) => {
    return menus.reduce((groupedObj, menu) => {
      const category = menu.categoryName || "Others";
      if (!groupedObj[category]) {
        groupedObj[category] = [];
      }
      groupedObj[category].push(menu);
      return groupedObj;
    }, {});
  };

  // Handle adding item to order
  const handleAddToOrder = (item) => {
    setActiveItem(item);
    console.log("Added to order:", item);
  };

  // Handle order form submission
  const handleOrderSubmit = (orderData) => {
    console.log("Order submitted:", orderData);
    setOrder([...order, orderData]);
    setActiveItem(null); // Reset active item after submission
  };

  // Filter menu items based on selected category
  const filteredItems =
    selectedCategory === "All"
      ? Object.values(menuData).flat()
      : menuData[selectedCategory] || [];

  // Show more or less items
  const displayedItems = showAll ? filteredItems : filteredItems.slice(0, 6);

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

          {/* Category Buttons */}
          <div className="view-menu-categories">
            {categories.map((category) => (
              <button
                key={category}
                className={`view-category-btn ${
                  selectedCategory === category ? "active" : ""
                }`}
                onClick={() => {
                  setSelectedCategory(category);
                  setShowAll(false); // Reset "Show More" when a new category is selected
                }}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Menu Items */}
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
                        className="add-to-order-btn"
                        onClick={() => handleAddToOrder(item)}
                      >
                        Add to Order
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Show more/less button */}
              {filteredItems.length > 6 && (
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

      {/* Order Form */}
      {activeItem && (
        <div className="order-form-container">
          <OrderPage
            onSubmit={handleOrderSubmit}
            prefill={{
              ...activeItem,
              tableId: "", // Set your default values here
              staffId: "",
              quantity: 1,
              totalAmt: activeItem.price, // Calculate total amount based on menu item
              orderStatus: "Placed", // Default order status
            }}
          />
        </div>
      )}
    </div>
  );
};

export default ViewMenus;
