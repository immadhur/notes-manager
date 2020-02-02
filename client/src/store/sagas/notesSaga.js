import * as actionTypes from '../actions/actionTypes';
import { put } from 'redux-saga/effects';
import axios from 'axios';

export function* getNotes() {
    try {
        yield put({ type: actionTypes.LOADING });
        const res = yield axios.get('/notes', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });
        yield put({ type: actionTypes.GET_NOTES_SUCCESS, notes: res.data.notes });
        if (res.status === 501)
            put({ type: actionTypes.LOGOUT })
        console.log(res);
    }
    catch (err) {
        yield put({ type: actionTypes.GET_NOTES_FAIL, msg: err });
        console.log(err);
    }
}

export function* addNote({data}) {
    try {
        yield put({ type: actionTypes.LOADING });
        const res = yield axios.post('/notes/add', {
            data
        }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });
        console.log(res);
        if (res.status === 501)
            put({ type: actionTypes.LOGOUT })
        else
            yield put({ type: actionTypes.ADD_NOTE_SUCCESS});
            yield put({ type: actionTypes.GET_NOTES});
    }
    catch (err) {
        yield put({ type: actionTypes.GET_NOTES_FAIL, msg: err });
        console.log(err);
    }
}

export function* deleteNote({key}) {
    try {
        yield put({ type: actionTypes.LOADING });
        const res = yield axios.delete(`/note/${key}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });
        if (res.status === 501)
            put({ type: actionTypes.LOGOUT })
        else
            yield put({ type: actionTypes.DELETE_NOTE_SUCCESS});
            yield put({ type: actionTypes.GET_NOTES});
    } catch (err) {
        yield put({ type: actionTypes.DELETE_NOTE_FAIL, msg: err });
        console.log(err);
    }
}