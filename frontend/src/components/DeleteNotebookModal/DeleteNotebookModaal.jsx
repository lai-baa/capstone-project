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
        <div className="delete-notebook-modal">
            <h2>Are you sure you want to delete this notebook and all its notes?</h2>
            <button onClick={handleDelete}>Yes, Delete</button>
            <button onClick={closeModal}>Cancel</button>
        </div>
    );
};

export default DeleteNotebookModal;