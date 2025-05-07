// src/components/DailyOrdersReport.jsx

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

const DailyOrdersReport = () => {
  const [reportData, setReportData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/getDailyOrders")
      .then((response) => {
        setReportData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching daily orders report:", error);
      });
  }, []);

  return (
    <div className="report-container">
      <h2 className="report-title">📊 Daily Orders Report</h2>

      <div className="chart-wrapper">
        <ResponsiveContainer width="100%" height={400}>
          <BarChart
            data={reportData}
            margin={{ top: 20, right: 40, left: 20, bottom: 10 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="orderDate" />
            
            {/* Left Y-axis for total orders */}
            <YAxis yAxisId="left" />
            
            {/* Right Y-axis for total amount */}
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
          {reportData.map((row, index) => (
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

export default DailyOrdersReport;
