import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getNotebooks } from '../../store/notebook';
import { useNavigate } from 'react-router-dom';
import CreateNotebookModal from '../CreateNotebookModal/CreateNotebookModal';
import { useModal } from '../../context/Modal';
import { createSelector } from 'reselect';

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

    return (
        <div>
            <h1>Your Notebooks</h1>
            <button onClick={openCreateNotebookModal}>Create a New Notebook</button>
            <ul>
                {notebooks.map(notebook => (
                    <div key={notebook.id} id='notebook-div' onClick={() => handleClick(notebook)}>
                        <li>{notebook.name}</li>
                        <button>Edit</button>
                        <button>Delete</button>
                    </div>
                ))}
            </ul>
        </div>
    );
};

export default NotebooksList;