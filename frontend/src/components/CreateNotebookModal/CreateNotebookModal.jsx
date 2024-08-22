import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createNotebook } from '../../store/notebook';
import { useModal } from '../../context/Modal';

const CreateNotebookModal = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [favorite, setFavorite] = useState(false);
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newNotebook = { name, favorite };

    const result = await dispatch(createNotebook(newNotebook));
    
    if (result.errors) {
      setErrors(result.errors);
    } else {
      closeModal(); // Close the modal after successful creation
    }
  };

  const handleCancelClick = () => {
    closeModal(); // Close the modal without doing anything
  };

  return (
    <div className="create-notebook-modal">
      <h2>Create New Notebook</h2>
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
        <button type="submit">Create</button>
        <button type="cancel" onClick={handleCancelClick}>Cancel</button>
      </form>
    </div>
  );
};

export default CreateNotebookModal;
