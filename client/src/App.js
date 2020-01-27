import React, { useState } from 'react';
import './App.css';
import Login from './conponents/login/login';
import axios from 'axios';
import { Redirect, Switch, Route } from 'react-router-dom';
import Home from './conponents/Home/Home';

function App() {

  let [redirectToProfile, setRedirectToProfile] = useState(false);
  let [errorText, setErrorText] = useState('');
  let [isLogin, setIsLogin] = useState(true);

  const loginButtonClickHandler = (event, isLogin, username, password) => {
    event.preventDefault();
    if (isLogin) {
      loginUser('http://localhost:4000/login', username, password);
    }
    else {
      loginUser('http://localhost:4000/signup', username, password);
    }
  }

  const loginUser = (url, username, password) => {
    axios.post(url, {
      username,
      password
    }).then((res) => {
      console.log(res);
      if (res.data.success) {
        console.log(res);
        localStorage.setItem('token', res.data.token);
        setRedirectToProfile(true)
      }
      else
        setErrorText(res.msg);
    }).catch((err, res) => {
      console.log(err.response.data.error)
      setErrorText(err.response.data.msg);
    })
  }

  const secondButtonHandler=(e)=>{
    e.preventDefault();
    setIsLogin(!isLogin);
  }

  return (
    <div>
    <Switch>
      <Route path='/login' render={()=><Login click={loginButtonClickHandler} secondButtonClick={secondButtonHandler} isLogin={isLogin} errorTxt={errorText} />} />
      <Route path='/' component={Home} />
    </Switch>
    <div className="App">
      {redirectToProfile ?
        <Redirect to='/' /> :
        null
      }
    </div>
    </div>
  );
}

export default App;
