import React, { useState } from 'react';
import Login from './login';
import axios from 'axios';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom'
import * as actions from '../../store/actions/actions';
import Spinner from '../UI/Spinner/Spinner';

const AuthMain = (props) => {

    let [isLogin, setIsLogin] = useState(true);

    const loginButtonClickHandler = (event, isLogin, username, password) => {
        event.preventDefault();
        props.authenticateUser({ isLogin, username, password })
    }

    const secondButtonHandler = (e) => {
        e.preventDefault();
        setIsLogin(!isLogin);
    }

    return (
        <>
            {props.loading ?
                <Spinner /> :
                <div className="App">
                    {props.loginSuccess ?
                        <Redirect to='/' /> :
                        <Login click={loginButtonClickHandler} secondButtonClick={secondButtonHandler} isLogin={isLogin} errorTxt={props.errorText} />
                    }
                </div>
            }
        </>
    );
}

const mapStateToProps = (state) => {
    return {
        errorText: state.auth.error,
        loginSuccess: state.auth.isLoggedIn,
        loading: state.auth.loading
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        authenticateUser: ({ ...args }) => dispatch(actions.auth({ ...args }))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthMain);