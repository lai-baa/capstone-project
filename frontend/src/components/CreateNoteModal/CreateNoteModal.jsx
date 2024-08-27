import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createNote } from '../../store/note';
import { useModal } from '../../context/Modal';
import './CreateNote.css';

function CreateNoteModal({ notebookId }) {
    const dispatch = useDispatch();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [errors, setErrors] = useState([]);
    const { closeModal } = useModal();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newNote = { title, description, notebookId };
        const result = await dispatch(createNote(newNote));

        if (result.errors) {
            setErrors(result.errors);
        } else {
            closeModal(); // Close the modal after successful creation
        }
    };

    return (
        <div className="create-note-modal">
            <h2>Create New Note</h2>
            <form onSubmit={handleSubmit}>
                <ul>
                    {errors.map((error, idx) => (
                        <li key={idx} className="error-message">{error}</li>
                    ))}
                </ul>
                <label>
                    Title
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Description
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </label>
                <button type="submit">Create Note</button>
                <button type="button" onClick={closeModal}>Cancel</button>
            </form>
        </div>
    );
}

export default CreateNoteModal;