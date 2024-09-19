import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './FilteredNotes.css';

function FilteredNotes() {
  const filteredNotes = useSelector(state => state.notes.filtered);

  console.log('Filtered Notes:', filteredNotes);
  
  const navigate = useNavigate();

  const handleClick = (note) => {
    navigate(`/notes/${note.id}`);
  };

  if (!filteredNotes?.length) {
    return <p>No notes found matching the search criteria.</p>;
  }

  return (
    <div className="page-wrapper">
      <h1>Search Results</h1>
      <ul className="notes-container">
        {filteredNotes.map(note => (
          <li key={note.id} className="note-item" onClick={() => handleClick(note)}>
            <h2>{note.title}</h2>
            <p>{note.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FilteredNotes;