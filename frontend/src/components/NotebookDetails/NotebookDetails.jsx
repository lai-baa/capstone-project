import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getOneNotebook } from '../../store/notebook';

function NotebookDetails() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const notebook = useSelector(state => state.notebooks[id]);
    const notes = notebook?.Notes;

    useEffect(() => {
        dispatch(getOneNotebook(id));
    }, [dispatch, id]);

    if (!notebook) return <p>Loading...</p>;

    console.log('Notes:', notes);

    return (
        <div>
            <h1>{notebook.name}</h1>
            <button>Create a New Note</button>
            {notes?.length ? (
                <div>
                    {notes.map(note => (
                        <div>
                            <div>{note.title}</div>
                            <div>{note.description}</div>
                            <button>Edit</button>
                            <button>Delete</button>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No notes found for this notebook.</p>
            )}
        </div>
    );
}

export default NotebookDetails;