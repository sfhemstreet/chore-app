import {combineReducers} from 'redux';
import {user} from './userReducers.js';
//import {chore} from './choreReducers.js';
import {group} from './groupsReducer.js';
import {settings} from './settingsReducers';

const rootReducer = combineReducers({user, group, settings}); 

export default rootReducer;