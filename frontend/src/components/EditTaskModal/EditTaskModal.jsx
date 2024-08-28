// frontend/src/components/EditTaskModal/EditTaskModal.jsx
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { editTask } from '../../store/task';
import { useModal } from '../../context/Modal';

const EditTaskModal = ({ task, closeModal }) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState(task?.title || ''); // Ensure title is safely initialized
  const [description, setDescription] = useState(task?.description || '');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState(task?.priority || 'low');
  const [completed, setCompleted] = useState(task?.completed || false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    // This useEffect will run when the task changes, ensuring the state is updated correctly
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
      setPriority(task.priority);
      setCompleted(task.completed);
      
      const formattedDueDate = task.dueDate ? new Date(task.dueDate).toISOString().split('T')[0] : '';
      setDueDate(formattedDueDate);
    }
  }, [task]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedTask = { title, description, dueDate, priority, completed };

    const result = await dispatch(editTask(task.id, updatedTask));

    if (result.errors) {
      setErrors(result.errors);
    } else {
      closeModal(); // Close the modal after a successful update
    }
  };

  return (
    <div className="edit-task-modal">
      <h2>Edit Task</h2>
      <form onSubmit={handleSubmit}>
        {errors.title && <p>{errors.title}</p>}
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
          <select value={priority} onChange={(e) => setPriority(e.target.value)}>
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
        <button type="submit">Update Task</button>
        <button type="button" onClick={closeModal}>Cancel</button>
      </form>
    </div>
  );
};

export default EditTaskModal;