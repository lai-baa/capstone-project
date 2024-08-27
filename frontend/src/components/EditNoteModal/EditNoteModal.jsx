// frontend/src/components/EditNoteModal/EditNoteModal.jsx
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { editNote } from '../../store/note';
import { useModal } from '../../context/Modal';

const EditNoteModal = ({ note }) => {
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const [title, setTitle] = useState(note.title);
    const [description, setDescription] = useState(note.description);
    const [errors, setErrors] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const updatedNote = {
            ...note,
            title,
            description,
        };

        const response = await dispatch(editNote(note.id, updatedNote));

        if (response) {
            closeModal();
        }
    };

    return (
        <div>
            <h2>Edit Note</h2>
            <form onSubmit={handleSubmit}>
                <ul>
                    {errors.map((error, idx) => (
                        <li key={idx} style={{ color: 'red' }}>{error}</li>
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
                <button type="submit">Save Changes</button>
                <button type="button" onClick={closeModal}>Cancel</button>
            </form>
        </div>
    );
};

export default EditNoteModal;