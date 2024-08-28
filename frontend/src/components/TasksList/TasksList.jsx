import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllTasks } from '../../store/task';
import { useNavigate } from 'react-router-dom';
import CreateTaskModal from '../CreateTaskModal/CreateTaskModal';
import EditTaskModal from '../EditTaskModal/EditTaskModal';
import DeleteTaskModal from '../DeleteTaskModal/DeleteTaskModal';
import { useModal } from '../../context/Modal';
import { createSelector } from 'reselect';
import './TasksList.css';  // Import the new CSS file

const selectTasks = createSelector(
  state => state.tasks,
  tasks => Object.values(tasks)
);

const TasksList = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { setModalContent, setOnModalClose } = useModal();
    const tasks = useSelector(selectTasks);

    useEffect(() => {
        dispatch(getAllTasks());
    }, [dispatch]);

    const openCreateTaskModal = () => {
        setOnModalClose(() => {});
        setModalContent(<CreateTaskModal />);
    };

    const openEditTaskModal = (event, task) => {
        event.stopPropagation(); // Prevents the click event from bubbling up to the parent
        if (!task) {
          console.error('Task is undefined:', task);
          return;
        }
      
        setOnModalClose(() => {});
        setModalContent(<EditTaskModal task={task} closeModal={() => setModalContent(null)} />);
    };

    const openDeleteTaskModal = (event, taskId) => {
        event.stopPropagation(); // Prevents the click event from bubbling up to the parent
        setOnModalClose(() => {});
        setModalContent(<DeleteTaskModal taskId={taskId} closeModal={() => setModalContent(null)} />);
    };

    if (!tasks.length) return <p>No tasks found.</p>;

    return (
        <div className="page-wrapper">
            <div className="header-container">
                <h1>Your Tasks</h1>
                <button onClick={openCreateTaskModal}>Create a New Task</button>
            </div>
            <div className="tasks-container">
                {tasks.map(task => (
                    <div key={task.id} className="task-item" onClick={() => navigate(`/tasks/${task.id}`)}>
                        <div>
                            <h2 className="task-title">{task.title}</h2>
                        </div>
                        <div>
                            {/* Pass the click event to prevent propagation */}
                            <button onClick={(event) => openEditTaskModal(event, task)}>Edit</button>
                            <button onClick={(event) => openDeleteTaskModal(event, task.id)}>Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TasksList;