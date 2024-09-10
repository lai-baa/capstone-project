import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCompletedTasks } from '../../store/task';
import { useNavigate } from 'react-router-dom';
import './CompletedTasks.css';

const CompletedTasks = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const completedTasks = useSelector(state => Object.values(state.tasks).filter(task => task.completed));

    useEffect(() => {
        dispatch(getCompletedTasks());
    }, [dispatch]);

    return (
        <div className="page-wrapper">
            <div className="header-container">
                <h1>Completed Tasks</h1>
            </div>
            {completedTasks.length === 0 ? (
                <p>No completed tasks yet.</p>
            ) : (
                <div className="tasks-container">
                    {completedTasks.map(task => (
                        <div key={task.id} className="task-item" onClick={() => navigate(`/tasks/${task.id}`)}>
                            <h2 className="task-title">{task.title}</h2>
                            <p className="task-description">{task.description}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default CompletedTasks;
