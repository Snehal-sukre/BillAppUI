import React, { useState, useEffect } from "react";
import "./Staff.css";
import { useParams, useNavigate } from "react-router-dom";
import StaffService from "./StaffService";

let UpdateStaff = () => {
  const [staff, setStaff] = useState({
    name: "",
    email: "",
    contact: "",
    salary: "",
  });

  const [message, setMessage] = useState("");
  const { staffid } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    // Load existing staff data for editing
    StaffService.updateStaff(staffid)
      .then((res) => setStaff(res.data))
      .catch((err) => console.error(err));
  }, [staffid]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStaff({ ...staff, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, contact, salary } = staff;

    if (!name || !email || !contact || !salary) {
      setMessage("All fields are required!");
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setMessage("Please enter a valid email address.");
      return;
    }

    // Contact number validation: numeric and 10 digits
    const contactRegex = /^[0-9]{10}$/;
    if (!contactRegex.test(contact)) {
      setMessage("Contact number must be a 10-digit numeric value.");
      return;
    }

    StaffService.updStaff(staff)
      .then((res) => {
        setMessage("Staff updated successfully!");
        setTimeout(() => navigate("/admin/viewstaff"), 1500);
      })
      .catch((err) => {
        console.error(err);
        setMessage(err.response?.data || "Something went wrong while updating");
      });
  };

  return (
    <div className="menu-container">
      <div className="form-wrapper">
        <div className="container">
          <h2>Update Staff</h2>
          <form onSubmit={handleSubmit} className="menu-form">
            <div className="form-group">
              <label>Staff Name</label>
              <input
                type="text"
                name="name"
                value={staff.name}
                onChange={handleChange}
                placeholder="Enter Staff Name"
                required
              />
            </div>

            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={staff.email}
                onChange={handleChange}
                placeholder="Enter Email"
                required
              />
            </div>

            <div className="form-group">
              <label>Contact</label>
              <input
                type="text"
                name="contact"
                value={staff.contact}
                onChange={handleChange}
                placeholder="Enter Contact Number"
                required
              />
            </div>

            <div className="form-group">
              <label>Salary</label>
              <input
                type="number"
                name="salary"
                value={staff.salary}
                onChange={handleChange}
                placeholder="Enter Salary"
                required
              />
            </div>

            {message && <p className="message">{message}</p>}

            <button type="submit" className="submit-btn">
              Update Staff
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateStaff;
