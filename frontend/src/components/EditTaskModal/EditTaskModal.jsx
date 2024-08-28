// frontend/src/components/EditTaskModal/EditTaskModal.jsx
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { editTask } from '../../store/task';
import { useModal } from '../../context/Modal';
import './EditTaskModal.css';

const EditTaskModal = ({ task, closeModal }) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState(task?.title || '');
  const [description, setDescription] = useState(task?.description || '');
  const [dueDate, setDueDate] = useState(task?.dueDate ? new Date(task.dueDate).toISOString().split('T')[0] : '');
  const [priority, setPriority] = useState(task?.priority || '');
  const [completed, setCompleted] = useState(task?.completed || false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const newErrors = {};
    if (!title) {
      newErrors.title = 'Title is required.';
    } else if (title.length > 100) {
      newErrors.title = 'Title must be less than 100 characters.';
    }
    if (!description) {
      newErrors.description = 'Description is required.';
    } else if (description.length > 500) {
      newErrors.description = 'Description must be less than 500 characters.';
    }
    if (!dueDate) {
      newErrors.dueDate = 'Due date is required.';
    }
    if (!priority) {
      newErrors.priority = 'Priority is required.';
    } else if (!['low', 'medium', 'high'].includes(priority)) {
      newErrors.priority = 'Priority must be Low, Medium, or High.';
    }
    setErrors(newErrors);
  }, [title, description, dueDate, priority]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (Object.keys(errors).length === 0) {
      const updatedTask = { title, description, dueDate, priority, completed };

      const result = await dispatch(editTask(task.id, updatedTask));

      if (result.errors) {
        setErrors(result.errors);
      } else {
        closeModal();
      }
    }
  };

  return (
    <div className="edit-task-modal">
      <h2>Edit Task</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Title
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </label>
        {errors.title && <p className="error-message">{errors.title}</p>}
        
        <label>
          Description
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </label>
        {errors.description && <p className="error-message">{errors.description}</p>}
        
        <label>
          Due Date
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            required
          />
        </label>
        {errors.dueDate && <p className="error-message">{errors.dueDate}</p>}
        
        <label>
          Priority
          <select value={priority} onChange={(e) => setPriority(e.target.value)} required>
            <option value="" disabled>--Select Priority--</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </label>
        {errors.priority && <p className="error-message">{errors.priority}</p>}
        
        <label>
          Completed
          <input
            type="checkbox"
            checked={completed}
            onChange={(e) => setCompleted(e.target.checked)}
          />
        </label>
        <button type="submit">Update Task</button>
        <button type="button" onClick={closeModal}>Cancel</button>
      </form>
    </div>
  );
};

export default EditTaskModal;