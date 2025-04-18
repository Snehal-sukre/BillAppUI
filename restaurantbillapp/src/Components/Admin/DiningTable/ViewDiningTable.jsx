import React, { useState, useEffect } from "react";
import './DiningTable.css';
import { FaEdit, FaTrash, FaSearch } from "react-icons/fa";
import DiningTableService from './DiningTableService.js';
import { Link } from "react-router-dom";

const ViewDiningTable = () => {
  const [table, setTable] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [errorMsg, setErrorMsg] = useState({ message: "", statusCode: 0 });

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Fetch all Tables
  const fetchTable = () => {
    DiningTableService.getTables()
      .then((res) => setTable(res.data))
      .catch((err) => setErrorMsg(err.response?.data || { message: "Server error", statusCode: 500 }));
  };

  useEffect(() => {
    fetchTable();
  }, []);

  // Delete Dining Table item
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this Dining Table?")) {
      DiningTableService.deleteTable(id)
        .then(() => {
          setTable(table.filter((table) => table.id !== id));
        })
        .catch((err) => {
          console.error("Error deleting Dining Table:", err);
          alert("Failed to delete Dining Table");
        });
    }
  };

  useEffect(()=>
  {
    if(searchTerm.trim()==="")
    {
      fetchTable();
    }
    else
    {
      DiningTableService.customizeSearch(searchTerm)
      .then((res)=>setTable(res.data))
      .catch((err)=>setErrorMsg(err.response?.data || {message:"Search Error", statusCode:400}));
    }
  }, [searchTerm]);

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = table.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(table.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const nextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

  return (
    <div className="view-table-wrapper">
      {/* Search */}
      <div className="view-table-searchbar">
        <FaSearch className="search-icon" />
        <input
          type="text"
          placeholder="Search Dining Table..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
        />
      </div>

      {/* Table */}
      <div className="view-dining-table-wrapper">
        <h2>View Dining Table</h2>
        {errorMsg.message && <p className="error-msg">{errorMsg.message}</p>}

        <table className="view-dining-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Capacity</th>
              <th>Availability Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.length > 0 ? (
              currentItems.map((table) => (
                <tr key={table.id}>
                  <td>{table.id}</td>
                  <td>{table.capacity}</td>
                  <td>{table.availability}</td>
                  <td>
                    <Link to={`/admin/updtable/${table.id}`}>
                      <button className="view-table-icon-btn view-table-edit-btn">
                        <FaEdit />
                      </button>
                    </Link>
                    <button
                      className="view-table-icon-btn view-table-delete-btn"
                      onClick={() => handleDelete(table.id)}
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7">No Dining Table available</td>
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

export default ViewDiningTable;
