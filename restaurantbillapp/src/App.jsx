import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import IndexPage from "./Components/IndexPage/IndexPage";
import Login from "./Components/IndexPage/Login";
import AdminDashboard from "./Components/Admin/AdminDashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<IndexPage />} />
        <Route path="/login" element={<Login/>}/>
        <Route path="/adminlogin" element={<AdminDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
