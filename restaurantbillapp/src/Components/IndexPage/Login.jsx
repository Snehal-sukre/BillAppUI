import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import { FaUser, FaLock } from 'react-icons/fa';
import StaffService from '../Admin/Staff/StaffService';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    // Admin Login
    if (username === 'admin' && password === 'admin123') {
      setErrorMessage('');
      navigate('/admin');
      return;
    }

    try {
      // Staff login check: match email and contact
      const res = await StaffService.getStaff(); // This should return array of staff
      const staffList = res.data;

      const matchedStaff = staffList.find(
        (staff) => staff.email === username && staff.contact === password
      );

      if (matchedStaff) {
        setErrorMessage('');
        navigate('/staff');
      } else {
        setErrorMessage('Invalid credentials. Please contact admin for access.');
      }
    } catch (error) {
      console.error(error);
      setErrorMessage('Server error. Please try again later.');
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleLogin} className="login-form">
        <h2>Admin Login</h2>

        <div className="input-container">
          <FaUser className="input-icon" />
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div className="input-container">
          <FaLock className="input-icon" />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {errorMessage && <p className="error-message">{errorMessage}</p>}

        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
