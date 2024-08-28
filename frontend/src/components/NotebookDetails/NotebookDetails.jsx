import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { getOneNotebook } from '../../store/notebook';
import { useModal } from '../../context/Modal';
import CreateNoteModal from '../CreateNoteModal/CreateNoteModal';
import EditNoteModal from '../EditNoteModal/EditNoteModal';
import DeleteNoteModal from '../DeleteNoteModal/DeleteNoteModal';
import './NotebookDetails.css';

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

    const handleSuccess = () => {
        dispatch(getOneNotebook(notebookId));
    };

    const openEditNoteModal = (event, note) => {
        event.stopPropagation(); // Prevent navigation
        setOnModalClose(() => {
            handleSuccess();
        });

        setModalContent(<EditNoteModal note={note} closeModal={() => setModalContent(null)} onSuccess={handleSuccess} />);
    };

    const openDeleteNoteModal = (event, note) => {
        event.stopPropagation(); // Prevent navigation
        setOnModalClose(() => {
            handleSuccess();
        });

        setModalContent(<DeleteNoteModal noteId={note.id} notebookId={note.notebookId} closeModal={() => setModalContent(null)} redirectAfterDelete={handleSuccess} />);
    };

    if (!notebook) return <p>Loading...</p>;

    return (
        <div className="page-wrapper">
            <div className="header-container">
                <h1>{notebook.name} Notes</h1>
                <div className="button-container">
                    <button onClick={openCreateNoteModal}>Create a New Note</button>
                    <button onClick={() => navigate("/notebooks")}>Back to All Notebooks</button>
                </div>
            </div>
            {notes?.length ? (
                <ul className="notes-container">
                    {notes?.map(note => (
                        <div key={note.id} className="note-item" onClick={() => handleClick(note)}>
                            <div id='note-div'>
                                <li className='note-title'>{note.title}</li>
                            </div>
                            <div className="note-item-buttons">
                                <button onClick={(event) => openEditNoteModal(event, note)}>Edit</button>
                                <button onClick={(event) => openDeleteNoteModal(event, note)}>Delete</button>
                            </div>
                        </div>
                    ))}
                </ul>
            ) : (
                <p>No notes found for this notebook.</p>
            )}
        </div>
    );
}

export default NotebookDetails;