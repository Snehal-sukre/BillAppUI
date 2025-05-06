import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaClipboardList, FaUtensils, FaChair } from "react-icons/fa";
import { MdCategory } from "react-icons/md";

const EmployeeHome = () => {
  const BASE_URL = "http://localhost:8080";

  const [categories, setCategories] = useState([]);
  const [menus, setMenus] = useState([]);
  const [tables, setTables] = useState([]);
  const [orders, setOrders] = useState([]);
  const [completedOrders, setCompletedOrders] = useState(0);
  const [pendingOrders, setPendingOrders] = useState(0);

  const staffName = localStorage.getItem('staffName');
  const staffId = localStorage.getItem('staffId');

  // Derived counts
  const totalCategories = categories.length;
  const totalMenus = menus.length;
  const totalTables = tables.length;
  const availableTables = tables.filter(table => table.availability === "Available").length;
  const occupiedTables = tables.filter(table => table.availability === "Occupied").length;
  const totalOrders = orders.length;

  useEffect(() => {
    // Fetch categories
    axios.get(`${BASE_URL}/viewCategory`)
      .then(res => setCategories(res.data))
      .catch(err => console.error("Error fetching categories", err));

    // Fetch menus
    axios.get(`${BASE_URL}/viewmenus`)
      .then(res => setMenus(res.data))
      .catch(err => console.error("Error fetching menus", err));

    // Fetch tables
    axios.get(`${BASE_URL}/viewtables`)
      .then(res => setTables(res.data))
      .catch(err => console.error("Error fetching tables", err));

    // Fetch orders by staff
    if (staffId) {
      axios.get(`${BASE_URL}/viewStaffOrders/${staffId}`)
        .then(res => {
          const rawOrders = res.data;

          // Deduplicate based on orderId
          const uniqueOrdersMap = new Map();
          rawOrders.forEach((order) => {
            if (!uniqueOrdersMap.has(order.orderId)) {
              uniqueOrdersMap.set(order.orderId, order);
            }
          });

          const uniqueOrders = Array.from(uniqueOrdersMap.values());
          setOrders(uniqueOrders);

          const completed = uniqueOrders.filter(
            (o) => o.orderStatus?.toLowerCase() === "completed"
          ).length;

          const pending = uniqueOrders.filter(
            (o) => o.orderStatus?.toLowerCase() === "pending"
          ).length;

          setCompletedOrders(completed);
          setPendingOrders(pending);
        })
        .catch(err => console.error("Error fetching staff orders", err));
    }
  }, [staffId]);

  return (
    <div className="main-content">
      <div className="admin-dashboard">

        {/* ===== Staff Welcome Header ===== */}
        <div className="admin-header">
          <h2 className="admin-heading">Welcome {staffName} to Staff Dashboard</h2>
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
              <p>Your Total Orders</p>
              <h3>{totalOrders}</h3>
              <div className="card-buttons">
                <button>Completed: {completedOrders}</button>
                <button>Pending: {pendingOrders}</button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default EmployeeHome;
