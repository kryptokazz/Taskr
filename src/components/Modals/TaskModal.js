// src/components/Modals/TaskModal.js
import React from 'react';

const TaskModal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="modal" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <span className="close-btn" onClick={onClose}>&times;</span>
        {children}
      </div>
    </div>
  );
};

export default TaskModal;

