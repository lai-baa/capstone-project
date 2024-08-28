// frontend/src/components/TaskDetails/TaskDetails.jsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getTaskDetails } from '../../store/task';

function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' };
    return new Intl.DateTimeFormat('en-US', options).format(date);
}

const TaskDetails = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const task = useSelector(state => state.tasks[id]);

    useEffect(() => {
        dispatch(getTaskDetails(id));
    }, [dispatch, id]);

    if (!task) return <p>Loading...</p>;

    return (
        <div>
            <h1>{task.title}</h1>
            <p>Due Date: {formatDate(task.dueDate)}</p>
            <p>Details: {task.description}</p>
            <p>Priority: {task.priority}</p>
            <button>Edit</button>
            <button>Delete</button>
        </div>
    );
};

export default TaskDetails;