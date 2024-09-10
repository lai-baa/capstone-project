// frontend/src/components/EditTaskModal/EditTaskModal.jsx
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { editTask, getAllTasks, getCompletedTasks } from '../../store/task';
import './EditTaskModal.css';

const EditTaskModal = ({ task, closeModal }) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState(task?.title || '');
  const [description, setDescription] = useState(task?.description || '');
  const [dueDate, setDueDate] = useState(task?.dueDate ? new Date(task.dueDate).toISOString().split('T')[0] : '');
  const [priority, setPriority] = useState(task?.priority || '');
  const [completed, setCompleted] = useState(task?.completed || false);
  const [errors, setErrors] = useState({});

  // Get the current date in 'YYYY-MM-DD' format
  const getCurrentDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

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

      if (completed) {
        dispatch(getCompletedTasks());
      } else {
        dispatch(getAllTasks());
      }
    }
  };

  return (
    <div className="edit-task-modal-div">
      <h2 className="modal-heading">Edit Task</h2>
      <form className="modal-form" onSubmit={handleSubmit}>
        <label className="modal-label">
          Title
          <input
            className="task-modal-input"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </label>
        {errors.title && <p className="error-message">{errors.title}</p>}
        
        <label className="modal-label">
          Description
          <textarea
            className="task-modal-textarea"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </label>
        {errors.description && <p className="error-message">{errors.description}</p>}
        
        <label className="modal-label">
          Due Date
          <input
            className="task-modal-input"
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            min={getCurrentDate()}  // Set min attribute to restrict past dates
            required
          />
        </label>
        {errors.dueDate && <p className="error-message">{errors.dueDate}</p>}
        
        <label className="modal-label">
          Priority
          <select 
            className="task-modal-select"
            value={priority} 
            onChange={(e) => setPriority(e.target.value)} 
            required
          >
            <option value="" disabled>--Select Priority--</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </label>
        {errors.priority && <p className="error-message">{errors.priority}</p>}
        
        <div className="completed-container">
          <label className="modal-label" htmlFor="completed-checkbox">
            Completed
          </label>
          <input
            id="completed-checkbox"
            className="task-modal-checkbox"
            type="checkbox"
            checked={completed}
            onChange={(e) => setCompleted(e.target.checked)}
          />
        </div>
        
        <button className="modal-button update-button" type="submit">Update Task</button>
        <button className="modal-button cancel-button" type="button" onClick={closeModal}>Cancel</button>
      </form>
    </div>
  );
};

export default EditTaskModal;