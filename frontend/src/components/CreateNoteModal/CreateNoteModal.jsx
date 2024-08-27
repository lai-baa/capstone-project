import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createNote } from '../../store/note';
import { useModal } from '../../context/Modal';
import './CreateNote.css';

function CreateNoteModal({ notebookId }) {
    const dispatch = useDispatch();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [errors, setErrors] = useState({});
    const { closeModal } = useModal();

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
            <h2>Create New Note</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Title
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </label>
                {errors.title && <p className="error-message">{errors.title}</p>}
                <label>
                    Description
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </label>
                {errors.description && <p className="error-message">{errors.description}</p>}
                <button type="submit">Create Note</button>
                <button type="button" onClick={closeModal}>Cancel</button>
            </form>
        </div>
    );
}

export default CreateNoteModal;