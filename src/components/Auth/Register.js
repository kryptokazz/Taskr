// src/components/Auth/Register.js
import React, { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const { setAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });

  const { username, email, password } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/auth/register', { username, email, password });
      localStorage.setItem('token', res.data.token);
      setAuth({
        token: res.data.token,
        isAuthenticated: true,
        loading: false,
        user: res.data.user,
      });
      navigate('/');
    } catch (err) {
      console.error(err.response.data);
      // Optionally, handle errors (e.g., show error messages)
    }
  };

  return (
    <div className="auth-container">
      <h2>Register</h2>
      <form onSubmit={onSubmit}>
        <label>Username</label>
        <input type="text" name="username" value={username} onChange={onChange} required />

        <label>Email</label>
        <input type="email" name="email" value={email} onChange={onChange} required />

        <label>Password</label>
        <input type="password" name="password" value={password} onChange={onChange} required />

        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;

