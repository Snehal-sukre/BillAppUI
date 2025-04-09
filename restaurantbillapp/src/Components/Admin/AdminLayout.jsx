// Components/Admin/AdminLayout.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import AdminDashboard from "./AdminDashboard"; // Sidebar

const AdminLayout = () => {
  return (
    <div style={{ display: "flex" }}>
      <AdminDashboard /> {/* Sidebar */}
      <div style={{ flex: 1, padding: "20px" }}>
        <Outlet /> {/* Nested route content */}
      </div>
    </div>
  );
};

export default AdminLayout;
