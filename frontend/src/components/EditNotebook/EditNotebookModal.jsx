import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { editNotebook } from '../../store/notebook';

const EditNotebookModal = ({ notebook, closeModal }) => {
    const dispatch = useDispatch();
    const [name, setName] = useState(notebook.name); // Prepopulate the notebook name
    const [favorite, setFavorite] = useState(notebook.favorite); // Prepopulate the favorite status
    const [errors, setErrors] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const updatedNotebook = { name, favorite };

        const result = await dispatch(editNotebook(notebook.id, updatedNotebook));

        if (result.errors) {
            setErrors(result.errors);
        } else {
            closeModal(); // Close the modal after successful update
        }
    };

    return (
        <div className="edit-notebook-modal">
            <h2>Edit Notebook</h2>
            <form onSubmit={handleSubmit}>
                <ul>
                    {errors.map((error, idx) => (
                        <li key={idx}>{error}</li>
                    ))}
                </ul>
                <label>
                    Name
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Favorite
                    <input
                        type="checkbox"
                        checked={favorite}
                        onChange={(e) => setFavorite(e.target.checked)}
                    />
                </label>
                <button type="submit">Update</button>
                <button type="button" onClick={closeModal}>Cancel</button>
            </form>
        </div>
    );
};

export default EditNotebookModal;