import React, { useEffect, useState } from 'react';
import DiningTableService from "./DiningTableService";
import './Dining.css';
import { useNavigate } from 'react-router-dom';

const ViewTable = () => {
  const [tables, setTables] = useState([]);  // Store table data
  const navigate = useNavigate();  // Hook for navigation

  useEffect(() => {
    // Fetch tables from DiningTableService
    DiningTableService.getTables()
      .then((response) => {
        setTables(response.data);  // Update state with tables
      })
      .catch((error) => {
        console.error('Error fetching tables:', error);
      });
  }, []);

  // Handle redirection to the "ViewMenus" page when "Take Order" is clicked
  const handleTakeOrder = (tableId) => {
    navigate(`/staff/viewmenu/${tableId}`);  // Correct path to pass the tableId
  };

  // Separate available and occupied tables
  const availableTables = tables.filter(table => table.availability.toLowerCase() === 'available');
  const occupiedTables = tables.filter(table => table.availability.toLowerCase() === 'occupied');

  return (
    <div className="tables-wrapper">
      {/* Display available tables */}
      <div className="table-column">
        <h2 className="view-tables-title">Available Tables</h2>
        <div className="view-tables-grid">
          {availableTables.map((table) => (
            <div key={table.id} className="table-card available">
              <h3>Table - {table.id}</h3>
              <p>Capacity : {table.capacity} people</p>
              <button
                className="take-order-btn"
                onClick={() => handleTakeOrder(table.id)}  // Correct function call
              >
                Take Order
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Display occupied tables */}
      <div className="table-column">
        <h2 className="view-tables-title">Occupied Tables</h2>
        <div className="view-tables-grid">
          {occupiedTables.map((table) => (
            <div key={table.id} className="table-card occupied">
              <h3>Table - {table.id}</h3>
              <p>Capacity : {table.capacity} people</p>
              <button className="take-order-btn" disabled>
                Occupied
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ViewTable;
