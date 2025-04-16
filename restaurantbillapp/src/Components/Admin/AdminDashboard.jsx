import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  FaUtensils,
  FaHome,
  FaThList,
  FaUserTie,
  FaFileInvoiceDollar,
  FaChartBar,
  FaChair,
} from "react-icons/fa";
import { GiMeal } from "react-icons/gi";
import { MdFastfood } from "react-icons/md";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const [dropdownOpen, setDropdownOpen] = useState({
    category: false,
    menu: false,
    staff: false,
    dinning: false,
    orders: false,
  });

  const toggleDropdown = (key) => {
    setDropdownOpen({
      category: false,
      menu: false,
      staff: false,
      dinning: false,
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
          <NavLink to="/admin" className="menu-item">
            <FaHome className="menu-icon" />
            Dashboard
          </NavLink>
        </li>

        {/* Category Dropdown */}
        <li>
          <div className="menu-item" onClick={() => toggleDropdown("category")}>
            <FaThList className="menu-icon" />
            Category
          </div>
          {dropdownOpen.category && (
            <ul className="submenu">
              <li>
                <NavLink to="/admin/addcategory" className="submenu-link">
                  Add Category
                </NavLink>
              </li>
              <li>
                <NavLink to="/admin/viewcategory" className="submenu-link">
                  View Category
                </NavLink>
              </li>
            </ul>
          )}
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
                <NavLink to="/admin/addmenu" className="submenu-link">
                  Add Menu
                </NavLink>
              </li>
              <li>
                <NavLink to="/admin/viewmenu" className="submenu-link">
                  View Menu
                </NavLink>
              </li>
            </ul>
          )}
        </li>

        {/* Staff Dropdown */}
        <li>
          <div className="menu-item" onClick={() => toggleDropdown("staff")}>
            <FaUserTie className="menu-icon" />
            Staffs
          </div>
          {dropdownOpen.staff && (
            <ul className="submenu">
              <li>
                <NavLink to="/admin/addstaff" className="submenu-link">
                  Add Staff
                </NavLink>
              </li>
              <li>
                <NavLink to="/admin/viewstaff" className="submenu-link">
                  View Staff
                </NavLink>
              </li>
            </ul>
          )}
        </li>

        {/* Dinning Table Dropdown */}
        <li>
          <div className="menu-item" onClick={() => toggleDropdown("dinning")}>
            <FaChair className="menu-icon" />
            Tables
          </div>
          {dropdownOpen.dinning && (
            <ul className="submenu">
              <li>
                <NavLink to="/admin/addtable" className="submenu-link">
                  Add Table
                </NavLink>
              </li>
              <li>
                <NavLink to="/admin/viewtable" className="submenu-link">
                  View Tables
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
                <NavLink to="/admin/vieworders" className="submenu-link">
                  View Orders
                </NavLink>
              </li>
            </ul>
          )}
        </li>

        {/* Invoice */}
        <li>
          <NavLink to="/admin/bill" className="menu-item">
            <FaFileInvoiceDollar className="menu-icon" />
            Bill
          </NavLink>
        </li>

        {/* Reports */}
        <li>
          <NavLink to="/admin/reports" className="menu-item">
            <FaChartBar className="menu-icon" />
            Reports
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default AdminDashboard;
