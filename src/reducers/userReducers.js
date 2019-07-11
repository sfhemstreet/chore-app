import {REQUEST_SIGNIN_PENDING,
        REQUEST_SIGNIN_SUCCESS,
        REQUEST_SIGNIN_FAILED,
        REQUEST_REGISTER_PENDING,
        REQUEST_REGISTER_SUCCESS,
        REQUEST_REGISTER_FAILED,
        SIGN_OUT_USER } from '../constants/user_constants.js';


const userInitialState = {
    auth: 'guest',
    username: '',
    email: '',
    score: '',
    isPending: false,
    error: ''
}



// SIGNIN, SIGNOUT, REGISTER
export const user = (state = userInitialState, action = {}) => {
    switch(action.type){
        // SIGN IN

        case REQUEST_SIGNIN_PENDING:
            return Object.assign({}, state, { auth: 'guest', isPending: true });
        case REQUEST_SIGNIN_SUCCESS:
            return Object.assign({}, state, { 
                auth: 'user', 
                username: action.payload.userData.user_name, 
                email: action.payload.userData.email, 
                score: action.payload.userData.score,
                isPending: false 
              });
        case REQUEST_SIGNIN_FAILED:
            return Object.assign({}, state, { error: action.payload , auth: 'guest' });
        
        // SIGN OUT

        case SIGN_OUT_USER:
            return Object.assign({}, state, {
                auth: 'guest',
                username: '',
                email: '',
                score: '',
                isPending: false,
            });
        
        // REGISTER 

        case REQUEST_REGISTER_PENDING:
            return Object.assign({}, state, { auth: 'guest' });
        case REQUEST_REGISTER_SUCCESS:
            return Object.assign({}, state, { 
                auth: 'guest', 
                email: action.payload.email, 
                });
        case REQUEST_REGISTER_FAILED:
            return Object.assign({}, state, { error: action.payload , auth: 'guest' });
        default:
            return state;
    }
}



