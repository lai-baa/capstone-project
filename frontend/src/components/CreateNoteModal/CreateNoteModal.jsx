import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createNote } from '../../store/note';
import { useModal } from '../../context/Modal';
import './CreateNote.css';

function CreateNoteModal({ notebookId }) {
    const dispatch = useDispatch();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [errors, setErrors] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);
    const { closeModal } = useModal();

    const validate = () => {
        const newErrors = {};
        if (!title) {
            newErrors.title = 'Title is required.';
        } else if (title.length > 100) {
            newErrors.title = 'Title must be less than 100 characters.';
        }
        if (!description) {
            newErrors.description = 'Description is required.';
        }
        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setIsSubmitted(true);
        const newErrors = validate();
        setErrors(newErrors);

        // Proceed only if there are no errors
        if (Object.keys(newErrors).length === 0) {
            const newNote = { title, description, notebookId };
            const result = await dispatch(createNote(newNote));

            if (result.errors) {
                setErrors(result.errors);
            } else {
                closeModal();
            }
        }
    };

    return (
        <div className="create-note-modal">
          <h2 className="note-modal-heading">Create New Note</h2>
          <form className="note-modal-form" onSubmit={handleSubmit}>
            <label className="note-modal-label">
              Title
              <input
                className="note-modal-input"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </label>
            {isSubmitted && errors.title && <p className="note-error-message">{errors.title}</p>}
            
            <label className="note-modal-label">
              Description
              <textarea
                className="note-modal-input"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </label>
            {isSubmitted && errors.description && <p className="note-error-message">{errors.description}</p>}
            
            <button className="note-modal-button note-create-button" type="submit">
              Create Note
            </button>
            <button className="note-modal-button note-cancel-button" type="button" onClick={closeModal}>
              Cancel
            </button>
          </form>
        </div>
    );
}

export default CreateNoteModal;