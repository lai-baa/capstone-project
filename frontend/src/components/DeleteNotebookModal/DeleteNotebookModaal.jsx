// frontend/src/components/DeleteNotebookModal/DeleteNotebookModal.jsx
import { useDispatch } from 'react-redux';
import { deleteNotebook } from '../../store/notebook';
import './DeleteNotebookModal.css';

const DeleteNotebookModal = ({ notebookId, closeModal }) => {
    const dispatch = useDispatch();

    const handleDelete = async () => {
        await dispatch(deleteNotebook(notebookId));
        closeModal();
    };

    return (
        <div className="delete-notebook-modal">
            <h2>Are you sure you want to delete this notebook?</h2>
            <button onClick={handleDelete}>Yes, Delete</button>
            <button onClick={closeModal}>Cancel</button>
        </div>
    );
};

export default DeleteNotebookModal;