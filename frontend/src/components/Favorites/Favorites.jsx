// frontend/src/components/Favorites/Favorites.jsx
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useModal } from '../../context/Modal';
import { getNotebooks } from '../../store/notebook';
import EditNotebookModal from '../EditNotebook/EditNotebookModal';
import DeleteNotebookModal from '../DeleteNotebookModal';
import './Favorites.css';

const Favorites = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [favoriteNotebooks, setFavoriteNotebooks] = useState([]);
    const { setModalContent, setOnModalClose } = useModal();

    useEffect(() => {
        // Fetch all notebooks and filter favorites in useEffect
        dispatch(getNotebooks())
            .then((fetchedNotebooks) => {
                const favorites = Object.values(fetchedNotebooks).filter(notebook => notebook.favorite);
                setFavoriteNotebooks(favorites);
            })
            .catch((error) => {
                console.error('Error fetching notebooks:', error);
            });
    }, [dispatch]);

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

    if (!favoriteNotebooks.length) {
        return <div>No favorite notebooks found.</div>;
    }

    return (
        <div>
            <h2>Your Favorite Notebooks</h2>
            <button onClick={() => navigate("/notebooks")}>View All Notebooks</button>
            <div className="notebooks-container">
                {favoriteNotebooks.map(notebook => (
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
            </div>
        </div>
    );
};

export default Favorites;