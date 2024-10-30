// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Layout/Navbar';
import Dashboard from './components/Tasks/Dashboard';
import Rewards from './components/Rewards/Rewards';
import ParentMode from './components/ParentMode/ParentMode';
import PrivateRoute from './components/Routing/PrivateRoute';
import AuthProvider from './context/AuthContext';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/rewards"
            element={
              <PrivateRoute>
                <Rewards />
              </PrivateRoute>
            }
          />
          <Route
            path="/parent-mode"
            element={
              <PrivateRoute>
                <ParentMode />
              </PrivateRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;

