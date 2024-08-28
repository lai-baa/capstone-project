import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom'; // Import useNavigate
import { getTaskDetails } from '../../store/task';
import EditTaskModal from '../EditTaskModal/EditTaskModal';
import DeleteTaskModal from '../DeleteTaskModal/DeleteTaskModal';
import { useModal } from '../../context/Modal';

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
        <div>
            <h1>{task.title}</h1>
            <p>Due Date: {formatDate(task.dueDate)}</p>
            <p>Details: {task.description}</p>
            <p>Priority: {task.priority}</p>
            <button onClick={() => openEditTaskModal(task)}>Edit</button>
            <button onClick={() => openDeleteTaskModal(task.id)}>Delete</button> {/* Updated delete button */}
        </div>
    );
};

export default TaskDetails;