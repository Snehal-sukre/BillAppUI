import React, { useState, useEffect } from "react";
import './Category.css'; // Make sure to use new file name to avoid conflicts
import { FaEdit, FaTrash, FaSearch } from "react-icons/fa";
import CategoryService from './CategoryService.js';

const ViewCategory = () => {
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  let [errorMsg, setErrorMsg]=useState({
    "message":"",
    "statusCode":0
  });

  useEffect(() => {
    const getCategory=()=>
    {
        let promise=CategoryService.getCategory();
        promise.then((res)=>
        {
            setCategories(res.data);
        });
        promise.catch((err)=>
        {
            setErrorMsg(err.response.data);
        });
    }
    getCategory();
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      setCategories(categories.filter((category) => category.id !== id));
    }
  };

  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="view-category-wrapper">
      
      {/* Search Bar */}
      <div className="view-category-searchbar">
        <FaSearch className="search-icon" />
        <input
          type="text"
          placeholder="Search category..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Table */}
      <div className="view-category-table-wrapper">
        <h2>View Categories</h2>
        <table className="view-category-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Category Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredCategories.length > 0 ? (
              filteredCategories.map((category) => (
                <tr key={category.id}>
                  <td>{category.id}</td>
                  <td>{category.name}</td>
                  <td>
                    <button className="view-category-icon-btn view-category-edit-btn">
                      <FaEdit />
                    </button>
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
      </div>
    </div>
  );
};

export default ViewCategory;
