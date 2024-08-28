import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllTasks } from '../../store/task';
import { useNavigate } from 'react-router-dom';
import CreateTaskModal from '../CreateTaskModal/CreateTaskModal';
import EditTaskModal from '../EditTaskModal/EditTaskModal';
import DeleteTaskModal from '../DeleteTaskModal/DeleteTaskModal';
import { useModal } from '../../context/Modal';
import { createSelector } from 'reselect';

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

    const openEditTaskModal = (task) => {
        if (!task) {
          console.error('Task is undefined:', task);
          return;
        }
      
        setOnModalClose(() => {});
        setModalContent(<EditTaskModal task={task} closeModal={() => setModalContent(null)} />);
    };

    const openDeleteTaskModal = (taskId) => {
        setOnModalClose(() => {});
        setModalContent(<DeleteTaskModal taskId={taskId} closeModal={() => setModalContent(null)} />);
    };

    if (!tasks.length) return <p>No tasks found.</p>;

    return (
        <div>
            <h1>Your Tasks</h1>
            <button onClick={() => openCreateTaskModal()}>Create a New Task</button>
            <div>
                {tasks.map(task => (
                    <div key={task.id}>
                        <div onClick={() => navigate(`/tasks/${task.id}`)}>
                            <h2 key={task.id}>{task.title}</h2>
                        </div>
                        <div>
                            <button onClick={() => openEditTaskModal(task)}>Edit</button>
                            <button onClick={() => openDeleteTaskModal(task.id)}>Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TasksList;