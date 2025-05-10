import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  FaUtensils,
  FaHome,
  FaChartBar,
  FaChair,
} from "react-icons/fa";
import { GiMeal } from "react-icons/gi";
import { MdFastfood } from "react-icons/md";
import { FaBars } from "react-icons/fa";
import "./EmployeeDashboard.css"; // Create or reuse CSS with scoped styles

const EmployeeDashboard = () => {
  const [dropdownOpen, setDropdownOpen] = useState({
    menu: false,
    orders: false,
    tables: false,
  });

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const toggleDropdown = (key) => {
    setDropdownOpen({
      menu: false,
      orders: false,
      tables: false,
      [key]: !dropdownOpen[key],
    });
  };

  return (
    <div className="admin-dashboard">
      <button className="hamburger" onClick={toggleSidebar}>
        <FaBars />
      </button>
      <div className={`admin-sidebar ${sidebarOpen ? "open" : ""}`}>
        <ul className="sidebar-menu">
          <li className="sidebar-logo">
            <FaUtensils className="logo-icon" size="2em" />
            <span className="logo-text">FOODIES KITCHEN</span>
          </li>

          <li>
            <NavLink to="/staff" className="menu-item">
              <FaHome className="menu-icon" />
              Dashboard
            </NavLink>
          </li>

          {/* Dining Tables */}
          <li>
            <NavLink to="/staff/viewtables" className="menu-item">
              <FaChair className="menu-icon" />
              Dining Tables
            </NavLink>
          </li>

          {/* Menu */}
          <li>
            <NavLink to="/staff/viewmenu" className="menu-item">
              <MdFastfood className="menu-icon" />
              Menus
            </NavLink>
          </li>

          {/* Orders */}
          <li>
            <NavLink to="/staff/viewstafforders" className="menu-item">
              <GiMeal className="menu-icon" />
              View Orders
            </NavLink>
          </li>

          {/* Reports */}
          <li>
            <NavLink to="/staff/dailyorderscount" className="menu-item">
              <FaChartBar className="menu-icon" />
              Reports
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default EmployeeDashboard;
