import * as actionTypes from './actionTypes';

export const auth=(action)=>{
    return{
        ...action,
        type:actionTypes.AUTH
    }
}

export const getNotes=()=>{
    return{
        type:actionTypes.GET_NOTES
    }
}

export const addNote=(data)=>{
    return{
        type:actionTypes.ADD_NOTE,
        data
    }
}

export const checkAuth=()=>{
    console.log('CheckAuth');
    return {
        type:actionTypes.CHECK_AUTH,
        token:localStorage.getItem('token')
    }
}

export const deleteNote=(key)=>{
    return{
        type:actionTypes.DELETE_NOTE,
        key
    }
}

export const logout=()=>{
    return{
        type:actionTypes.LOGOUT
    }
}