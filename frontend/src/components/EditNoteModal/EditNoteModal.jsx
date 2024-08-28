import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { editNote } from '../../store/note';
import { useModal } from '../../context/Modal';

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
        <div>
            <h2>Edit Note</h2>
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
                <button type="submit">Save Changes</button>
                <button type="button" onClick={closeModal}>Cancel</button>
            </form>
        </div>
    );
};

export default EditNoteModal;