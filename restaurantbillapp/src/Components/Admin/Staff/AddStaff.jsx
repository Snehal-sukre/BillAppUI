import React, { useState } from "react";
import "./Staff.css";
import StaffService from "./StaffService";

const AddStaff = () => {
  const [staff, setStaff] = useState({
    name: "",
    email: "",
    contact: "",
    salary: "",
  });

  const [message, setMessage] = useState("");

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

    /*console.log("Staff Details:", staff);
    setMessage(`Staff "${name}" added successfully!`); */

    StaffService.createStaff(staff)
    .then((res)=>
    {
      console.log("Response From Backend: "+res.data);
      setMessage(res.data);
    setStaff({
      name: "",
      email: "",
      contact: "",
      salary: "",
    });
    setTimeout(() => setMessage(""), 3000);
  })
  .catch((err)=>
  {
    console.error(err);
    setMessage(err.response?.data || "Something went wrong");
  });
  };

  return (
    <div className="menu-container">
      <div className="form-wrapper">
        <div className="container">
          <h2>Add Staff</h2>
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
              Add Staff
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddStaff;
