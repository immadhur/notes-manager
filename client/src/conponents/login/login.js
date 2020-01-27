import React, { useState } from 'react';
import style from './login.module.css'

const Login = (props) => {

    let [username, setUsername] = useState('');
    let [password, setPassword] = useState('');

    const onChangeHandler = (e, isUsername) => {
        if (isUsername)
            setUsername(e.target.value);
        else
            setPassword(e.target.value);
    }

    return (
        <form className={style.Body}>
            <h2>{props.isLogin ? 'LOGIN' : 'SIGNUP'}</h2>
            <div className={style.input}>
                Username: <input type='email' value={username} onChange={(e) => onChangeHandler(e, true)} />
            </div>
            <div className={style.input}>
                Password: <input type='password' value={password} onChange={(e) => onChangeHandler(e, false)} />
            </div>
            <p style={{ color: 'red', fontSize: '12px' }}>{props.errorTxt}</p>
            <div>
                <button className={style.button} onClick={(event) => props.click(event, props.isLogin, username, password)}>{props.isLogin ? 'Login' : 'Signup'}</button>
                <button className={style.button} onClick={props.secondButtonClick}>{props.isLogin ? 'Signup' : 'Login'}</button>
            </div>
        </form>
    )
}

export default Login