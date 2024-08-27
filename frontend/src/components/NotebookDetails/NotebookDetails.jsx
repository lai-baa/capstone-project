import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { getOneNotebook } from '../../store/notebook';
import { useModal } from '../../context/Modal';
import CreateNoteModal from '../CreateNoteModal/CreateNoteModal';
import EditNoteModal from '../EditNoteModal/EditNoteModal';
import DeleteNoteModal from '../DeleteNoteModal/DeleteNoteModal';

function NotebookDetails() {
    const { id: notebookId } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { setModalContent, setOnModalClose } = useModal();
    const notebook = useSelector(state => state.notebooks[notebookId]);
    const notes = notebook?.Notes || [];

    useEffect(() => {
        if (notebookId) {
            dispatch(getOneNotebook(notebookId));
        }
    }, [dispatch, notebookId]);

    const handleClick = (note) => {
        navigate(`/notes/${note.id}`);
    };

    const openCreateNoteModal = () => {
        setOnModalClose(() => {
            dispatch(getOneNotebook(notebookId));
        });
        setModalContent(<CreateNoteModal notebookId={notebookId} />);
    };
    
    const openEditNoteModal = (note) => {
        if (!note.notebookId) {
            console.error('Notebook ID is undefined in note:', note);
            return;
        }
    
        setOnModalClose(() => {
            dispatch(getOneNotebook(note.notebookId));
        });
    
        setModalContent(<EditNoteModal note={note} />);
    };

    const openDeleteNoteModal = (note) => {
        if (!note.id) {
            console.error('Note ID is undefined in note:', note);
            return;
        }
    
        setOnModalClose(() => {
            dispatch(getOneNotebook(note.notebookId));
        });
    
        setModalContent(<DeleteNoteModal noteId={note.id} notebookId={note.notebookId} />);
    };

    if (!notebook) return <p>Loading...</p>;

    return (
        <div>
            <h1>{notebook.name}</h1>
            <button onClick={openCreateNoteModal}>Create a New Note</button>
            <button onClick={() => navigate("/notebooks")}>Back to All Notebooks</button>
            {notes?.length ? (
                <div>
                    {notes?.map(note => (
                        <div key={note.id}>
                            <div onClick={() => handleClick(note)}>
                                <li>{note.title}</li>
                            </div>
                            <div>
                                <button onClick={() => openEditNoteModal(note)}>Edit</button>
                                <button onClick={() => openDeleteNoteModal(note)}>Delete</button>
                            </div>
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