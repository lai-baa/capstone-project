import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getNotebooks } from '../../store/notebook';
import { useNavigate } from 'react-router-dom';
import CreateNotebookModal from '../CreateNotebookModal/CreateNotebookModal';
import EditNotebookModal from '../EditNotebook/EditNotebookModal';
import DeleteNotebookModal from "../DeleteNotebookModal";
import { useModal } from '../../context/Modal';
import { createSelector } from 'reselect';
import './NotebooksList.css';

const selectNotebooks = createSelector(
  state => state.notebooks,
  notebooks => Object.values(notebooks)
);

const NotebooksList = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const notebooks = useSelector(selectNotebooks);
    const { setModalContent, setOnModalClose } = useModal();

    useEffect(() => {
        dispatch(getNotebooks());
    }, [dispatch]);

    const openCreateNotebookModal = () => {
        setOnModalClose(() => {});
        setModalContent(<CreateNotebookModal />);
    };

    const handleClick = (notebook) => {
        navigate(`/notebooks/${notebook.id}`);
    };

    const openDeleteNotebookModal = (notebookId, e) => {
        e.stopPropagation(); // Prevents the click event from bubbling up to the parent
        setModalContent(
            <DeleteNotebookModal notebookId={notebookId} closeModal={() => setModalContent(null)} />
        );
    };

    const openEditNotebookModal = (notebook, e) => {
        e.stopPropagation(); // Prevents the click event from bubbling up to the parent
        setOnModalClose(() => {});
        setModalContent(
            <EditNotebookModal 
                notebook={notebook}
                closeModal={() => setModalContent(null)}
            />
        );
    };

    return (
        <div className="page-wrapper">
            <div className="header-container">
                <h1>Your Notebooks</h1>
                <button onClick={openCreateNotebookModal}>Create a New Notebook</button>
            </div>
            <ul className="notebooks-container">
                {notebooks.map(notebook => (
                    <div key={notebook.id} className="notebook-item" onClick={() => handleClick(notebook)}>
                        <div id='notebook-div'>
                            <li className='notebook-name'>{notebook.name}</li>
                        </div>
                        <div>
                            {/* Pass the click event to prevent propagation */}
                            <button onClick={(e) => openEditNotebookModal(notebook, e)}>Edit</button>
                            <button onClick={(e) => openDeleteNotebookModal(notebook.id, e)}>Delete</button>
                        </div>
                    </div>
                ))}
            </ul>
        </div>
    );
};

export default NotebooksList;