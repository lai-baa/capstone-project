import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import "./FilteredNotes.css";

// debugging needed for filtered notes - filtered notes dont populate when search term is inputted and submitted

function FilteredNotes() {
    const filteredNotes = useSelector((state) => state.notes.filtered || []);
    const navigate = useNavigate();

    // Debug filteredNotes to ensure it changes when navigating
    useEffect(() => {
        console.log("Rendered filteredNotes:", filteredNotes);
    }, [filteredNotes]);

    const handleClick = (note) => {
        navigate(`/notes/${note.id}`);
    };

    // Remove the dispatch clearing effect during unmounting
    return (
        <div className="page-wrapper">
            <h1>Search Results</h1>
            {filteredNotes.length === 0 ? (
                <p>No notes found matching the search criteria.</p>
            ) : (
                <ul className="notes-container">
                    {filteredNotes.map((note) => (
                        <li
                            key={note.id}
                            className="note-item"
                            onClick={() => handleClick(note)}
                        >
                            <h2>{note.title}</h2>
                            <p>{note.description}</p>
                            <p>{note.updatedAt}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default FilteredNotes;