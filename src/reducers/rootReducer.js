import {combineReducers} from 'redux';
import {userAccess} from'./userReducers.js';

const rootReducer = combineReducers({userAccess}); 

export default rootReducer;