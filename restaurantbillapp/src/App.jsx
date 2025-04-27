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
import UpdateMenu from "./Components/Admin/Menu/UpdateMenu";
import AddStaff from "./Components/Admin/Staff/AddStaff";
import ViewStaff from "./Components/Admin/Staff/ViewStaff";
import UpdateStaff from "./Components/Admin/Staff/UpdateStaff";
import AddDiningTable from "./Components/Admin/DiningTable/AddDiningTable";
import ViewDiningTable from "./Components/Admin/DiningTable/ViewDiningTable";
import UpdateDiningTable from "./Components/Admin/DiningTable/UpdateDiningTable";
import EmployeeHome from "./Components/Employee/EmployeeHome";
import EmployeeLayout from "./Components/Employee/EmployeeLayout";
import ViewMenus from "./Components/Employee/Menus/ViewMenus";
import OrderPage from "./Components/Employee/Orders/OrderPage";
import ViewTable from "./Components/Employee/DiningTable/ViewTable";

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
           <Route path="updmenu/:menuid" element={<UpdateMenu/>}/>
           <Route path="addstaff" element={<AddStaff/>} />
           <Route path="viewstaff" element={<ViewStaff/>}/>
           <Route path="updstaff/:staffid" element={<UpdateStaff/>}/>
           <Route path="addtable" element={<AddDiningTable/>}/>
           <Route path="viewtable" element={<ViewDiningTable/>} />
           <Route path="updtable/:tableid" element={<UpdateDiningTable/>}/>
        </Route>

        <Route path="/staff" element={<EmployeeLayout/>}>
        <Route index element={<EmployeeHome />} />
        <Route path="viewtables" element={<ViewTable/>}/>
        <Route path="viewmenu" element={<ViewMenus/>}/>
        <Route path="viewmenu/:tableid" element={<ViewMenus/>}/>
        <Route path="vieworders" element={<OrderPage/>}/>
        <Route path="viewmenu/:tableid/vieworders" element={<OrderPage/>}/>
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
