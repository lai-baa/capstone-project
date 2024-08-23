// frontend/src/store/notebooks.js
import { csrfFetch } from './csrf';

// Action types
const GET_NOTEBOOKS = 'notebooks/GET_NOTEBOOKS';
const CREATE_NOTEBOOK = 'notebooks/CREATE_NOTEBOOK';
const UPDATE_NOTEBOOK = 'notebooks/UPDATE_NOTEBOOK';
const DELETE_NOTEBOOK = 'notebooks/DELETE_NOTEBOOK';

// Action creator
const getAllNotebooks = (notebooks) => ({
    type: GET_NOTEBOOKS,
    notebooks,
});

const addNotebook = (notebook) => ({
    type: CREATE_NOTEBOOK,
    notebook,
});

const updateNotebook = (notebook) => ({
    type: UPDATE_NOTEBOOK,
    notebook,
});

const removeNotebook = (notebookId) => ({
    type: DELETE_NOTEBOOK,
    notebookId,
});

// Get notebooks of user thunk
export const getNotebooks = () => async (dispatch) => {
    const response = await csrfFetch('/api/notebooks');
    if(response.ok){
        const data = await response.json();
        console.log('NOTEBOOKS >>>>>>>>>>>>>>>>', data.notebooks)
        dispatch(getAllNotebooks(data.notebooks));
        return data.notebooks;
    } else {
        const error = await response.json();
        return error;
    }
};

// Create notebook thunk
export const createNotebook = (notebookData) => async (dispatch) => {
    const response = await csrfFetch('/api/notebooks', {
        method: "POST",
        body: JSON.stringify(notebookData),
    })

    if(response.ok) {
        const data = await response.json();
        dispatch(addNotebook(data));
        return data;
    } else {
        const error = await response.json();
        return error;
    }
};

// Edit notebook thunk
export const editNotebook = (id, data) => async (dispatch) => {
    const response = await csrfFetch(`/api/notebooks/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
    });

    if (response.ok) {
        const updatedNotebook = await response.json();
        dispatch(updateNotebook(updatedNotebook));
        return updatedNotebook;
    }
};

// Delete notebook thunk
export const deleteNotebook = (notebookId) => async (dispatch) => {
    const response = await csrfFetch(`/api/notebooks/${notebookId}`, {
        method: 'DELETE',
    });

    if (response.ok) {
        dispatch(removeNotebook(notebookId));
    } else {
        const error = await response.json();
        return error;
    }
};

// Initial state
const initialState = {};

// Reducer
const notebooksReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_NOTEBOOKS: {
            const notebooks = {}
            action.notebooks.forEach(notebook => {
                notebooks[notebook.id] = notebook
            })
            return {...notebooks}
        }
        case CREATE_NOTEBOOK: {
            const newState = { ...state };
            newState[action.notebook.id] = action.notebook;
            return newState;
        }
        case UPDATE_NOTEBOOK: {
            return { ...state, [action.notebook.id]: action.notebook };
        }
        case DELETE_NOTEBOOK: {
            const newState = { ...state };
            delete newState[action.notebookId];
            return newState;
        }
        default:
            return state;
    }
};

export default notebooksReducer;
