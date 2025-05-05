import React, { useState, useEffect } from "react";
import "./AdminHome.css";
import { FaClipboardList, FaUtensils, FaChair } from "react-icons/fa";
import { MdCategory } from "react-icons/md";
import axios from "axios";
import CategoryService from "./Category/CategoryService";
import MenuService from "./Menu/MenuService";
import DiningTableService from "./DiningTable/DiningTableService";

const AdminHome = () => {
  const [categories, setCategories] = useState([]);
  const [menus, setMenus] = useState([]);
  const [tables, setTables] = useState([]);
  const [orders, setOrders] = useState([]);

  const [availableTables, setAvailableTables] = useState(0);
  const [occupiedTables, setOccupiedTables] = useState(0);

  const [completedOrders, setCompletedOrders] = useState(0);
  const [pendingOrders, setPendingOrders] = useState(0);

  const [loading, setLoading] = useState(true);

  const BASE_URL = "http://localhost:8080";

  // Fetch categories
  useEffect(() => {
    CategoryService.getCategory()
      .then((res) => setCategories(res.data))
      .catch((err) => console.error("Error fetching categories:", err));
  }, []);

  // Fetch menus
  useEffect(() => {
    MenuService.getMenus()
      .then((res) => setMenus(res.data))
      .catch((err) => console.error("Error fetching menus:", err));
  }, []);

  // Fetch tables
  useEffect(() => {
    DiningTableService.getTables()
      .then((res) => {
        const tableData = res.data || [];
        setTables(tableData);

        const available = tableData.filter(
          (t) => t.availability?.toLowerCase() === "available"
        ).length;

        const occupied = tableData.filter(
          (t) => t.availability?.toLowerCase() === "occupied"
        ).length;

        setAvailableTables(available);
        setOccupiedTables(occupied);
      })
      .catch((err) => console.error("Error fetching tables:", err));
  }, []);

  // Fetch orders (and remove duplicates)
  useEffect(() => {
    axios
      .get(`${BASE_URL}/viewAllOrders`)
      .then((res) => {
        const rawOrders = res.data || [];

        // ✅ Deduplicate orders by orderId
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
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching orders:", err);
        setLoading(false);
      });
  }, []);

  const handleLogout = () => {
    localStorage.clear(); // Clears user session data
    window.location.href = "/"; // Redirect to login page
  };
  

  return (
    <div className="main-content">
      <div className="admin-dashboard">
        <div className="admin-header">
          <h2 className="admin-heading">Welcome to Admin Dashboard</h2>
          <button
            className="logout-btn"
            onClick={handleLogout}  // Correctly invoking the function
          >
            Logout
          </button>
        </div>

        {loading ? (
          <div className="loader">Loading...</div>
        ) : (
          <div className="dashboard-cards">
            {/* Categories Card */}
            <div className="dashboard-card animate-card">
              <div className="card-icon">
                <MdCategory size={50} />
              </div>
              <div className="card-info">
                <p>Total Categories</p>
                <h3>{categories.length}</h3>
              </div>
            </div>

            {/* Menus Card */}
            <div className="dashboard-card animate-card">
              <div className="card-icon">
                <FaUtensils size={50} />
              </div>
              <div className="card-info">
                <p>Total Menus</p>
                <h3>{menus.length}</h3>
              </div>
            </div>

            {/* Tables Card */}
            <div className="dashboard-card animate-card">
              <div className="card-icon">
                <FaChair size={50} />
              </div>
              <div className="card-info">
                <p>Total Tables</p>
                <h3>{tables.length}</h3>
                <div className="card-buttons">
                  <button>Available: {availableTables}</button>
                  <button>Occupied: {occupiedTables}</button>
                </div>
              </div>
            </div>

            {/* Orders Card */}
            <div className="dashboard-card animate-card">
              <div className="card-icon">
                <FaClipboardList size={50} />
              </div>
              <div className="card-info">
                <p>Total Orders</p>
                <h3>{orders.length}</h3>
                <div className="card-buttons">
                  <button>Completed: {completedOrders}</button>
                  <button>Pending: {pendingOrders}</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminHome;
