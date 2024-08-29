// frontend/src/components/CreateNoteModal/CreateNoteModal.jsx
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createNote } from '../../store/note';
import { useModal } from '../../context/Modal';
import './CreateNote.css';

function CreateNoteModal({ notebookId }) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState(''); // New state for tags input
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const newErrors = {};
    if (!title) newErrors.title = 'Title is required.';
    if (!description) newErrors.description = 'Description is required.';
    setErrors(newErrors);
  }, [title, description]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (Object.keys(errors).length === 0) {
      const tagsArray = tags.split(',').map(tag => tag.trim()); // Split tags by comma and trim spaces
      const newNote = { title, description, notebookId, tags: tagsArray };

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
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </label>
        {errors.title && <p className="error-message">{errors.title}</p>}
        
        <label>
          Description
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
        </label>
        {errors.description && <p className="error-message">{errors.description}</p>}
        
        <label>
          Tags (comma-separated)
          <input type="text" value={tags} onChange={(e) => setTags(e.target.value)} />
        </label>

        <button type="submit">Create Note</button>
        <button type="button" onClick={closeModal}>Cancel</button>
      </form>
    </div>
  );
}

export default CreateNoteModal;