import React, { useState, useEffect } from "react";
import './Staff.css';
import { FaEdit, FaTrash, FaSearch } from "react-icons/fa";
import StaffService from './StaffService.js';
import { Link } from "react-router-dom";

const ViewStaff = () => {
  const [staff, setStaff] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [errorMsg, setErrorMsg] = useState({ message: "", statusCode: 0 });

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Fetch all menus
  const fetchStaff = () => {
    StaffService.getStaff()
      .then((res) => setStaff(res.data))
      .catch((err) => setErrorMsg(err.response?.data || { message: "Server error", statusCode: 500 }));
  };

  useEffect(() => {
    fetchStaff();
  }, []);

  // Delete menu item
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this staff?")) {
      StaffService.deleteStaff(id)
        .then(() => {
          setStaff(staff.filter((staff) => staff.id !== id));
        })
        .catch((err) => {
          console.error("Error deleting staff:", err);
          alert("Failed to delete staff");
        });
    }
  };

  useEffect(()=>
  {
    if(searchTerm.trim()==="")
    {
      fetchStaff();
    }
    else
    {
      StaffService.customizeSearch(searchTerm)
      .then((res)=>setStaff(res.data))
      .catch((err)=>setErrorMsg(err.response?.data || {message:"Search Error", statusCode:400}));
    }
  }, [searchTerm]);

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = staff.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(staff.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const nextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

  return (
    <div className="view-staff-wrapper">
      {/* Search */}
      <div className="view-staff-searchbar">
        <FaSearch className="search-icon" />
        <input
          type="text"
          placeholder="Search staff..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
        />
      </div>

      {/* Table */}
      <div className="view-staff-table-wrapper">
        <h2>View Staff</h2>
        {errorMsg.message && <p className="error-msg">{errorMsg.message}</p>}

        <table className="view-staff-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Staff Name</th>
              <th>Email</th>
              <th>Contact</th>
              <th>Salary</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.length > 0 ? (
              currentItems.map((staff) => (
                <tr key={staff.id}>
                  <td>{staff.id}</td>
                  <td>{staff.name}</td>
                  <td>{staff.email}</td>
                  <td>₹{staff.contact}</td>
                  <td>{staff.salary}</td>
                  <td>
                    <Link to={`/admin/updstaff/${staff.id}`}>
                      <button className="view-staff-icon-btn view-staff-edit-btn">
                        <FaEdit />
                      </button>
                    </Link>
                    <button
                      className="view-staff-icon-btn view-staff-delete-btn"
                      onClick={() => handleDelete(staff.id)}
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7">No Staff available</td>
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

export default ViewStaff;
