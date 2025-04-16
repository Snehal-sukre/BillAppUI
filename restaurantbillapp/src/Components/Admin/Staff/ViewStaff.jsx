import React, { useEffect, useState } from "react";
import "./Staff.css"; // Same as AddStaff for consistency
import { FaEdit, FaTrash, FaSearch } from "react-icons/fa";
import StaffService from "./StaffService";
import { Link } from "react-router-dom";

const ViewStaff = () => {
  const [staffList, setStaffList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    fetchStaff();
  }, []);

  const fetchStaff = () => {
    StaffService.getStaff()
      .then((res) => setStaffList(res.data))
      .catch((err) =>
        setErrorMsg(err.response?.data || "Failed to load staff list")
      );
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this staff?")) {
      StaffService.deleteStaff(id)
        .then(() => {
          setStaffList((prev) => prev.filter((staff) => staff.id !== id));
        })
        .catch((err) => {
          console.error("Error deleting staff:", err);
          alert("Failed to delete staff");
        });
    }
  };

  useEffect(() => {
    if (searchTerm.trim() === "") {
      fetchStaff();
    } else {
      StaffService.searchStaff(searchTerm)
        .then((res) => setStaffList(res.data))
        .catch((err) => setErrorMsg("Search failed"));
    }
  }, [searchTerm]);

  // Pagination logic
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentItems = staffList.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(staffList.length / itemsPerPage);

  const paginate = (pageNum) => setCurrentPage(pageNum);
  const nextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

  return (
    <div className="view-category-wrapper">
      {/* Search bar */}
      <div className="view-category-searchbar">
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
      <div className="view-category-table-wrapper">
        <h2>View Staff</h2>
        {errorMsg && <p className="error-msg">{errorMsg}</p>}
        <table className="view-category-table">
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
                  <td>{staff.contact}</td>
                  <td>{staff.salary}</td>
                  <td>
                    <Link to={`/admin/updstaff/${staff.id}`}>
                      <button className="view-category-icon-btn view-category-edit-btn">
                        <FaEdit />
                      </button>
                    </Link>
                    <button
                      className="view-category-icon-btn view-category-delete-btn"
                      onClick={() => handleDelete(staff.id)}
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6">No staff found</td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="pagination">
            <button onClick={prevPage} disabled={currentPage === 1}>
              Prev
            </button>
            {[...Array(totalPages).keys()].map((num) => (
              <button
                key={num + 1}
                onClick={() => paginate(num + 1)}
                className={currentPage === num + 1 ? "active" : ""}
              >
                {num + 1}
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

export default ViewStaff;
