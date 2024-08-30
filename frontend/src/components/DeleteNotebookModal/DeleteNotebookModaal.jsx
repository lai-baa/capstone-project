import { useDispatch } from 'react-redux';
import { deleteNotebook } from '../../store/notebook';
import './DeleteNotebookModal.css';

const DeleteNotebookModal = ({ notebookId, closeModal }) => {
    const dispatch = useDispatch();

    const handleDelete = async () => {
        const result = await dispatch(deleteNotebook(notebookId));
        if (result.message) {
            closeModal();
        } else {
            // Handle errors if needed
        }
    };

    return (
        <div className="delete-notebook-modal-div">
          <h2 className="modal-heading">Are you sure you want to delete this notebook and all its notes?</h2>
          <div className="modal-form">
            <button onClick={handleDelete} className="modal-button delete-button">
              Yes, Delete
            </button>
            <button onClick={closeModal} className="modal-button cancel-button">
              Cancel
            </button>
          </div>
        </div>
      );
};

export default DeleteNotebookModal;