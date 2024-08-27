import { csrfFetch } from './csrf';
import { getOneNotebook } from './notebook';

// Action types
const GET_NOTE = 'notes/GET_NOTE';
const CREATE_NOTE = 'notes/CREATE_NOTE';
const EDIT_NOTE = 'notes/EDIT_NOTE';
const DELETE_NOTE = 'notes/DELETE_NOTE';

// Action creator
const getNote = (note) => ({
    type: GET_NOTE,
    note,
});

const addNote = (note) => ({
    type: CREATE_NOTE,
    note,
});

const editNoteAction = (note) => ({
    type: EDIT_NOTE,
    note,
});

const removeNote = (noteId) => ({
    type: DELETE_NOTE,
    noteId,
});

// Get note by note id thunk
export const getNoteDetails = (noteId) => async (dispatch) => {
    const response = await csrfFetch(`/api/notes/${noteId}`);

    if (response.ok) {
        const note = await response.json();
        dispatch(getNote(note));
        return note;
    } else {
        const error = await response.json();
        return error;
    }
};

// Create a new note thunk
export const createNote = (noteData) => async (dispatch) => {
    const response = await csrfFetch('/api/notes', {
        method: 'POST',
        body: JSON.stringify(noteData),
    });
    
    if (response.ok) {
        const data = await response.json();
        dispatch(addNote(data));
        dispatch(getOneNotebook(noteData.notebookId));
        return data;
    } else {
        const error = await response.json();
        return error;
    }
};

// Edit an existing note thunk
export const editNote = (id, noteData) => async (dispatch) => {
    // console.log("EDITING NOTE >>>>>", id, noteData);
    const response = await csrfFetch(`/api/notes/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(noteData),
    });

    // console.log("RES >>>>>>>>>", response)
    
    if (response.ok) {
        // console.log("IN RESPONSE >>>>>>>>>>>>>>")
        const updatedNote = await response.json();
        dispatch(editNoteAction(updatedNote));
        dispatch(getOneNotebook(noteData.notebookId));
        return updatedNote;
    } else {
        const error = await response.json();
        return { errors: error.errors };
    }
};

// Delete a note thunk
export const deleteNote = (noteId, notebookId) => async (dispatch) => {
    const response = await csrfFetch(`/api/notes/${noteId}`, {
        method: 'DELETE',
    });

    if (response.ok) {
        dispatch(removeNote(noteId));
        dispatch(getOneNotebook(notebookId));
        return { message: 'Note successfully deleted' };
    } else {
        const error = await response.json();
        return { errors: error.errors };
    }
};

// Initial state
const initialState = {};

// Reducer
const notesReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_NOTE: {
            return { ...state, [action.note.id]: action.note };
        }
        case CREATE_NOTE: {
            const newState = { ...state };
            newState[action.note.id] = action.note;
            return newState;
        }
        case EDIT_NOTE:
            return { ...state, [action.note.id]: action.note };
        case DELETE_NOTE: {
            const newState = { ...state };
            delete newState[action.noteId];
            return newState;
        }
        default:
            return state;
    }
};

export default notesReducer;
