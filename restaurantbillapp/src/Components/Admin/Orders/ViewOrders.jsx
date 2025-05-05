import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminOrders.css';
import { useNavigate } from 'react-router-dom';

const ViewOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAllOrders = async () => {
      try {
        const response = await axios.get('http://localhost:8080/viewAllOrders');
        setOrders(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message || 'Failed to fetch orders');
        setLoading(false);
      }
    };

    fetchAllOrders();
  }, []);

  const groupedOrders = orders.reduce((acc, order) => {
    if (!acc[order.orderId]) {
      acc[order.orderId] = {
        orderId: order.orderId,
        tableId: order.tableId,
        staffName: order.staffName,
        ordDate: order.ordDate,
        orderStatus: order.orderStatus,
        items: []
      };
    }
    acc[order.orderId].items.push({
      itemName: order.itemName,
      quantity: order.quantity,
      price: order.price
    });
    return acc;
  }, {});

  const pendingOrders = Object.values(groupedOrders).filter(order => order.orderStatus.toLowerCase() === 'pending');
  const completedOrders = Object.values(groupedOrders).filter(order => order.orderStatus.toLowerCase() === 'completed');

  if (loading) return <div>Loading orders...</div>;
  if (error) return <div>Error: {error}</div>;

  const handleGenerateBill = (orderId) => {
    navigate(`/admin/generateBill/${orderId}`);
};

  const handleViewBill = (orderId) => {
    navigate(`/admin/viewBill/${orderId}`);
  };
  

  return (
    <div className="admin-orders-container">
      <h2>All Orders</h2>
      <div className="status-columns">
        {/* Pending Orders */}
        <div className="status-column">
          <h3>Pending Orders</h3>
          <div className="orders-grid">
            {pendingOrders.map(order => (
              <div key={order.orderId} className="order-card">
                <h4>Order ID: {order.orderId}</h4>
                <p>Table ID: {order.tableId}</p>
                <p>Staff Name: {order.staffName}</p>
                <p>Order Date: {new Date(order.ordDate).toLocaleDateString()}</p>
                <p>Status: {order.orderStatus}</p>
                <table className="items-table">
                  <thead>
                    <tr>
                      <th>Item Name</th>
                      <th>Quantity</th>
                      <th>Rate (₹)</th>
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
                    onClick={() => handleGenerateBill(order.orderId)}
                    className="generate-bill-btn"
                >
                Generate Bill
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Completed Orders */}
        <div className="status-column">
          <h3>Completed Orders</h3>
          <div className="orders-grid">
            {completedOrders.map(order => (
              <div key={order.orderId} className="order-card">
                <h4>Order ID: {order.orderId}</h4>
                <p>Table ID: {order.tableId}</p>
                <p>Staff Name: {order.staffName}</p>
                <p>Order Date: {new Date(order.ordDate).toLocaleDateString()}</p>
                <p>Status: {order.orderStatus}</p>
                <table className="items-table">
                  <thead>
                    <tr>
                      <th>Item Name</th>
                      <th>Quantity</th>
                      <th>Rate (₹)</th>
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
                <button onClick={() => handleViewBill(order.orderId)}
                  className="generate-bill-btn">
                 View Bill
                </button>

              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewOrders;
