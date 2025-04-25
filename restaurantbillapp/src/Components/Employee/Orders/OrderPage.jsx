import React, { useState, useEffect } from 'react';
import './OrderPage.css';

const OrderPage = ({ onSubmit, prefill }) => {
  const [order, setOrder] = useState({
    tableId: '',
    staffId: '',
    staffName: '',
    ordDate: '',
    menuId: '',
    menuName: '',
    quantity: '',
    totalAmt: '',
    orderStatus: '',
  });

  useEffect(() => {
    if (prefill) {
      setOrder({
        ...order,
        menuId: prefill.id,
        menuName: prefill.name,
        totalAmt: prefill.price,
      });
    }
  }, [prefill]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrder((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!order.tableId || !order.staffId || !order.menuId || !order.quantity) {
      alert('Please fill all required fields!');
      return;
    }
    onSubmit(order);
  };

  return (
    <form className="order-form" onSubmit={handleSubmit}>
      <input type="number" name="tableId" value={order.tableId} onChange={handleChange} placeholder="Table ID" required />
      <input type="number" name="staffId" value={order.staffId} onChange={handleChange} placeholder="Staff ID" required />
      <input type="text" name="staffName" value={order.staffName} onChange={handleChange} placeholder="Staff Name" />
      <input type="date" name="ordDate" value={order.ordDate} onChange={handleChange} placeholder="Order Date" />
      <input type="number" name="menuId" value={order.menuId} onChange={handleChange} placeholder="Menu ID" readOnly />
      <input type="text" name="menuName" value={order.menuName} onChange={handleChange} placeholder="Menu Name" readOnly />
      <input type="number" name="quantity" value={order.quantity} onChange={handleChange} placeholder="Quantity" required />
      <input type="number" name="totalAmt" step="0.01" value={order.totalAmt} onChange={handleChange} placeholder="Total Amount" />
      <select name="orderStatus" value={order.orderStatus} onChange={handleChange}>
        <option value="">Select Order Status</option>
        <option value="Placed">Placed</option>
        <option value="Preparing">Preparing</option>
        <option value="Completed">Completed</option>
        <option value="Cancelled">Cancelled</option>
      </select>
      <button type="submit">Submit Order</button>
    </form>
  );
};

export default OrderPage;
