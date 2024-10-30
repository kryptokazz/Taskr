// src/components/Auth/Login.jsx
import React, { useState, useContext } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const { setAuthState } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    if (!email || !password) return;

    try {
      // Use Firebase auth to sign in
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Update authState with the logged-in user
      setAuthState({
        isAuthenticated: true,
        user,
        loading: false,
      });

      navigate('/');
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      <form onSubmit={onSubmit}>
        <label>Email</label>
        <input type="email" name="email" value={email} onChange={onChange} required />

        <label>Password</label>
        <input type="password" name="password" value={password} onChange={onChange} required />

        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;

