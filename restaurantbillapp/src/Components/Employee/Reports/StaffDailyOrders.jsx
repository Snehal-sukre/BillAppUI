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
import "./StaffReport.css";

const StaffDailyOrders = () => {
  const [orderData, setOrderData] = useState([]);
  const staffId = localStorage.getItem("staffId");

  useEffect(() => {
    if (staffId) {
      axios
        .get(`http://localhost:8080/getDailyOrdersByStaff/${staffId}`)
        .then((res) => {
          const formattedData = res.data.map((item) => ({
            ...item,
            orderDate: new Date(item.orderDate).toLocaleDateString(),
            totalOrders: Number(item.totalOrders),
            totalAmount: Number(item.totalAmount),
          }));
          setOrderData(formattedData);
        })
        .catch((err) => {
          console.error("Error fetching daily order data", err);
        });
    }
  }, [staffId]);

  return (
    <div className="staff-daily-orders-container">
      <h2 className="report-title">📊 Staff Daily Orders Report</h2>

      <div className="chart-wrapper">
        <ResponsiveContainer width="100%" height={400}>
          <BarChart
            data={orderData}
            margin={{ top: 20, right: 40, left: 20, bottom: 10 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="orderDate" />
            <YAxis yAxisId="left" />
            <YAxis yAxisId="right" orientation="right" />
            <Tooltip />
            <Legend />
            <Bar
              yAxisId="left"
              dataKey="totalOrders"
              fill="#5D76A9"
              name="Total Orders"
            />
            <Bar
              yAxisId="right"
              dataKey="totalAmount"
              fill="#1d1160"
              name="Total Amount (₹)"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <h3 className="table-title">📋 Table View:</h3>
      <table className="report-table">
        <thead>
          <tr>
            <th>Order Date</th>
            <th>Total Orders</th>
            <th>Total Amount (₹)</th>
          </tr>
        </thead>
        <tbody>
          {orderData.map((row, index) => (
            <tr key={index}>
              <td>{row.orderDate}</td>
              <td>{row.totalOrders}</td>
              <td>₹{row.totalAmount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StaffDailyOrders;
