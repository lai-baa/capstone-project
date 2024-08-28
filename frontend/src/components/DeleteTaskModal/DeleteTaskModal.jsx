// frontend/src/components/DeleteTaskModal/DeleteTaskModal.jsx
import { useDispatch } from 'react-redux';
import { deleteTask } from '../../store/task';
import { useModal } from '../../context/Modal';
import { useNavigate } from 'react-router-dom';

const DeleteTaskModal = ({ taskId, redirectToList = false }) => {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const navigate = useNavigate();

  const handleDelete = async () => {
    const result = await dispatch(deleteTask(taskId));
    if (result) {
      closeModal();
      if (redirectToList) {
        navigate('/tasks'); // This should be inside router context
      }
    }
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