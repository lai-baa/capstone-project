// frontend/src/store/task.js
import { csrfFetch } from './csrf';

// Action types
const GET_TASKS = "task/GET_TASKS";
const GET_TASK_DETAILS = "task/GET_TASK_DETAILS";
const CREATE_TASK = 'tasks/CREATE_TASK';
const EDIT_TASK = 'tasks/EDIT_TASK';
const DELETE_TASK = 'tasks/DELETE_TASK';
const GET_REMINDERS = 'tasks/GET_REMINDERS';

// Actions
const getTasksAction = (tasks) => ({
    type: GET_TASKS,
    tasks,
});

const getTaskDetailsAction = (task) => ({
    type: GET_TASK_DETAILS,
    task
});

const addTask = (task) => ({
    type: CREATE_TASK,
    task,
});

const editTaskAction = (task) => ({
    type: EDIT_TASK,
    task,
});

const deleteTaskAction = (taskId) => ({
    type: DELETE_TASK,
    taskId,
});

const getAllReminders = (tasks) => ({
    type: GET_REMINDERS,
    tasks,
});

// Get all tasks thunk
export const getAllTasks = () => async (dispatch) => {
    const response = await csrfFetch('/api/tasks');

    if (response.ok) {
        const tasks = await response.json();
        dispatch(getTasksAction(tasks));
    } else {
        const error = await response.json();
        return error;
    }
};

// Get task details by task id
export const getTaskDetails = (taskId) => async (dispatch) => {
    const response = await csrfFetch(`/api/tasks/${taskId}`);

    if (response.ok){
        const task = await response.json();
        dispatch(getTaskDetailsAction(task));
        return task;
    } else {
        const error = await response.json();
        return error;
    }
};

// Create task thunk
export const createTask = (taskData) => async (dispatch) => {
    const response = await csrfFetch('/api/tasks', {
        method: 'POST',
        body: JSON.stringify(taskData),
    });

    if (response.ok) {
        const task = await response.json();
        dispatch(addTask(task));
        return task;
    } else {
        const error = await response.json();
        return { errors: error.errors };
    }
};

// Edit task thunk
export const editTask = (taskId, taskData) => async (dispatch) => {
    const response = await csrfFetch(`/api/tasks/${taskId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(taskData),
    });
  
    if (response.ok) {
      const task = await response.json();
      dispatch(editTaskAction(task));
      return task;
    } else {
      const error = await response.json();
      return { errors: error.errors };
    }
};

// Delete task thunk
export const deleteTask = (taskId) => async (dispatch) => {
    const response = await csrfFetch(`/api/tasks/${taskId}`, {
      method: 'DELETE',
    });
  
    if (response.ok) {
      dispatch(deleteTaskAction(taskId));
      return true;
    } else {
      const error = await response.json();
      return { errors: error.errors };
    }
};

// Get tasks due within the next 5 days thunk
export const getReminders = () => async (dispatch) => {
    const response = await csrfFetch('/api/tasks/reminders');
    if (response.ok) {
        console.log("IN THUNK >>>>>>>>>>>>>>>>")
        // console.log("RES >>>>>>>>>>>>>>", response)
        const data = await response.json();
        // console.log(">>>>>>>>>>>>>", data)
        dispatch(getAllReminders(data.tasks));
        return data.tasks;
    } else {
        const error = await response.json();
        return error;
    }
};

// Initial state
const initialState = {};

// Reducer
const tasksReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_TASKS: {
            const newState = {};
            action.tasks.forEach(task => {
                newState[task.id] = task;
            });
            return newState;
        }
        case GET_TASK_DETAILS: {
            return { ...state, [action.task.id]: action.task };
        }
        case CREATE_TASK: {
            return { ...state, [action.task.id]: action.task };
        }
        case EDIT_TASK: {
            return { ...state, [action.task.id]: action.task };
        }
        case DELETE_TASK: {
            const newState = { ...state };
            delete newState[action.taskId];
            return newState;
        }
        case GET_REMINDERS: {
            const reminders = {};
            action.tasks.forEach(task => {
                reminders[task.id] = task;
            });
            return { ...state, ...reminders };
        }
        default:
            return state;
    }
};

export default tasksReducer;
