import {REQUEST_SIGNIN_PENDING,
        REQUEST_SIGNIN_SUCCESS,
        REQUEST_SIGNIN_FAILED} from '../constants/user_constants.js';


const userInitialState = {
    auth: 'guest',
    user_id: '',
    username: '',
    email: '',
    groups: [],
    score: '',
    error: ''
}

export const signinReducer = (state = userInitialState, action = {}) => {
    switch(action.type){
        case REQUEST_SIGNIN_PENDING:
            return Object.assign({}, state, { auth: 'guest' });
        case REQUEST_SIGNIN_SUCCESS:
            return Object.assign({}, state, { 
                auth: 'user', 
                id: action.payload.id, 
                name: action.payload.name, 
                email: action.payload.email, 
                score: action.payload.score,
                error: 'none' 
              });
        case REQUEST_SIGNIN_FAILED:
            return Object.assign({}, state, { error: action.payload , auth: 'guest' });
        default:
            return state;
    }
}