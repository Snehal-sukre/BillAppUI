import React, { useState, useEffect } from "react";
import './Menu.css';
import { FaEdit, FaTrash, FaSearch } from "react-icons/fa";
import MenuService from './MenuService.js';
import { Link } from "react-router-dom";

const ViewMenu = () => {
  const [menus, setMenus] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [errorMsg, setErrorMsg] = useState({ message: "", statusCode: 0 });

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Fetch all menus
  const fetchMenus = () => {
    MenuService.getMenus()
      .then((res) => setMenus(res.data))
      .catch((err) => setErrorMsg(err.response?.data || { message: "Server error", statusCode: 500 }));
  };

  useEffect(() => {
    fetchMenus();
  }, []);

  // Delete menu item
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this menu?")) {
      MenuService.deleteMenu(id)
        .then(() => {
          setMenus(menus.filter((menu) => menu.id !== id));
        })
        .catch((err) => {
          console.error("Error deleting menu:", err);
          alert("Failed to delete menu");
        });
    }
  };

  useEffect(()=>
  {
    if(searchTerm.trim()==="")
    {
      fetchMenus();
    }
    else
    {
      MenuService.customizeSearch(searchTerm)
      .then((res)=>setMenus(res.data))
      .catch((err)=>setErrorMsg(err.response?.data || {message:"Search Error", statusCode:400}));
    }
  }, [searchTerm]);

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = menus.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(menus.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const nextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

  return (
    <div className="view-menu-wrapper">
      {/* Search */}
      <div className="view-menu-searchbar">
        <FaSearch className="search-icon" />
        <input
          type="text"
          placeholder="Search menu..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
        />
      </div>

      {/* Table */}
      <div className="view-menu-table-wrapper">
        <h2>View Menus</h2>
        {errorMsg.message && <p className="error-msg">{errorMsg.message}</p>}

        <table className="view-menu-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Menu Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.length > 0 ? (
              currentItems.map((menu) => (
                <tr key={menu.id}>
                  <td>{menu.id}</td>
                  <td>{menu.name}</td>
                  <td>{menu.categoryName || menu.category?.name || "N/A"}</td>
                  <td>₹{menu.price}</td>
                  <td>{menu.description}</td>
                  <td>
                    <Link to={`/admin/updmenu/${menu.id}`}>
                      <button className="view-menu-icon-btn view-menu-edit-btn">
                        <FaEdit />
                      </button>
                    </Link>
                    <button
                      className="view-menu-icon-btn view-menu-delete-btn"
                      onClick={() => handleDelete(menu.id)}
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7">No menus available</td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="pagination-controls">
            <button onClick={prevPage} disabled={currentPage === 1}>Prev</button>
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index + 1}
                className={currentPage === index + 1 ? "active-page" : ""}
                onClick={() => paginate(index + 1)}
              >
                {index + 1}
              </button>
            ))}
            <button onClick={nextPage} disabled={currentPage === totalPages}>Next</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewMenu;
