import {createStore, applyMiddleware} from 'redux';
import {createLogger} from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import rootReducer from '../reducers/rootReducer';

const logger = createLogger();
let middleware = [thunkMiddleware];

if(process.env.NODE_ENV !== 'production') {
    middleware = [...middleware, logger];
} 

const store = createStore(rootReducer, applyMiddleware(...middleware));

export default store;