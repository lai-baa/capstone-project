import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getNoteDetails } from '../../store/note';

function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

function NoteDetails() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const note = useSelector(state => state.notes[id]);

    useEffect(() => {
        dispatch(getNoteDetails(id));
    }, [dispatch, id]);

    if (!note) return <p>Loading...</p>;

    return (
        <div>
            <h1>{note.title}</h1>
            <p>{formatDate(note.updatedAt)}</p>
            <p>{note.description}</p>
            <button>Edit Note</button>
            <button>Delete Note</button>
        </div>
    );
}

export default NoteDetails;
