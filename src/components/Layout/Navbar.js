// src/components/Layout/Navbar.jsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './Navbar.module.css';

const Navbar = () => {
  const location = useLocation();

  return (
    <div className={styles.sidebar}>
      <div className={styles.profileIcon}>
        <img src="/images/user.png" alt="User Profile" />
      </div>
      <Link to="/" className={`${styles.menuItem} ${location.pathname === '/' ? styles.active : ''}`} title="Home">
        🏠
      </Link>
      <Link to="/rewards" className={`${styles.menuItem} ${location.pathname === '/rewards' ? styles.active : ''}`} title="Rewards">
        💰
      </Link>
      <Link to="/parent-mode" className={`${styles.menuItem} ${location.pathname === '/parent-mode' ? styles.active : ''}`} title="Parent Mode">
        👪
      </Link>
    </div>
  );
};

export default Navbar;

