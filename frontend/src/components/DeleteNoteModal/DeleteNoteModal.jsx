import { useDispatch } from 'react-redux';
import { deleteNote } from '../../store/note';
import { useModal } from '../../context/Modal';
import "./DeleteNote.css";

const DeleteNoteModal = ({ noteId, redirectAfterDelete }) => {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const handleDelete = async () => {
    const result = await dispatch(deleteNote(noteId));
    if (result) {
      closeModal(); // Close the modal
      if (redirectAfterDelete) redirectAfterDelete(); // Redirect after delete
    }
  };

  return (
    <div className="delete-note-modal">
      <h2 className="delete-note-heading">Are you sure you want to delete this note?</h2>
      <button className="delete-note-button delete-button" onClick={handleDelete}>Yes, Delete</button>
      <button className="delete-note-button cancel-button" onClick={closeModal}>Cancel</button>
    </div>
  );
};

export default DeleteNoteModal;
