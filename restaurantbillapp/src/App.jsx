import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import IndexPage from "./Components/IndexPage/IndexPage";
import Login from "./Components/IndexPage/Login";
import AdminLayout from "./Components/Admin/AdminLayout";
import AddCategory from "./Components/Admin/Category/AddCategory";
import AdminHome from "./Components/Admin/AdminHome"; 
import ViewCategory from "./Components/Admin/Category/ViewCategory";
import UpdateCategory from "./Components/Admin/Category/UpdateCategory";
import AddMenu from "./Components/Admin/Menu/AddMenu";
import ViewMenu from "./Components/Admin/Menu/ViewMenu";

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
           <Route path="updcat/:catid" element={<UpdateCategory/>}/>
           <Route path="addmenu" element={<AddMenu/>}/>
           <Route path="viewmenu" element={<ViewMenu/>}/>
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
