import * as actionTypes from '../actions/actionTypes';
import * as authSagas from './authSaga';
import * as notesSagas from './notesSaga';
import {takeEvery} from 'redux-saga/effects';

export default function*(){
    yield takeEvery(actionTypes.AUTH, authSagas.auth)
    yield takeEvery(actionTypes.GET_NOTES, notesSagas.getNotes)
    yield takeEvery(actionTypes.ADD_NOTE, notesSagas.addNote)
    yield takeEvery(actionTypes.DELETE_NOTE, notesSagas.deleteNote)
    yield takeEvery(actionTypes.LOGOUT, authSagas.logout)
}