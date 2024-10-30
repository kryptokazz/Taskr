// src/components/Tasks/Dashboard.jsx

import React, { useContext, useEffect, useState } from 'react';
import TaskList from './TaskList';
import styles from './Dashboard.module.css';
import { AuthContext } from '../../context/AuthContext';

const Dashboard = () => {
  const { auth } = useContext(AuthContext);
  const [wallet, setWallet] = useState(auth.user.wallet);

  // Update wallet when auth changes
  useEffect(() => {
    setWallet(auth.user.wallet);
  }, [auth.user.wallet]);

  return (
    <div className={styles.dashboardContainer}>
      <header className={styles.header}>
        <h1>Taskr</h1>
        <span className={styles.wallet}>$ {wallet}</span>
      </header>
      <div className={styles.username}>
        {auth.user.username} Mode: {auth.user.mode}
      </div>
      <TaskList />
    </div>
  );
};

export default Dashboard;

