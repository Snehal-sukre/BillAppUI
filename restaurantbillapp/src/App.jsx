import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import IndexPage from "./Components/IndexPage/IndexPage";
import Login from "./Components/IndexPage/Login";
import AdminLayout from "./Components/Admin/AdminLayout";
import AddCategory from "./Components/Admin/Category/AddCategory";
import AdminHome from "./Components/Admin/AdminHome"; 
import ViewCategory from "./Components/Admin/Category/ViewCategory";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<IndexPage />} />
        <Route path="/login" element={<Login />} />

        <Route path="/admin" element={<AdminLayout />}>
           <Route index element={<AdminHome />} />
           <Route path="addcategory" element={<AddCategory />} />
           <Route path="viewcategory" element={<ViewCategory/>}/>
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
