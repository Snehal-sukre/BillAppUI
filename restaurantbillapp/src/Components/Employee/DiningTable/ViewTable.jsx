// ViewTable.jsx
import React, { useEffect, useState } from 'react';
import DiningTableService from './DiningTableService';
import './Dining.css';
import { useNavigate } from 'react-router-dom';

const ViewTable = () => {
  const [tables, setTables] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    DiningTableService.getTables()
      .then((response) => {
        setTables(response.data);
      })
      .catch((error) => {
        console.error('Error fetching tables:', error);
      });
  }, []);

  const handleTakeOrder = (tableId) => {
    localStorage.setItem('selectedTableId', tableId); // Save tableId to localStorage
    navigate(`/staff/viewmenu/${tableId}`); // Navigate with tableId as URL param too
  };

  const availableTables = tables.filter((table) => table.availability.toLowerCase() === 'available');
  const occupiedTables = tables.filter((table) => table.availability.toLowerCase() === 'occupied');

  return (
    <div className="tables-wrapper">
      <div className="table-column">
        <h2 className="view-tables-title">Available Tables</h2>
        <div className="view-tables-grid">
          {availableTables.map((table) => (
            <div key={table.id} className="table-card available">
              <h3>Table - {table.id}</h3>
              <p>Capacity : {table.capacity} people</p>
              <button
                className="take-order-btn"
                onClick={() => handleTakeOrder(table.id)}
              >
                Take Order
              </button>
            </div>
          ))}
        </div>
      </div>

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
