import * as actionTypes from '../actions/actionTypes';
import { put } from 'redux-saga/effects';
import axios from 'axios';

export const auth = function* ({ isLogin, username, password }) {
    try {
        yield put({ type: actionTypes.AUTH_START });
        const url = isLogin ? '/login' : '/signup'
        const res=yield axios.post(url, {
            username,
            password
        })
        console.log(res);
        yield put({ type: actionTypes.AUTH_SUCCESS, res: res.data });
        if (res.data.success) {
            console.log(res);
            yield localStorage.setItem('token', res.data.token);
        }
        else
            yield put({ type: actionTypes.AUTH_FAIL, msg: res.msg });

    } catch (err) {
        console.log(err.response.data.error)
        yield put({ type: actionTypes.AUTH_FAIL, msg: err.response.data.error});
    }
}

export const logout= function*(){
    try{
        yield put({ type: actionTypes.LOADING });
        const res=yield axios.post('/logout', {}, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });
        localStorage.removeItem('token');
    }
    catch(error){
        console.log(error);
    }
}