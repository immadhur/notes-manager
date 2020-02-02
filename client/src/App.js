import React, {useEffect} from 'react';
import './App.css';
import { Switch, Route, Redirect } from 'react-router-dom';
import Home from './components/Home/Home';
import AuthMain from './components/login/AuthMain';
import { connect } from 'react-redux'
import * as action from './store/actions/actions';

function App(props) {

  useEffect(()=>{
    props.checkAuth();
  }, [])

  return (
    <>
      {props.isLoggedIn ?
        <Redirect from='/login' to='/' /> :
        <Redirect to='/login'/>
      }
      <Switch>
        <Route path='/login' component={AuthMain} />
        <Route path='/' component={Home} />
      </Switch>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.auth.isLoggedIn
  }
}

const mapDispatchToProps=(dispatch)=>{
  return{
    checkAuth:()=>dispatch(action.checkAuth())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
