// frontend/src/store/notebooks.js
import { csrfFetch } from './csrf';

// Action types
const GET_NOTEBOOKS = 'notebooks/GET_NOTEBOOKS';
const CREATE_NOTEBOOK = 'notebooks/CREATE_NOTEBOOK';

// Action creator
const getAllNotebooks = (notebooks) => ({
    type: GET_NOTEBOOKS,
    notebooks,
});

const addNotebook = (notebook) => ({
    type: CREATE_NOTEBOOK,
    notebook,
})

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

// Initial state
const initialState = {};

// Reducer
const notebooksReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_NOTEBOOKS:
            const notebooks = {}
            action.notebooks.forEach(notebook => {
                notebooks[notebook.id] = notebook
            })
            return {...notebooks}
        case CREATE_NOTEBOOK: 
            const newState = { ...state };
            newState[action.notebook.id] = action.notebook;
            return newState;
        default:
            return state;
    }
};

export default notebooksReducer;
