import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = ({ setShowLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('admin');

  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Basic check (you can replace with real auth logic)
    if (username && password) {
      setShowLogin(false);
      if (role === 'admin') navigate('/admin-dashboard');
      else if (role === 'waiter') navigate('/waiter-dashboard');
      else if (role === 'chef') navigate('/chef-dashboard');
    } else {
      alert('Please fill all fields');
    }
  };

  return (
    <div className="login-form-container">
      <form onSubmit={handleLogin} className="login-form">
        <h3>Login</h3>
        <input type="text" placeholder="Username" value={username}
               onChange={(e) => setUsername(e.target.value)} required />
        <input type="password" placeholder="Password" value={password}
               onChange={(e) => setPassword(e.target.value)} required />
        <select value={role} onChange={(e) => setRole(e.target.value)} required>
          <option value="admin">Admin</option>
          <option value="waiter">Waiter</option>
          <option value="chef">Chef</option>
        </select>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
