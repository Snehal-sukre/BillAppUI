import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Bill.css";

const GenerateBill = () => {
  const { orderId } = useParams();
  const [bill, setBill] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBill = async () => {
      try {
        const res = await axios.post(`http://localhost:8080/generateBill/${orderId}`);
        setBill(res.data);
      } catch (err) {
        alert("Failed to generate bill.");
        navigate("/viewOrders");
      }
    };
    fetchBill();
  }, [orderId, navigate]);

  const handlePrint = () => {
    window.print();
  };

  if (!bill) return <div className="bill-container">Generating bill...</div>;

  return (
    <div>
      <button onClick={() => navigate("/admin/vieworders")} className="back-button" style={{ marginLeft: "280px" }}>
        Back to Orders
      </button>
      <div className="generate-bill-container">
        <h2 className="center-text">FOODIES KITCHEN</h2>
        <p className="center-text">FOODIES KITCHEN RESTAURANT</p>
        <p className="center-text">KAKDE PLAZA, E BUILDING, KAKDE CITY</p>
        <p className="center-text">KARVE NAGAR, PUNE - 411052</p>
        <p className="center-text">Ph: 7066340155, 7066341455</p>
        <p className="center-text">GSTIN: 27AAKFH7403G1ZE</p>
        <hr />
        <p className="center-text"><strong>TAX INVOICE</strong></p>
        <p>INV No.: ORD-{bill.orderId}</p>
        <p>Date: {new Date().toLocaleDateString()} | Time: {new Date().toLocaleTimeString()}</p>
        <p>Bill No.: {bill.billId}</p>
        <p>Table No.: {bill.tableId}</p> {/* ✅ Display Table ID here */}
        <hr />
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
              bill.items.map((item, index) => (
                <tr key={index}>
                  <td>{item.itemName}</td>
                  <td>{item.quantity}</td>
                  <td>₹{(item.totalAmt / item.quantity).toFixed(2)}</td>
                  <td>₹{item.totalAmt.toFixed(2)}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" style={{ textAlign: "center" }}>
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
        <p className="center-text">THANK YOU...!! VISIT AGAIN</p>
        <p className="center-text">** Powered By ABC Softwares **</p>
        <button onClick={handlePrint} className="print-bill-btn" style={{ marginLeft: "10px" }}>Print Bill</button>
      </div>
    </div>
  );
};

export default GenerateBill;
