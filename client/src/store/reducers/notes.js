import * as actionType from '../actions/actionTypes';

const initialState={
    loading:false,
    error:null,
    notes:[]
}

const loading=(state)=>{
    console.log('Start');
    return{
        ...state,
        loading:true,
        error:null
    }
}

const getNotes=(state, action)=>{
    console.log('GetNote', action);
    return {
        ...state,
        notes:action.notes,
        loading:false,
        error:null
    }
}

const addNote=(state, action)=>{
    return{
        ...state,
        loading:false,
        error:null
    }
}

const failedRes=(state)=>{
    return{
        ...state,
        error:'Something went Wrong!'
    }
}

export default (state=initialState, action)=>{
    switch(action.type){
        case(actionType.GET_NOTES_SUCCESS):return getNotes(state, action)
        case(actionType.DELETE_NOTE_SUCCESS):return addNote(state)
        case(actionType.ADD_NOTE_SUCCESS):return addNote(state, action);
        case(actionType.LOADING):return loading(state)
        case(actionType.GET_NOTES_FAIL):return failedRes(state);
        case(actionType.ADD_NOTE_FAIL):return failedRes(state);
        case(actionType.DELETE_NOTE_FAIL):return failedRes(state);
        default: return {...state};
    }
}