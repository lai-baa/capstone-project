import { useDispatch } from 'react-redux';
import { deleteNote } from '../../store/note';
import { useModal } from '../../context/Modal';

function DeleteNoteModal({ noteId, notebookId }) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const handleDelete = async () => {
        if (!noteId) {
            console.error('Note ID is undefined!');
            return;
        }
        
        await dispatch(deleteNote(noteId, notebookId));
        closeModal();
    };

    return (
        <div>
            <h2>Are you sure you want to delete this note?</h2>
            <button onClick={handleDelete}>Yes, Delete</button>
            <button onClick={closeModal}>Cancel</button>
        </div>
    );
}

export default DeleteNoteModal;