import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, combineReducers } from 'redux'
import authReducer from './store/reducers/auth';
import notesReducer from './store/reducers/notes';
import createSagaMiddleware from 'redux-saga'
import saga from './store/sagas'

const reducer = combineReducers({
    auth: authReducer,
    notes: notesReducer
})

const sagaMiddleWare=createSagaMiddleware();
const store = createStore(reducer, applyMiddleware(sagaMiddleWare));

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
    , document.getElementById('root'));

sagaMiddleWare.run(saga);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
