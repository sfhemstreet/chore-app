import {combineReducers} from 'redux';
import {user} from './userReducers.js';
import {group} from './groupReducers.js';

const rootReducer = combineReducers({user, group}); 

export default rootReducer;