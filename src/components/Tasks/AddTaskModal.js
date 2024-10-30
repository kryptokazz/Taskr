// src/components/Tasks/AddTaskModal.jsx
import React, { useState } from 'react';
import styles from './AddTaskModal.module.css';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const AddTaskModal = ({ isOpen, onClose, addTask }) => {
  const { authState } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    title: '',
    reward: '',
    compulsory: false,
    priority: 'Normal',
    expiryDate: null,
  });

  const { title, reward, compulsory, priority, expiryDate } = formData;

  const onChange = e => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const onDateChange = date => {
    setFormData({ ...formData, expiryDate: date });
  };

  const onSubmit = e => {
    e.preventDefault();
    if (!title || !reward) return;

    const taskData = {
      title: title.trim(),
      reward: parseInt(reward, 10),
      compulsory,
      priority,
      expiryDate: expiryDate ? expiryDate : null,
    };

    addTask(taskData);
    setFormData({
      title: '',
      reward: '',
      compulsory: false,
      priority: 'Normal',
      expiryDate: null,
    });
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
        <span className={styles.closeBtn} onClick={onClose}>
          &times;
        </span>
        <form onSubmit={onSubmit}>
          <h2>➕ Adding Task</h2>
          <label htmlFor="title">
            Title <span className={styles.required}>*</span>
          </label>
          <input
            type="text"
            id="title"
            name="title"
            placeholder="Task Title"
            value={title}
            onChange={onChange}
            required
          />

          <label htmlFor="reward">
            Reward <span className={styles.required}>*</span>
          </label>
          <div className={styles.rewardInputContainer}>
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
            <span className={styles.currency}>💲</span>
          </div>

          {/* Compulsory Checkbox */}
          <div className={styles.checkboxContainer}>
            <input
              type="checkbox"
              id="compulsory"
              name="compulsory"
              checked={compulsory}
              onChange={onChange}
            />
            <label htmlFor="compulsory">Compulsory Task</label>
          </div>

          {/* Priority Selection */}
          <label htmlFor="priority">Priority</label>
          <select id="priority" name="priority" value={priority} onChange={onChange}>
            <option value="Low">Low</option>
            <option value="Normal">Normal</option>
            <option value="High">High</option>
          </select>

          {/* Expiry Date Picker */}
          <label htmlFor="expiryDate">Expiry Date</label>
          <DatePicker
            id="expiryDate"
            selected={expiryDate}
            onChange={onDateChange}
            dateFormat="MMMM d, yyyy"
            minDate={new Date()}
            placeholderText="Select a date"
          />

          <div className={styles.modalButtons}>
            <button type="button" className={styles.cancelBtn} onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className={styles.addBtn} disabled={!title || !reward}>
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTaskModal;

