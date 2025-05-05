import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
//import "./Bill.css";

const ViewStaffBill = () => {
  const { orderId } = useParams();
  const [bill, setBill] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBill = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/viewOrderBill/${orderId}`);
        setBill(response.data);
      } catch (error) {
        alert("No bill found for this order.");
        navigate("/staff/viewStaffOrders");
      }
    };
    fetchBill();
  }, [orderId, navigate]);

  if (!bill) return <div className="bill-container">Loading bill...</div>;

  return (
    <div>
      {/* Button moved here */}
      <button onClick={() => navigate("/staff/viewStaffOrders")} className="back-button" style={{marginLeft:"280px"}}>
        Back to Orders
      </button>

      <div className="bill-container">
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
              bill.items.map((item, idx) => (
                <tr key={idx}>
                  <td>{item.itemName}</td>
                  <td>{item.quantity}</td>
                  <td>₹{(item.totalAmt / item.quantity).toFixed(2)}</td>
                  <td>₹{item.totalAmt.toFixed(2)}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" style={{ textAlign: "center" }}>Items not available</td>
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
      </div>
    </div>
  );
};

export default ViewStaffBill;
