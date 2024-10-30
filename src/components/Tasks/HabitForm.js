// src/components/Habits/HabitForm.js
import React, { useState } from 'react';

const HabitForm = ({ addHabit }) => {
  const [formData, setFormData] = useState({
    title: '',
    reward: '',
    compulsory: false,
  });

  const { title, reward, compulsory } = formData;

  const onChange = e => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const onSubmit = e => {
    e.preventDefault();
    if (!title || !reward) return;
    addHabit({
      title,
      reward: parseInt(reward, 10),
      compulsory,
      approved: true, // Automatically approve for testing
      completed: false,
    });
    setFormData({ title: '', reward: '', compulsory: false });
  };

  return (
    <div className="habit-form-container">
      <form onSubmit={onSubmit}>
        <h2>➕ Adding Task</h2>
        <label htmlFor="title">Title <span className="required">*</span></label>
        <input
          type="text"
          id="title"
          name="title"
          placeholder="Task Title"
          value={title}
          onChange={onChange}
          required
        />

        <label htmlFor="reward">Reward <span className="required">*</span></label>
        <div className="reward-input-container">
          <input
            type="number"
            id="reward"
            name="reward"
            min="1"
            step="1"
            value={reward}
            onChange={onChange}
            required
          />
          <span className="currency">💲</span>
        </div>

        {/* Compulsory Checkbox */}
        <div className="checkbox-container">
          <input
            type="checkbox"
            id="compulsory"
            name="compulsory"
            checked={compulsory}
            onChange={onChange}
          />
          <label htmlFor="compulsory">Compulsory Task</label>
        </div>

        <div className="modal-buttons">
          <button type="button" className="cancel-btn" onClick={() => setFormData({ title: '', reward: '', compulsory: false })}>Cancel</button>
          <button type="submit" className="add-btn" disabled={!title || !reward}>
            Add
          </button>
        </div>
      </form>
    </div>
  );
};

export default HabitForm;

