// Components/Admin/AdminLayout.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import EmployeeDashboard from "./EmployeeDashboard"; // Sidebar

const EmployeeLayout = () => {
  return (
    <div style={{ display: "flex" }}>
      <EmployeeDashboard /> {/* Sidebar */}
      <div style={{ flex: 1, padding: "20px" }}>
        <Outlet /> {/* Nested route content */}
      </div>
    </div>
  );
};

export default EmployeeLayout;
