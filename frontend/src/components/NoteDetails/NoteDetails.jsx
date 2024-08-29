import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { getNoteDetails } from '../../store/note';
import EditNoteModal from '../EditNoteModal/EditNoteModal';
import DeleteNoteModal from '../DeleteNoteModal/DeleteNoteModal';
import { useModal } from '../../context/Modal';

function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

function NoteDetails() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const note = useSelector(state => state.notes[id]);
    const navigate = useNavigate();
    const { setModalContent, setOnModalClose } = useModal();

    useEffect(() => {
        dispatch(getNoteDetails(id));
    }, [dispatch, id]);

    const openEditNoteModal = () => {
        setOnModalClose(() => {
            dispatch(getNoteDetails(id));
        });

        setModalContent(<EditNoteModal note={note} />);
    };

    const openDeleteNoteModal = () => {
        setModalContent(
            <DeleteNoteModal 
                noteId={note.id} 
                notebookId={note.notebookId} 
                redirectAfterDelete={() => navigate(`/notebooks/${note.notebookId}`)}
            />
        );
    };

    if (!note) return <p>Loading...</p>;

    return (
        <div>
            <button onClick={() => navigate(`/notebooks/${note.notebookId}`)}>Back to Notes</button>
            <h1>{note.title}</h1>
            <p>{formatDate(note.updatedAt)}</p>
            <p>{note.description}</p>
            <h3>Tags:</h3>
            {note.Tags && note.Tags.length > 0 ? (
                <ul>
                    {note.Tags.map(tag => (
                        <li key={tag.id}>{tag.name}</li>
                    ))}
                </ul>
            ) : (
                <p>No tags assigned for this note</p>
            )}
            <button onClick={openEditNoteModal}>Edit Note</button>
            <button onClick={openDeleteNoteModal}>Delete Note</button>
        </div>
    );
}

export default NoteDetails;
