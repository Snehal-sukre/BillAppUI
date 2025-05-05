// ViewStaffOrders.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './ViewStaffOrders.css';

const ViewStaffOrders = () => {
  const [completedOrders, setCompletedOrders] = useState([]);
  const [pendingOrders, setPendingOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const staffId = localStorage.getItem('staffId');

  useEffect(() => {
    const fetchStaffOrders = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/viewStaffOrders/${staffId}`);
        const rawOrders = response.data;

        const groupedOrders = {};
        rawOrders.forEach((order) => {
          const orderId = order.orderId;

          if (!groupedOrders[orderId]) {
            groupedOrders[orderId] = {
              orderId: order.orderId,
              tableId: order.tableId,
              staffName: order.staffName,
              ordDate: order.ordDate,
              orderStatus: order.orderStatus,
              items: [],
            };
          }

          groupedOrders[orderId].items.push({
            itemName: order.itemName,
            price: order.price,
            quantity: order.quantity,
          });
        });

        const allOrders = Object.values(groupedOrders);
        const completed = allOrders.filter(order => order.orderStatus.toLowerCase() === 'completed');
        const pending = allOrders.filter(order => order.orderStatus.toLowerCase() !== 'completed');

        setCompletedOrders(completed);
        setPendingOrders(pending);
        setLoading(false);
      } catch (err) {
        setError(err.message || 'Failed to fetch orders');
        setLoading(false);
      }
    };

    if (staffId) {
      fetchStaffOrders();
    } else {
      setError('Staff ID not found in localStorage');
      setLoading(false);
    }
  }, [staffId]);

  const handleViewBill = (orderId) => {
    navigate(`/staff/viewStaffBill/${orderId}`);
  };

  if (loading) return <div className="staff-orders-loading">Loading orders...</div>;
  if (error) return <div className="staff-orders-error">Error: {error}</div>;

  return (
    <div className="staff-orders-wrapper">
      <h2 className="staff-orders-heading">Your Orders</h2>
      <div className="staff-orders-table-layout">

        {/* Pending Orders */}
        <div className="staff-orders-section">
          <h3>Pending Orders</h3>
          {pendingOrders.length > 0 ? (
            <div className="staff-order-cards-grid">
              {pendingOrders.map(order => (
                <div key={order.orderId} className="staff-order-card">
                  <h4>Order ID: {order.orderId}</h4>
                  <p>Table ID: {order.tableId}</p>
                  <p>Staff: {order.staffName}</p>
                  <p>Date: {new Date(order.ordDate).toLocaleDateString()}</p>
                  <p>Status: {order.orderStatus}</p>
                  <h5>Items:</h5>
                  <table className="staff-items-table">
                    <thead>
                      <tr>
                        <th>Item</th>
                        <th>Qty</th>
                        <th>Price (₹)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {order.items.map((item, index) => (
                        <tr key={index}>
                          <td>{item.itemName}</td>
                          <td>{item.quantity}</td>
                          <td>{item.price}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ))}
            </div>
          ) : (
            <p>No pending orders.</p>
          )}
        </div>

        {/* Completed Orders */}
        <div className="staff-orders-section">
          <h3>Completed Orders</h3>
          {completedOrders.length > 0 ? (
            <div className="staff-order-cards-grid">
              {completedOrders.map(order => (
                <div key={order.orderId} className="staff-order-card">
                  <h4>Order ID: {order.orderId}</h4>
                  <p>Table ID: {order.tableId}</p>
                  <p>Staff: {order.staffName}</p>
                  <p>Date: {new Date(order.ordDate).toLocaleDateString()}</p>
                  <p>Status: {order.orderStatus}</p>
                  <h5>Items:</h5>
                  <table className="staff-items-table">
                    <thead>
                      <tr>
                        <th>Item</th>
                        <th>Qty</th>
                        <th>Price (₹)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {order.items.map((item, index) => (
                        <tr key={index}>
                          <td>{item.itemName}</td>
                          <td>{item.quantity}</td>
                          <td>{item.price}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <button
                    onClick={() => handleViewBill(order.orderId)}
                    className="staff-generate-bill-btn"
                  >
                    View Bill
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p>No completed orders.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewStaffOrders;
