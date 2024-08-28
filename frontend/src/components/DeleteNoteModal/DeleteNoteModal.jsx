import { useDispatch } from 'react-redux';
import { deleteNote } from '../../store/note';
import { useModal } from '../../context/Modal';

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
    <div>
      <h2>Are you sure you want to delete this note?</h2>
      <button onClick={handleDelete}>Yes, Delete</button>
      <button onClick={closeModal}>Cancel</button>
    </div>
  );
};

export default DeleteNoteModal;
