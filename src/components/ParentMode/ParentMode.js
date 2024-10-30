// src/components/ParentMode/ParentMode.jsx
import React, { useState, useEffect, useContext } from 'react';
import styles from './ParentMode.module.css';
import { AuthContext } from '../../context/AuthContext';

const ParentMode = () => {
  const { auth, setAuth } = useContext(AuthContext);
  const [password, setPassword] = useState('');
  const [tasksToApprove, setTasksToApprove] = useState([]);
  const [isParentMode, setIsParentMode] = useState(auth.user.mode === 'Parent');

  const parentPassword = 'parent123'; // For demo purposes

  useEffect(() => {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const pendingTasks = tasks.filter(task => !task.approved);
    setTasksToApprove(pendingTasks);
  }, [isParentMode]);

  const handleLogin = () => {
    if (password === parentPassword) {
      setIsParentMode(true);
      setAuth({
        ...auth,
        user: {
          ...auth.user,
          mode: 'Parent',
        },
      });
      setPassword('');
    } else {
      alert('Incorrect password.');
    }
  };

  const handleLogout = () => {
    setIsParentMode(false);
    setAuth({
      ...auth,
      user: {
        ...auth.user,
        mode: 'Child',
      },
    });
  };

  const handleApprove = (id) => {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const updatedTasks = tasks.map(task => {
      if (task.id === id) {
        return { ...task, approved: true };
      }
      return task;
    });
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    setTasksToApprove(updatedTasks.filter(task => !task.approved));
    alert('Task approved.');
  };

  const handleReject = (id) => {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const updatedTasks = tasks.filter(task => task.id !== id);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    setTasksToApprove(updatedTasks.filter(task => !task.approved));
    alert('Task rejected.');
  };

  if (!isParentMode) {
    return (
      <div className={styles.parentModeContainer}>
        <h2>Parent Mode</h2>
        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin}>Login</button>
      </div>
    );
  }

  return (
    <div className={styles.parentModeContainer}>
      <h2>Approve Tasks</h2>
      {tasksToApprove.length === 0 ? (
        <p>No tasks need approval.</p>
      ) : (
        tasksToApprove.map(task => (
          <div key={task.id} className={styles.taskToApprove}>
            <p><strong>{task.title}</strong> - Reward: ${task.reward}</p>
            <button onClick={() => handleApprove(task.id)} className={styles.approveBtn}>Approve</button>
            <button onClick={() => handleReject(task.id)} className={styles.rejectBtn}>Reject</button>
          </div>
        ))
      )}
      <button onClick={handleLogout} className={styles.exitBtn}>Exit Parent Mode</button>
    </div>
  );
};

export default ParentMode;

