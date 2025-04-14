import React, { useState, useEffect } from "react";
import './Category.css';
import { FaEdit, FaTrash, FaSearch } from "react-icons/fa";
import CategoryService from './CategoryService.js';
import { Link } from "react-router-dom";

const ViewCategory = () => {
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [errorMsg, setErrorMsg] = useState({ message: "", statusCode: 0 });

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = () => {
    CategoryService.getCategory()
      .then((res) => setCategories(res.data))
      .catch((err) => setErrorMsg(err.response?.data || { message: "Server error", statusCode: 500 }));
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      CategoryService.deleteCategory(id)
        .then(() => {
          setCategories(categories.filter((category) => category.id !== id));
        })
        .catch((err) => {
          console.error("Error deleting category:", err);
          alert("Failed to delete category");
        });
    }
  };

  useEffect(() => {
    if (searchTerm.trim() === "") {
      fetchCategories();
    } else {
      CategoryService.customizeSearch(searchTerm)
        .then((res) => setCategories(res.data))
        .catch((err) => setErrorMsg(err.response?.data || { message: "Search error", statusCode: 400 }));
    }
  }, [searchTerm]);

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = categories.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(categories.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const nextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

  return (
    <div className="view-category-wrapper">
      {/* Search Bar */}
      <div className="view-category-searchbar">
        <FaSearch className="search-icon" />
        <input
          type="text"
          placeholder="Search category..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
        />
      </div>

      {/* Table */}
      <div className="view-category-table-wrapper">
        <h2>View Categories</h2>
        {errorMsg.message && <p className="error-msg">{errorMsg.message}</p>}
        <table className="view-category-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Category Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.length > 0 ? (
              currentItems.map((category) => (
                <tr key={category.id}>
                  <td>{category.id}</td>
                  <td>{category.name}</td>
                  <td>
                    <Link to={`/admin/updcat/${category.id}`}>
                      <button className="view-category-icon-btn view-category-edit-btn">
                        <FaEdit />
                      </button>
                    </Link>
                    <button
                      className="view-category-icon-btn view-category-delete-btn"
                      onClick={() => handleDelete(category.id)}
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3">No categories available</td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="pagination-controls">
            <button onClick={prevPage} disabled={currentPage === 1}>
              Prev
            </button>
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index + 1}
                className={currentPage === index + 1 ? "active-page" : ""}
                onClick={() => paginate(index + 1)}
              >
                {index + 1}
              </button>
            ))}
            <button onClick={nextPage} disabled={currentPage === totalPages}>
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewCategory;
