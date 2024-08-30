import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { editNote } from '../../store/note';
import { useModal } from '../../context/Modal';
import "./EditNote.css"

const EditNoteModal = ({ note, onSuccess }) => {
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const [title, setTitle] = useState(note.title);
    const [description, setDescription] = useState(note.description);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        const newErrors = {};
        if (!title) {
            newErrors.title = 'Title is required.';
        } else if (title.length > 100) {
            newErrors.title = 'Title must be less than 100 characters.';
        }
        if (!description) {
            newErrors.description = 'Description is required.';
        }
        setErrors(newErrors);
    }, [title, description]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (Object.keys(errors).length === 0) {
            const updatedNote = { title, description };

            const result = await dispatch(editNote(note.id, updatedNote));

            if (result.errors) {
                setErrors(result.errors);
            } else {
                if (onSuccess) onSuccess();
                closeModal();
            }
        }
    };

    return (
        <div className="edit-note-modal">
            <h2 className="note-modal-heading">Edit Note</h2>
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
                {errors.title && <p className="note-error-message">{errors.title}</p>}
                <label className="note-modal-label">
                    Description
                    <textarea
                        className="note-modal-input"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </label>
                {errors.description && <p className="note-error-message">{errors.description}</p>}
                <button className="note-modal-button note-save-button" type="submit">Save Changes</button>
                <button className="note-modal-button note-cancel-button" type="button" onClick={closeModal}>Cancel</button>
            </form>
        </div>
    );
};

export default EditNoteModal;