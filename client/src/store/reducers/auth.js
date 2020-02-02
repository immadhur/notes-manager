import * as actionType from '../actions/actionTypes';

const initialState={
    loading:false,
    isLoggedIn:false,
    token:null, 
    error:null
}

const authStart=()=>{
    console.log('Start');
    return{
        ...initialState,
        loading:true
    }
}

const authSuccess=(res)=>{
    console.log('Success' , res);
    return{
        ...initialState,
        loading:false,
        isLoggedIn:true,
        token:res.token
    }
}

const authFail=(action)=>{
    console.log('Fail' , action);
    return{
        ...initialState,
        error:action.msg
    }
}

const checkAuth=(state, token)=>{
    console.log('CheckAuth');
    return{
        ...state,
        token,
        isLoggedIn:token!=null
    }
}

export default (state=initialState, action)=>{
    switch(action.type){
        case(actionType.AUTH_START): return authStart();
        case(actionType.AUTH_SUCCESS) : return authSuccess(action);
        case(actionType.AUTH_FAIL) : return authFail(action);
        case(actionType.CHECK_AUTH) : return checkAuth(state, action.token);
        case(actionType.LOGOUT) : return {...initialState};
        default: console.log('def'); return {...state};
    }
}