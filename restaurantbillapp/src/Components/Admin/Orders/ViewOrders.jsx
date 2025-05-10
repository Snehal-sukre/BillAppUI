import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminOrders.css';
import { useNavigate } from 'react-router-dom';

const ViewOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedView, setSelectedView] = useState('pending');
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 4;
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

  useEffect(() => {
    setCurrentPage(1); // Reset to page 1 on view change
  }, [selectedView]);

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

  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders =
    selectedView === 'pending'
      ? pendingOrders.slice(indexOfFirstOrder, indexOfLastOrder)
      : completedOrders.slice(indexOfFirstOrder, indexOfLastOrder);

  const totalPages =
    selectedView === 'pending'
      ? Math.ceil(pendingOrders.length / ordersPerPage)
      : Math.ceil(completedOrders.length / ordersPerPage);

  const handleGenerateBill = (orderId) => {
    navigate(`/admin/generateBill/${orderId}`);
  };

  const handleViewBill = (orderId) => {
    navigate(`/admin/viewBill/${orderId}`);
  };

  const renderPagination = () => {
    const pages = [];
    const addPage = (page) => {
      pages.push(
        <button
          key={page}
          onClick={() => setCurrentPage(page)}
          className={currentPage === page ? 'active-page' : ''}
        >
          {page}
        </button>
      );
    };

    if (totalPages <= 6) {
      for (let i = 1; i <= totalPages; i++) {
        addPage(i);
      }
    } else {
      addPage(1);
      if (currentPage > 3) pages.push(<span key="dots1">...</span>);

      const startPage = Math.max(2, currentPage - 1);
      const endPage = Math.min(totalPages - 1, currentPage + 1);

      for (let i = startPage; i <= endPage; i++) {
        addPage(i);
      }

      if (currentPage < totalPages - 2) pages.push(<span key="dots2">...</span>);
      addPage(totalPages);
    }

    return (
      <div className="pagination">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Prev
        </button>
        {pages}
        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    );
  };

  if (loading) return <div>Loading orders...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="admin-orders-container">

      <div className="order-view-buttons">
        <button
          className={selectedView === 'pending' ? 'active-view-btn' : ''}
          onClick={() => setSelectedView('pending')}
        >
          View Pending Orders
        </button>
        <button
          className={selectedView === 'completed' ? 'active-view-btn' : ''}
          onClick={() => setSelectedView('completed')}
        >
          View Completed Orders
        </button>
      </div>

      <div className="status-columns">
        <div className="status-column">
          <h3>{selectedView === 'pending' ? 'Pending Orders' : 'Completed Orders'}</h3>
          <div className="orders-grid">
            {currentOrders.map(order => (
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
                {selectedView === 'pending' ? (
                  <button
                    onClick={() => handleGenerateBill(order.orderId)}
                    className="generate-bill-btn"
                  >
                    Generate Bill
                  </button>
                ) : (
                  <button
                    onClick={() => handleViewBill(order.orderId)}
                    className="generate-bill-btn"
                  >
                    View Bill
                  </button>
                )}
              </div>
            ))}
          </div>
          {renderPagination()}
        </div>
      </div>
    </div>
  );
};

export default ViewOrders;
