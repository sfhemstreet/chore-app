import {combineReducers} from 'redux';
import {user} from './userReducers.js';
//import {chore} from './choreReducers.js';
import {group} from './groupsReducer.js';

const rootReducer = combineReducers({user, group}); 

export default rootReducer;