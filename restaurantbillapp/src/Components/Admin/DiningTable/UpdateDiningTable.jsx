import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DiningTableService from './DiningTableService';

const UpdateDiningTable = () => {
  const [table, setTable] = useState({ 
    id: "",
    capacity: "",
    availability: "Available"
});
  const [msg, setMsg] = useState("");
  const { tableid } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    DiningTableService.updateTable(tableid)
      .then((res) => setTable(res.data))
      .catch((err) => console.error(err));
  }, [tableid]);

  const unihandler = (e) => {
    setTable(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const updateTable = (e) => {
    e.preventDefault();
    DiningTableService.updTable(table).then((res) => {
      setMsg("Table updated successfully!");
      setTimeout(() => navigate("/admin/viewtable"), 1500);
    });
  };

  return (
    <div className="add-table-wrapper">
      <div className="form-container">
        <form onSubmit={updateTable} className="table-form">
          <h2>Update Dining Table</h2>

          <div className="form-group">
            <label>Table Number</label>
            <input
              type="number"
              name="id"
              placeholder="Enter Table Number"
              value={table.id}
              onChange={unihandler}
            />
          </div>

          <div className="form-group">
            <label>Capacity</label>
            <input
              type="number"
              name="capacity"
              placeholder="Enter Capacity"
              value={table.capacity}
              onChange={unihandler}
            />
          </div>

          <div className="form-group">
  <label>Availability</label>
  <select
    name="availability"
    value={table.availability}
    onChange={unihandler}
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

export default UpdateDiningTable;
