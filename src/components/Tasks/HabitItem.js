// src/components/Habits/HabitItem.jsx
import React from 'react';

const HabitItem = ({ habit, updateHabit }) => {
  const { id, title, reward, compulsory, approved, completed } = habit;

  const completeHabit = () => {
    updateHabit({ ...habit, completed: true });
  };

  return (
    <div className={`task-card ${completed ? 'complete' : approved ? 'pending approved' : 'pending'}`}>
      <h3>
        {title} {compulsory && <span style={{ color: 'red' }}>(Compulsory)</span>}
      </h3>
      <p>Reward: $ {reward}</p>
      {!completed && approved && (
        <button onClick={completeHabit}>Complete</button>
      )}
      {!completed && !approved && <span>Awaiting Approval</span>}
      {completed && <span>✅ Completed</span>}
    </div>
  );
};

export default HabitItem;

