import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  FaUtensils,
  FaHome,
  FaFileInvoiceDollar,
  FaChartBar,
  FaChair,
  FaUserTie,
} from "react-icons/fa";
import { GiMeal } from "react-icons/gi";
import { MdFastfood } from "react-icons/md";
import "./EmployeeDashboard.css"; // Create or reuse CSS with scoped styles

const EmployeeDashboard = () => {
  const [dropdownOpen, setDropdownOpen] = useState({
    menu: false,
    orders: false,
  });

  const toggleDropdown = (key) => {
    setDropdownOpen({
      menu: false,
      orders: false,
      [key]: !dropdownOpen[key],
    });
  };

  return (
    <div className="admin-sidebar">
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

        {/* Menu Dropdown */}
        <li>
          <div className="menu-item" onClick={() => toggleDropdown("menu")}>
            <MdFastfood className="menu-icon" />
            Menu
          </div>
          {dropdownOpen.menu && (
            <ul className="submenu">
              <li>
                <NavLink to="/staff/viewmenu" className="submenu-link">
                  View Menu
                </NavLink>
              </li>
            </ul>
          )}
        </li>

        {/* Orders Dropdown */}
        <li>
          <div className="menu-item" onClick={() => toggleDropdown("orders")}>
            <GiMeal className="menu-icon" />
            Orders
          </div>
          {dropdownOpen.orders && (
            <ul className="submenu">
              <li>
                <NavLink to="/staff/vieworders" className="submenu-link">
                  View Orders
                </NavLink>
              </li>
            </ul>
          )}
        </li>

        {/* Invoice */}
        <li>
          <NavLink to="/staff/bill" className="menu-item">
            <FaFileInvoiceDollar className="menu-icon" />
            Bill
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default EmployeeDashboard;
