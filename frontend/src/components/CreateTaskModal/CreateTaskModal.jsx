// frontend/src/components/CreateTaskModal/CreateTaskModal.jsx
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createTask } from '../../store/task';
import { useModal } from '../../context/Modal';

const CreateTaskModal = () => {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState('low');
  const [completed, setCompleted] = useState(false);
  const [errors, setErrors] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newTask = { title, description, dueDate, priority, completed };

    const result = await dispatch(createTask(newTask));
    
    if (result.errors) {
      setErrors(result.errors);
    } else {
      closeModal(); // Close the modal after successful creation
    }
  };

  const handleCancelClick = () => {
    closeModal(); // Close the modal without doing anything
  };

  return (
    <div className="create-task-modal">
      <h2>Create New Task</h2>
      <form onSubmit={handleSubmit}>
        <ul>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
        <label>
          Title
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </label>
        <label>
          Description
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>
        <label>
          Due Date
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </label>
        <label>
          Priority
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </label>
        <label>
          Completed
          <input
            type="checkbox"
            checked={completed}
            onChange={(e) => setCompleted(e.target.checked)}
          />
        </label>
        <button type="submit">Create</button>
        <button type="button" onClick={handleCancelClick}>Cancel</button>
      </form>
    </div>
  );
};

export default CreateTaskModal;
