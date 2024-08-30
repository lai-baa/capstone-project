import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getReminders } from '../../store/task';
import { useNavigate } from 'react-router-dom';
import "./Reminders.css";

function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' };
    return new Intl.DateTimeFormat('en-US', options).format(date);
}

const Reminders = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const tasks = useSelector(state => state.tasks);

    console.log("TASKS >>>>>>>>>>>>", tasks)

    // Memoize reminderTasks to avoid re-renders when tasks don't change
    const reminderTasks = useMemo(() => {
        const today = new Date();
        const fiveDaysFromNow = new Date();
        fiveDaysFromNow.setDate(today.getDate() + 5);

        return Object.values(tasks).filter(task => {
            const taskDueDate = new Date(task.dueDate);
            return taskDueDate >= today && taskDueDate <= fiveDaysFromNow;
        });
    }, [tasks]);

    useEffect(() => {
        dispatch(getReminders());
    }, [dispatch]);

    if (!reminderTasks.length) {
        return <div>No tasks due in the next 5 days.</div>;
    }

    return (
        <div>
            <h1>Your Reminders</h1>
            <button onClick={() => navigate("/tasks")}>View All Tasks</button>
            <ul>
                {reminderTasks.map(task => (
                    <li key={task.id}>
                        <div onClick={() => navigate(`/tasks/${task.id}`)}>
                            <h3>{task.title}</h3>
                            <p>Due Date: {formatDate(task.dueDate)}</p>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Reminders;