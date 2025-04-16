import React, { useState, useEffect } from "react";
import "./AdminHome.css";
import { FaClipboardList, FaUtensils, FaChair } from "react-icons/fa";
import { MdCategory } from "react-icons/md";
import CategoryService from "./Category/CategoryService";
import MenuService from "./Menu/MenuService";

const AdminHome = () => {
  const [categories, setCategories] = useState([]);
  const [menus, setMenus] = useState([]);

  useEffect(() => {
    CategoryService.getCategory()
      .then((res) => {
        setCategories(res.data);
      })
      .catch((err) => {
        console.error("Error in Fetching Categories:", err);
      });
  }, []);

  useEffect(() => {
    MenuService.getMenus()
      .then((res) => {
        setMenus(res.data);
      })
      .catch((err) => {
        console.error("Error in Fetching Menus:", err);
      });
  }, []);

  return (
    <div className="main-content">
      <div className="admin-dashboard">

        {/* ===== Added Logout Header ===== */}
        <div className="admin-header">
          <h2 className="admin-heading">Welcome to Admin Dashboard</h2>
          <button className="logout-btn" onClick={() => window.location.href = "/"}>
            Logout
          </button>
        </div>
        <div className="dashboard-cards">
          {/* Total Categories */}
          <div className="dashboard-card">
            <div className="card-icon"><MdCategory size={50} /></div>
            <div className="card-info">
              <p>Total Categories</p>
              <h3>{categories.length}</h3>
            </div>
          </div>

          {/* Total Menus */}
          <div className="dashboard-card">
            <div className="card-icon"><FaUtensils size={50} /></div>
            <div className="card-info">
              <p>Total Menus</p>
              <h3>{menus.length}</h3>
            </div>
          </div>

          {/* Total Tables */}
          <div className="dashboard-card">
            <div className="card-icon"><FaChair size={50} /></div>
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
            <div className="card-icon"><FaClipboardList size={50} /></div>
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
