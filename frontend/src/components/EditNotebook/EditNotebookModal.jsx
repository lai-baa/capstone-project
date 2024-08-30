import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { editNotebook } from '../../store/notebook';
import "../CreateNotebookModal/CreateNotebook.css"
import "./EditNotebookModal.css";

const EditNotebookModal = ({ notebook, closeModal }) => {
    const dispatch = useDispatch();
    const [name, setName] = useState(notebook.name);
    const [favorite, setFavorite] = useState(notebook.favorite);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        const newErrors = {};
        if (!name) {
            newErrors.name = 'Notebook name is required.';
        } else if (name.length > 50) {
            newErrors.name = 'Notebook name must be less than 50 characters.';
        }
        setErrors(newErrors);
    }, [name]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (Object.keys(errors).length === 0) {
            const updatedNotebook = { name, favorite };

            const result = await dispatch(editNotebook(notebook.id, updatedNotebook));

            if (result.errors) {
                setErrors(result.errors);
            } else {
                closeModal();
            }
        }
    };

    return (
        <div className="create-notebook-modal-div">
          <h2 className="modal-heading">Edit Notebook</h2>
          <form onSubmit={handleSubmit} className="modal-form">
            <label className="modal-label">
              Name
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="ntbk-modal-input"
              />
            </label>
            {/* Display errors if they exist */}
            {errors.name && <p className="error-message">{errors.name}</p>}
            
            <div className="favorite-checkbox-container">
              <label className="modal-label">Favorite</label>
              <input
                type="checkbox"
                checked={favorite}
                onChange={(e) => setFavorite(e.target.checked)}
              />
            </div>
            
            <button
              type="submit"
              disabled={Object.keys(errors).length > 0}
              className="modal-button create-button"
            >
              Update
            </button>
            <button type="button" onClick={closeModal} className="modal-button cancel-button">
              Cancel
            </button>
          </form>
        </div>
    );
};

export default EditNotebookModal;