import React from "react";
import "./AdminHome.css";
import { FaClipboardList, FaUtensils, FaChair } from "react-icons/fa";
import { MdCategory } from "react-icons/md";

const AdminHome = () => {
  return (
    <div className="main-content">
    <div className="admin-dashboard">
      <h2 className="dashboard-title">Dashboard</h2>
      <p className="dashboard-subtitle">Hello Admin, welcome back!</p>

      <div className="dashboard-cards">
        {/* Total Categories */}
        <div className="dashboard-card">
          <div className="card-icon"><MdCategory size={28} /></div>
          <div className="card-info">
            <p>Total Categories</p>
            <h3>6</h3>
          </div>
        </div>

        {/* Total Menus */}
        <div className="dashboard-card">
          <div className="card-icon"><FaUtensils size={28} /></div>
          <div className="card-info">
            <p>Total Menus</p>
            <h3>18</h3>
          </div>
        </div>

        {/* Total Tables */}
        <div className="dashboard-card">
          <div className="card-icon"><FaChair size={28} /></div>
          <div className="card-info">
            <p>Total Tables</p>
            <h3>10</h3>
            <div className="card-buttons">
              <button>Available: 6</button>
              <button>Occupied: 4</button>
            </div>
          </div>
        </div>

        {/* Total Orders */}
        <div className="dashboard-card">
          <div className="card-icon"><FaClipboardList size={28} /></div>
          <div className="card-info">
            <p>Total Orders</p>
            <h3>124</h3>
            <div className="card-buttons">
              <button>Completed: 100</button>
              <button>Pending: 24</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default AdminHome;
