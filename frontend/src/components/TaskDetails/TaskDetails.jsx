import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom'; // Import useNavigate
import { getTaskDetails } from '../../store/task';
import EditTaskModal from '../EditTaskModal/EditTaskModal';
import DeleteTaskModal from '../DeleteTaskModal/DeleteTaskModal';
import { useModal } from '../../context/Modal';
import "./TaskDetails.css";

function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' };
    return new Intl.DateTimeFormat('en-US', options).format(date);
}

const TaskDetails = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate(); // Initialize useNavigate
    const task = useSelector(state => state.tasks[id]);
    const { setModalContent, setOnModalClose } = useModal();

    useEffect(() => {
        dispatch(getTaskDetails(id));
    }, [dispatch, id]);

    const openEditTaskModal = (task) => {
        if (!task) {
          console.error('Task is undefined:', task);
          return;
        }

        setOnModalClose(() => {});
        setModalContent(<EditTaskModal task={task} closeModal={() => setModalContent(null)} />);
    };

    const openDeleteTaskModal = (taskId) => {
        setModalContent(
            <DeleteTaskModal 
                taskId={taskId} 
                redirectAfterDelete={() => navigate('/tasks')} // Pass redirect function
            />
        );
    };

    if (!task) return <p>Loading...</p>;

    return (
        <div className="task-details-container">
            <div className="task-header-container">
                <h1 className="task-title">{task.title}</h1>
                <button className="back-to-tasks-button" onClick={() => navigate(`/tasks`)}>Back to Tasks</button>
            </div>
            <p className="task-date">Due Date: {formatDate(task.dueDate)}</p>
            <p className="task-description">Details: {task.description}</p>
            <p className="task-priority">Priority: {task.priority}</p>
            <div className="task-action-buttons">
                <button onClick={() => openEditTaskModal(task)}>Edit</button>
                <button className="task-delete-btn" onClick={() => openDeleteTaskModal(task.id)}>Delete</button>
            </div>
        </div>
    );
};

export default TaskDetails;