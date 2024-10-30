// src/components/Tasks/TaskItem.jsx

import React from 'react';
import styles from './TaskItem.module.css';

const TaskItem = ({ task, completeTask }) => {
  const isApproved = task.approved;
  const isCompleted = task.completed;

  return (
    <div
      className={`${styles.taskCard} ${
        isCompleted ? styles.complete : isApproved ? styles.approved : styles.pending
      }`}
    >
      <h2>
        {task.title}
        {task.compulsory && <span style={{ color: 'red' }}> (Compulsory)</span>}
      </h2>
      <div className={styles.taskDetails}>
        <span className={styles.price}>$ {task.reward}</span>
        {!isCompleted && isApproved && completeTask && (
          <button className={styles.completeBtn} onClick={() => completeTask(task.id)}>
            Complete
          </button>
        )}
        {!isApproved && (
          <span className={styles.awaitingApproval}>Awaiting Approval</span>
        )}
        {isCompleted && <span className={styles.completedLabel}>Completed</span>}
      </div>
    </div>
  );
};

export default TaskItem;

