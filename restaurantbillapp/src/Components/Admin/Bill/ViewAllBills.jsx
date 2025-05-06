import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Bill.css";

const ViewAllBills = () => {
  const [bills, setBills] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBills = async () => {
      try {
        const response = await axios.get("http://localhost:8080/viewAllBills");
        setBills(response.data);
      } catch (error) {
        console.error("Error fetching bills:", error);
        alert("Error fetching bills.");
      }
    };

    fetchBills();
  }, []);

  if (!bills || bills.length === 0) {
    return <div className="bill-container">Loading bills...</div>;
  }

  return (
    <div className="all-bills-page">
      <h2 className="center-text">View All Bills</h2>
      <button onClick={() => navigate("/admin/viewOrders")} className="back-button">
        Back to Orders
      </button>

      <div className="bill-row">
        {bills.map((bill) => (
          <div key={bill.billId} className="bill-container multi-bill">
            <h3 className="center-text">FOODIES KITCHEN</h3>
            <p className="center-text"><strong>TAX INVOICE</strong></p>
            <p>INV No.: ORD-{bill.orderId}</p>
            <p>Table No.: {bill.tableId}</p> {/* Table No. added here */}
            <p>Date: {new Date(bill.billDate).toLocaleDateString()} | Time: {new Date(bill.billDate).toLocaleTimeString()}</p>
            <p>Bill No.: {bill.billId}</p>
            <hr />

            {/* Food Items Table */}
            <table className="item-table">
              <thead>
                <tr>
                  <th>ITEM</th>
                  <th>QTY</th>
                  <th>RATE</th>
                  <th>AMT</th>
                </tr>
              </thead>
              <tbody>
                {bill.items && bill.items.length > 0 ? (
                  bill.items.map((item, idx) => (
                    <tr key={idx}>
                      <td>{item.itemName}</td>
                      <td>{item.quantity}</td>
                      <td>
                        ₹
                        {(item.totalAmt / item.quantity).toFixed(2)}
                      </td>
                      <td>₹{item.totalAmt.toFixed(2)}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" style={{ textAlign: "center" }} >
                      Items not available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>

            <hr />
            <p>FOOD TOTAL: ₹{bill.totalAmount.toFixed(2)}</p>
            <p>CGST: ₹{bill.cgst.toFixed(2)}</p>
            <p>SGST: ₹{bill.sgst.toFixed(2)}</p>
            <p><strong>Discounted Total: ₹{bill.discount.toFixed(2)}</strong></p>
            <h3>Grand Total (Rs.): ₹{bill.grandTotal.toFixed(0)}</h3>
            
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewAllBills;
