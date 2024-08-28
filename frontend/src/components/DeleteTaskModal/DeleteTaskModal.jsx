// frontend/src/components/DeleteTaskModal/DeleteTaskModal.jsx
import { useDispatch } from 'react-redux';
import { deleteTask } from '../../store/task';
import { useModal } from '../../context/Modal';

const DeleteTaskModal = ({ taskId }) => {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const handleDelete = async () => {
    await dispatch(deleteTask(taskId));
    closeModal();
  };

  return (
    <div className="delete-task-modal">
      <h2>Are you sure you want to delete this task?</h2>
      <button onClick={handleDelete}>Yes, Delete</button>
      <button onClick={closeModal}>Cancel</button>
    </div>
  );
};

export default DeleteTaskModal;