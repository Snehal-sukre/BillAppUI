import React, { useEffect, useState } from "react";
import MenuService from "./MenuService";
import "./ViewMenus.css";
import { useNavigate, useParams } from "react-router-dom";
import OrderPage from "../Orders/OrderPage";

const ViewMenus = () => {
  const [menuData, setMenuData] = useState({});
  const [error, setError] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showAll, setShowAll] = useState(false);
  const [categories, setCategories] = useState(["All"]);
  const [loading, setLoading] = useState(true);
  const [orderItems, setOrderItems] = useState([]);
  const [activeItem, setActiveItem] = useState(null);
  const [staffId, setStaffId] = useState(localStorage.getItem("staffId") || "");
  const [orderStatus, setOrderStatus] = useState("Preparing");
  const navigate = useNavigate();
  const { tableId: urlTableId } = useParams();

  const tableId = localStorage.getItem("selectedTableId") || urlTableId;

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
          throw new Error(`Failed to load categories`);
        }

        const menuRes = await MenuService.getMenus();
        const menus = menuRes.data;
        if (menus && Array.isArray(menus)) {
          const groupedMenus = groupByCategory(menus);
          setMenuData(groupedMenus);
        } else {
          throw new Error(`Failed to load menus`);
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
    return menus.reduce((groupedObj, menu) => {
      const category = menu.categoryName || "Others";
      if (!groupedObj[category]) {
        groupedObj[category] = [];
      }
      groupedObj[category].push(menu);
      return groupedObj;
    }, {});
  };

  const handleAddToOrder = (item) => {
    setActiveItem({
      ...item,
      tableId: tableId,
      quantity: 1,
      totalAmt: item.price,
    });
  };

  const handleOrderSubmit = (orderData) => {
    setOrderItems((prevItems) => [...prevItems, orderData]);
    setActiveItem(null);
    console.log("Item added to order:", orderData);
  };

  const handleRemoveOrderItem = (index) => {
    const newOrderItems = [...orderItems];
    newOrderItems.splice(index, 1);
    setOrderItems(newOrderItems);
  };

  const handlePlaceOrder = () => {
    if (orderItems.length === 0) {
      alert("No items to place order!");
      return;
    }
    console.log("Placing order with items:", orderItems);
    alert("Order placed successfully!");
    setOrderItems([]);
  };

  const filteredItems =
    selectedCategory === "All"
      ? Object.values(menuData).flat()
      : menuData[selectedCategory] || [];

  const displayedItems = showAll ? filteredItems : filteredItems.slice(0, 6);

  const handleQuantityChange = (itemId, newQuantity) => {
    setActiveItem((prevActiveItem) =>
      prevActiveItem && prevActiveItem.id === itemId
        ? { ...prevActiveItem, quantity: Math.max(1, newQuantity) }
        : prevActiveItem
    );
  };

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
    <div className="menu-order">
      <div className="staff-menus">
        <div className="back-btn-container">
          <button
            className="back-btn"
            onClick={() => navigate("/staff/viewtables")}
          >
            ⬅️ Back to View Dining Tables
          </button>
        </div>

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
                          className="add-to-order-btn"
                          onClick={() => handleAddToOrder(item)}
                        >
                          Add to Order
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

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
      </div>

      <OrderPage
        activeItem={activeItem}
        staffId={staffId}
        setStaffId={setStaffId}
        tableId={tableId}
        orderStatus={orderStatus}
        setOrderStatus={setOrderStatus}
        handleOrderSubmit={handleOrderSubmit}
        handleQuantityChange={handleQuantityChange}
        orderItems={orderItems}
        handleRemoveOrderItem={handleRemoveOrderItem}
        handlePlaceOrder={handlePlaceOrder}
      />
    </div>
  );
};

export default ViewMenus;
