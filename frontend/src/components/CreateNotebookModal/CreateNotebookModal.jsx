import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createNotebook } from '../../store/notebook';
import { useModal } from '../../context/Modal';
import "./CreateNotebook.css";

const CreateNotebookModal = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  // const [favorite, setFavorite] = useState(false);
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  // Use Effect for client-side validation
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

    // Proceed only if there are no client-side validation errors
    if (Object.keys(errors).length === 0) {
      const newNotebook = { name };
      const result = await dispatch(createNotebook(newNotebook));

      if (result.errors) {
        setErrors(result.errors); // Capture backend errors
      } else {
        closeModal(); // Close the modal after successful creation
      }
    }
  };

  const handleCancelClick = () => {
    closeModal(); // Close the modal without doing anything
  };

  return (
    <div className="create-notebook-modal-div">
      <h2 className="modal-heading">Create New Notebook</h2>
      <form className="modal-form" onSubmit={handleSubmit}>
        <label className="modal-label">
          Name
          <input
            className="ntbk-modal-input"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
        {/* Render errors dynamically if they exist */}
        {errors.name && <p className="error-message">{errors.name}</p>}
        <button className="modal-button create-button" type="submit" disabled={Object.keys(errors).length > 0}>Create</button>
        <button className="modal-button cancel-button" type="button" onClick={handleCancelClick}>Cancel</button>
      </form>
    </div>
  );
};

export default CreateNotebookModal;