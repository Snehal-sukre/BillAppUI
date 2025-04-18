import React from "react";
import { FaClipboardList, FaUtensils, FaChair } from "react-icons/fa";
import { MdCategory } from "react-icons/md";

const EmployeeHome = () => {
  // Static values (replace with actual service calls later)
  const totalTables = 10;
  const availableTables = 6;
  const occupiedTables = 4;
  const totalOrders = 124;
  const completedOrders = 100;
  const pendingOrders = 24;
  const totalMenus = 15;
  const totalCategories = 5;

  return (
    <div className="main-content">
      <div className="admin-dashboard">

        {/* ===== Staff Welcome Header ===== */}
        <div className="admin-header">
          <h2 className="admin-heading">Welcome to Staff Dashboard</h2>
          <button className="logout-btn" onClick={() => window.location.href = "/"}>
            Logout
          </button>
        </div>

        {/* ===== Dashboard Cards ===== */}
        <div className="dashboard-cards">
          {/* Total Categories */}
          <div className="dashboard-card">
            <div className="card-icon"><MdCategory size={50} /></div>
            <div className="card-info">
              <p>Total Categories</p>
              <h3>{totalCategories}</h3>
            </div>
          </div>

          {/* Total Menus */}
          <div className="dashboard-card">
            <div className="card-icon"><FaUtensils size={50} /></div>
            <div className="card-info">
              <p>Total Menus</p>
              <h3>{totalMenus}</h3>
              <div className="card-buttons">
                <button onClick={() => alert("Redirecting to menu...")}>View Menu</button>
              </div>
            </div>
          </div>

          {/* Total Tables */}
          <div className="dashboard-card">
            <div className="card-icon"><FaChair size={50} /></div>
            <div className="card-info">
              <p>Total Tables</p>
              <h3>{totalTables}</h3>
              <div className="card-buttons">
                <button>Available: {availableTables}</button>
                <button>Occupied: {occupiedTables}</button>
              </div>
            </div>
          </div>

          {/* Total Orders */}
          <div className="dashboard-card">
            <div className="card-icon"><FaClipboardList size={50} /></div>
            <div className="card-info">
              <p>Total Orders</p>
              <h3>{totalOrders}</h3>
              <div className="card-buttons">
                <button>Completed: {completedOrders}</button>
                <button>Pending: {pendingOrders}</button>
              </div>
              <div className="card-buttons">
                <button onClick={() => alert("Redirecting to take new order...")}>
                  Take New Order
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeHome;
