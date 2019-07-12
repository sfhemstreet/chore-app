import {combineReducers} from 'redux';
import {user} from './userReducers.js';
//import {chore} from './choreReducers.js';

const rootReducer = combineReducers({user}); 

export default rootReducer;