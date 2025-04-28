import React, { useState } from "react";
import OrderService from "./OrderService"; // Make sure to import the OrderService

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
  handlePlaceOrder,
}) => {
  // Calculate total order amount
  const totalOrderAmount = orderItems.reduce((sum, item) => sum + item.totalAmt, 0);

  // Set current date in YYYY-MM-DD format
  const [orderDate, setOrderDate] = useState(() => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = (today.getMonth() + 1).toString().padStart(2, '0'); // Month is 0-indexed
    const dd = today.getDate().toString().padStart(2, '0'); // Ensure two digits
    return `${yyyy}-${mm}-${dd}`;
  });

  // Handle adding order to database
  const handleOrderSubmitToDb = async (orderData) => {
    try {
      // Call the API to save the order
      const response = await OrderService.createOrder(orderData);
      if (response.status === 200) {
        alert("Order added successfully!");
        handleOrderSubmit(orderData); // Update order items in parent component
      } else {
        alert("Failed to add the order.");
      }
    } catch (error) {
      console.error("Error saving order:", error);
      alert("Error occurred while placing the order.");
    }
  };

  return (
    <div className="order-page">
      {/* Active Item Form */}
      {activeItem && (
        <form
          className="order-form"
          onSubmit={(e) => {
            e.preventDefault();
            if (!staffId.trim()) {
              alert("Please enter Staff ID before adding to order.");
              return;
            }

            // Prepare the order data
            const orderData = {
              menuId: activeItem.id,  // 🛑 You missed this earlier
              tableId: tableId,
              staffId: staffId,
              ordDate: orderDate,
              quantity: activeItem.quantity || 1,
              totalAmt: (activeItem.price || 0) * (activeItem.quantity || 1),
              orderStatus: orderStatus,
            };
            
            

            // Call the function to save order to database
            handleOrderSubmitToDb(orderData);
          }}
        >
          <h2>Order for Table {tableId}</h2>

          <div className="form-group">
            <label>Item Name</label>
            <input type="text" value={activeItem.name} readOnly />
          </div>

          <div className="form-group quantity-group">
            <label>Quantity</label>
            <div className="quantity-buttons">
              <button
                type="button"
                onClick={() =>
                  handleQuantityChange(
                    activeItem.id,
                    (activeItem.quantity || 1) - 1
                  )
                }
              >
                ➖
              </button>
              <input type="text" value={activeItem.quantity || 1} readOnly />
              <button
                type="button"
                onClick={() =>
                  handleQuantityChange(
                    activeItem.id,
                    (activeItem.quantity || 1) + 1
                  )
                }
              >
                ➕
              </button>
            </div>
          </div>

          <div className="form-group">
            <label>Table ID</label>
            <input type="text" value={tableId} readOnly />
          </div>

          <div className="form-group">
            <label>Staff ID</label>
            <input
              type="text"
              value={staffId} readOnly
              onChange={(e) => setStaffId(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Order Status</label>
            <select
              value={orderStatus}
              onChange={(e) => setOrderStatus(e.target.value)}
              required
            >
              <option value="Preparing">Preparing</option>
              <option value="Served">Served</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          <div className="form-group">
            <label>Total Amount</label>
            <input
              type="text"
              value={(activeItem.price || 0) * (activeItem.quantity || 1)}
              readOnly
            />
          </div>

          <div className="form-group">
            <label>Order Date</label>
            <input
              type="date"
              value={orderDate}
              onChange={(e) => setOrderDate(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="submit-order-btn">
            Add to Order
          </button>
        </form>
      )}

      {/* Display list of added items */}
      {orderItems.length > 0 && (
        <div className="order-summary">
          <h2>Current Order</h2>
          <ul>
            {orderItems.map((order, index) => (
              <li key={index} className="order-item">
                {order.name} × {order.quantity} = ₹{order.totalAmt} ({order.orderStatus})
                <button
                  className="remove-item-btn"
                  onClick={() => handleRemoveOrderItem(index)}
                >
                  ❌
                </button>
              </li>
            ))}
          </ul>

          <div className="form-group">
            <label>Total Order Amount</label>
            <input type="text" value={totalOrderAmount} readOnly />
          </div>

          <div className="form-group">
            <label>Order Date</label>
            <input type="date" value={orderDate} readOnly />
          </div>

          <button className="place-order-btn" onClick={handlePlaceOrder}>
            Place Order
          </button>
        </div>
      )}
    </div>
  );
};

export default OrderPage;
