import { useEffect, useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useModal } from '../../context/Modal';
import { getNotebooks, deleteNotebook } from '../../store/notebook';
import EditNotebookModal from '../EditNotebook/EditNotebookModal';
import DeleteNotebookModal from '../DeleteNotebookModal';
import './Favorites.css';

const Favorites = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [favoriteNotebooks, setFavoriteNotebooks] = useState([]);
    const { setModalContent, setOnModalClose } = useModal();

    // Use useCallback to memoize fetchFavorites
    const fetchFavorites = useCallback(() => {
        dispatch(getNotebooks())
            .then((fetchedNotebooks) => {
                const favorites = Object.values(fetchedNotebooks).filter(notebook => notebook.favorite);
                setFavoriteNotebooks(favorites);
            })
            .catch((error) => {
                console.error('Error fetching notebooks:', error);
            });
    }, [dispatch]); // Dependencies

    useEffect(() => {
        fetchFavorites();
    }, [fetchFavorites]);

    const handleClick = (notebook) => {
        navigate(`/notebooks/${notebook.id}`);
    };

    const openDeleteNotebookModal = (notebookId, e) => {
        e.stopPropagation();
        setModalContent(
            <DeleteNotebookModal
                notebookId={notebookId}
                closeModal={() => {
                    setModalContent(null);
                    handleDelete(notebookId);
                    fetchFavorites()
                }}
            />
        );
    };

    const openEditNotebookModal = (notebook, e) => {
        e.stopPropagation();
        setOnModalClose(() => {});
        setModalContent(
            <EditNotebookModal
                notebook={notebook}
                closeModal={() => {
                    setModalContent(null);
                    fetchFavorites();
                }}
            />
        );
    };

    const handleDelete = (notebookId) => {
        dispatch(deleteNotebook(notebookId))
            .then(() => {
                setFavoriteNotebooks(prevFavorites => prevFavorites.filter(notebook => notebook.id !== notebookId));
            })
            .catch((error) => {
                console.error('Error deleting notebook:', error);
            });
    };

    if (!favoriteNotebooks.length) {
        return <div>No favorite notebooks found.</div>;
    }

    return (
        <div className="page-wrapper">
            <div className="header-container">
                <h1>Your Favorite Notebooks</h1>
                <button onClick={() => navigate("/notebooks")}>View All Notebooks</button>
            </div>
            <ul className="notebooks-container">
                {favoriteNotebooks.map(notebook => (
                    <div key={notebook.id} className="notebook-item" onClick={() => handleClick(notebook)}>
                        <div id='notebook-div'>
                            <li className='notebook-name'>{notebook.name}</li>
                        </div>
                        <div>
                            <button onClick={(e) => openEditNotebookModal(notebook, e)}>Edit</button>
                            <button onClick={(e) => openDeleteNotebookModal(notebook.id, e)}>Delete</button>
                        </div>
                    </div>
                ))}
            </ul>
        </div>
    );
};

export default Favorites;