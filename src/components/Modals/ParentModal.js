// src/components/Modals/ParentModal.js
import React, { useState } from 'react';

const ParentModal = ({ isOpen, onClose, onLogin }) => {
  const [password, setPassword] = useState('');

  if (!isOpen) return null;

  const handleLogin = () => {
    if (password === 'parent123') { // Ideally, verify on backend
      onLogin();
      onClose();
    } else {
      alert('Incorrect password.');
    }
  };

  return (
    <div className="modal" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <span className="close-btn" onClick={onClose}>&times;</span>
        <h2>Parent Mode</h2>
        <p>Enter the parent password to access parent mode:</p>
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button onClick={handleLogin}>Login</button>
      </div>
    </div>
  );
};

export default ParentModal;

