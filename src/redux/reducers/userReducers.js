import {REQUEST_SIGNIN_PENDING,
        REQUEST_SIGNIN_SUCCESS,
        REQUEST_SIGNIN_FAILED} from '../constants/user_constants.js';


const userInitialState = {
    auth: 'guest',
    id: '',
    name: '',
    email: '',
    groups: [],
    rank: '',
    error: ''
}

export const signinRequest = (state = userInitialState, action = {}) => {
    switch(action.type){
        case REQUEST_SIGNIN_PENDING:
            return Object.assign({}, state, { auth: 'guest' });
        case REQUEST_SIGNIN_SUCCESS:
            return Object.assign({}, state, { 
                auth: action.payload.auth, 
                id: action.payload.id, 
                name: action.payload.name, 
                email: action.payload.email, 
                groups: action.payload.groups,
                rank: action.payload.groups,
                error: action.payload.groups 
              });
        case REQUEST_SIGNIN_FAILED:
            return Object.assign({}, state, { error: action.payload.error, auth: 'guest' });
        default:
            return state;
    }
}