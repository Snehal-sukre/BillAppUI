// OrderPage.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./OrderPage.css";

const OrderPage = ({
  activeItem,
  staffId,
  setStaffId,
  tableId,
  orderStatus,
  setOrderStatus,
  handleOrderSubmit,
  handleQuantityChange,
  orderItems,
  handleRemoveOrderItem,
}) => {
  const [ordDate, setOrdDate] = useState("");

  useEffect(() => {
    const savedStaffId = localStorage.getItem("staffId");
    if (savedStaffId) {
      setStaffId(savedStaffId);
    }

    const today = new Date().toISOString().split("T")[0];
    setOrdDate(today);
  }, [setStaffId]);

  const handleConfirmItem = () => {
    if (!activeItem) return;

    const newItem = {
      ...activeItem,
      quantity: activeItem.quantity,
      totalAmt: activeItem.quantity * activeItem.price,
    };

    handleOrderSubmit(newItem);
  };

  const submitOrderToBackend = async () => {
    const payload = {
      tableId: parseInt(tableId),
      staffId: parseInt(staffId),
      ordDate: ordDate,
      ordStatus: orderStatus,
      orderItems: orderItems.map((item) => ({
        menuId: item.id,
        quantity: item.quantity,
        totalAmt: item.totalAmt,
      })),
    };

    try {
      const response = await axios.post("http://localhost:8080/placeOrder", payload);
      alert("Order submitted successfully!");
      console.log("Response:", response.data);

      console.log("Attempting to update table availability for table ID:", tableId);

      try {
        const updateResponse = await axios.put(
          `http://localhost:8080/${tableId}/availability`, // Updated URL
          'occupied', // Sending the availability as a string in the request body
          {
            headers: {
              'Content-Type': 'text/plain', // Or 'application/json' if your backend expects JSON
            },
          }
        );
        console.log(`Table ${tableId} updated to occupied. Update Response:`, updateResponse.data);
      } catch (error) {
        console.error(`Error updating table ${tableId} availability:`, error);
        alert(`Error updating table ${tableId} status: ${error?.response?.data || error.message}`);
      }
    } catch (error) {
      alert("Failed to submit order!");
      console.error("Order submission error:", error);
    }
  };

  const handleQuantityIncrement = () => {
    if (activeItem) {
      handleQuantityChange(activeItem.id, activeItem.quantity + 1);
    }
  };

  const handleQuantityDecrement = () => {
    if (activeItem && activeItem.quantity > 1) {
      handleQuantityChange(activeItem.id, activeItem.quantity - 1);
    }
  };

  return (
    <div className="order-page-container">
      <h2>Current Order</h2>

      <div className="order-info">
        <p>
          <strong>Table ID:</strong> {tableId}
        </p>
        <p>
          <strong>Date:</strong> {ordDate}
        </p>
      </div>

      {activeItem && (
        <div className="active-order-form">
          <h4>Add Item to Order</h4>
          <p>
            <strong>{activeItem.name}</strong> - ₹{activeItem.price}
          </p>
          <label>
            Quantity:
            <div className="quantity-control">
              <button className="quantity-btn" onClick={handleQuantityDecrement}>
                -
              </button>
              <input
                type="number"
                min="1"
                value={activeItem.quantity}
                onChange={(e) => handleQuantityChange(activeItem.id, parseInt(e.target.value))}
                className="quantity-input"
              />
              <button className="quantity-btn" onClick={handleQuantityIncrement}>
                +
              </button>
            </div>
          </label>
          <p>Total: ₹{activeItem.quantity * activeItem.price}</p>
          <button className="confirm-item-btn" onClick={handleConfirmItem}>
            Confirm Item
          </button>
        </div>
      )}

      <h3>Order Items</h3>
      {orderItems.length === 0 ? (
        <p>No items added yet.</p>
      ) : (
        <ul className="order-items-list">
          {orderItems.map((item, index) => (
            <li key={index} className="order-item">
              <span>
                {item.name} (x{item.quantity}) - ₹{item.totalAmt}
              </span>
              <button className="remove-btn" onClick={() => handleRemoveOrderItem(index)}>
                ❌
              </button>
            </li>
          ))}
        </ul>
      )}

      {orderItems.length > 0 && (
        <div className="place-order-actions">
          <button className="submit-backend-btn" onClick={submitOrderToBackend}>
            Submit Order
          </button>
        </div>
      )}
    </div>
  );
};

export default OrderPage;