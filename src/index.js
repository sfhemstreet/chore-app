import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware, combineReducers} from 'redux';
import {createLogger} from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import {signinReducer} from'./redux/reducers/userReducers.js';
//import {getGroupsReducer} from'./redux/reducers/groupReducers.js';
import 'tachyons';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

const logger = createLogger();
const rootReducer = signinReducer; //combineReducers({ }); // PUT REDUCERS HERE
const store = createStore(rootReducer, applyMiddleware(thunkMiddleware, logger));


ReactDOM.render(
<Provider store={store}>
    <BrowserRouter >
        <App />
    </BrowserRouter>
</Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
