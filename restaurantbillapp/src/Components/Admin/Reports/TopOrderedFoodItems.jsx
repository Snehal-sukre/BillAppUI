import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import "./Reports.css";

const TopOrderedFoodItems = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8080/getTopOrderedItems")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching top ordered items:", error);
      });
  }, []);

  return (
    <div className="top-ordered-items" style={{ padding: "20px" }}>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Top Ordered Food Items</h2>

      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={data} margin={{ top: 30, right: 30, left: 20, bottom: 50 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="itemName" angle={-25} textAnchor="end" interval={0} />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="totalQty" fill="#1d1160" name="Quantity Ordered" />
        </BarChart>
      </ResponsiveContainer>

      <h3 style={{ marginTop: "40px" }}>Item Details</h3>
      <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "10px" }}>
        <thead>
          <tr>
            <th style={{ border: "1px solid #ccc", padding: "10px" }}>Item Name</th>
            <th style={{ border: "1px solid #ccc", padding: "10px" }}>Total Quantity</th>
            <th style={{ border: "1px solid #ccc", padding: "10px" }}>Total Revenue</th>
          </tr>
        </thead>
        <tbody>
             {data.map((item, idx) => (
            <tr key={idx}>
               <td data-label="Item Name">{item.itemName}</td>
               <td data-label="Total Quantity">{item.totalQty}</td>
               <td data-label="Total Revenue">₹{item.totalAmt}</td>
           </tr>
         ))}
       </tbody>
      </table>
    </div>
  );
};

export default TopOrderedFoodItems;
