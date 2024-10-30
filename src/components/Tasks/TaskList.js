/// src/components/Tasks/TaskList.js

import React, { useState, useEffect, useContext } from 'react';
import TaskItem from './TaskItem';
import AddTaskModal from './AddTaskModal';
import styles from './TaskList.module.css';
import { AuthContext } from '../../context/AuthContext';

const TaskList = () => {
  const { auth, setAuth } = useContext(AuthContext); // Ensure setAuth is pulled from context
  const [tasks, setTasks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tasksCreatedToday, setTasksCreatedToday] = useState(0);

  useEffect(() => {
    loadTasks();
    checkTaskCreationLimit();
    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const checkTaskCreationLimit = () => {
    const today = new Date().toDateString();
    const storedDate = localStorage.getItem('lastTaskCreationDate');
    const storedCount = parseInt(localStorage.getItem('tasksCreatedToday')) || 0;

    if (storedDate === today) {
      setTasksCreatedToday(storedCount);
    } else {
      localStorage.setItem('lastTaskCreationDate', today);
      localStorage.setItem('tasksCreatedToday', '0');
      setTasksCreatedToday(0);
    }
  };

  const loadTasks = () => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(storedTasks);
  };

  const handleStorageChange = (event) => {
    if (event.key === 'tasks') {
      loadTasks();
    }
  };

  const addTask = (task) => {
    if (tasksCreatedToday >= 5) {
      alert('You have reached the maximum number of tasks you can create today.');
      return;
    }

    const newTask = { ...task, id: Date.now(), approved: false, completed: false, createdBy: 'Child' };
    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));

    const newCount = tasksCreatedToday + 1;
    setTasksCreatedToday(newCount);
    localStorage.setItem('tasksCreatedToday', newCount.toString());

    alert('Task submitted for approval.');
  };

  const completeTask = (id) => {
    const updatedTasks = tasks.map(task =>
      task.id === id ? { ...task, completed: true } : task
    );
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));

    const completedTask = tasks.find(task => task.id === id);
    const updatedWallet = auth.user.wallet + completedTask.reward;

    setAuth({
      ...auth,
      user: {
        ...auth.user,
        wallet: updatedWallet,
      },
    });
    localStorage.setItem('wallet', updatedWallet);

    alert('Task completed! Wallet balance updated.');
  };

  return (
    <div>
      <div className={styles.taskStatus}>
        <h2>Tasks Pending Approval</h2>
      </div>
      <div className={styles.taskList}>
        {tasks.filter(task => !task.approved).length > 0 ? (
          tasks.filter(task => !task.approved).map(task => (
            <TaskItem key={task.id} task={task} />
          ))
        ) : (
          <p>No tasks pending approval.</p>
        )}
      </div>

      <div className={styles.taskStatus}>
        <h2>Tasks To Complete</h2>
      </div>
      <div className={styles.taskList}>
        {tasks.filter(task => task.approved && !task.completed).length > 0 ? (
          tasks.filter(task => task.approved && !task.completed).map(task => (
            <TaskItem key={task.id} task={task} completeTask={completeTask} />
          ))
        ) : (
          <p>No tasks to complete.</p>
        )}
      </div>

      <div className={styles.taskStatus}>
        <h2>Completed Tasks</h2>
      </div>
      <div className={styles.taskList}>
        {tasks.filter(task => task.completed).length > 0 ? (
          tasks.filter(task => task.completed).map(task => (
            <TaskItem key={task.id} task={task} />
          ))
        ) : (
          <p>No completed tasks.</p>
        )}
      </div>

      <div className={`${styles.taskCard} ${styles.addTask}`} onClick={() => setIsModalOpen(true)}>
        <div className={styles.addIcon}>➕</div>
        <h2>Add Task</h2>
      </div>

      <AddTaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        addTask={addTask}
      />
    </div>
  );
};

export default TaskList;

