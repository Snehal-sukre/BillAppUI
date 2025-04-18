import React, { useState } from "react";
import './DiningTable.css';
import DiningTableService from "./DiningTableService";

let AddDiningTable = () => {
  let [table, setTable] = useState({
    id: "",
    capacity: "",
    availability: "Available"
  });

  let [msg, setMsg] = useState("");

  const handleChange = (e) => {
    setTable({ ...table, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!table.id || !table.capacity) {
      setMsg("Table Number and Capacity are required");
      return;
    }

    console.log("Sending table data to backend:", table);

    DiningTableService.createTable(table)
    .then((res)=>
    {
      console.log("Response From Backend: "+res.data);
      setMsg(res.data);
      setTable({
        tableNumber: "",
        capacity: "",
        availability: "Available"
      });
      setTimeout(() => setMsg(""), 3000);
    })
    .catch((err)=>
    {
      setMsg(err.response?.data || "Something Went Wrong");
    });  
  };

  return (
    <div className="add-table-wrapper">
      <div className="form-container">
        <form onSubmit={handleSubmit} className="table-form">
          <h2>Add Dining Table</h2>

          <div className="form-group">
            <label>Table Number</label>
            <input
              type="number"
              name="id"
              placeholder="Enter Table Number"
              value={table.id}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Capacity</label>
            <input
              type="number"
              name="capacity"
              placeholder="Enter Capacity"
              value={table.capacity}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
  <label>Availability</label>
  <select
    name="availability"
    value={table.availability}
    onChange={handleChange}
  >
    <option value="Available">Available</option>
    <option value="Occupied">Occupied</option>
  </select>
</div>

          {msg && <p className="message">{msg}</p>}

          <button type="submit" className="submit-btn">Add Table</button>
        </form>
      </div>
    </div>
  );
};

export default AddDiningTable;
