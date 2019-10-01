import {REQUEST_SIGNIN_PENDING,
    REQUEST_SIGNIN_SUCCESS,
    REQUEST_SIGNIN_FAILED,
    REQUEST_REGISTER_PENDING,
    REQUEST_REGISTER_SUCCESS,
    REQUEST_REGISTER_FAILED,
    SIGN_OUT_USER
} from '../constants/user_constants.js';

import {
    REQUEST_CHORES_PENDING, 
    REQUEST_CHORES_SUCCESS, 
    REQUEST_CHORES_FAILED } from '../constants/chore_constants';

const userInitialState = {
    auth: 'guest',
    username: '',
    email: '',
    chores: [],
    groups: {},
    createdGroups: [],
    groupAuth: {},
    score: '',
    isPending: false,
    error: ''
}

// SIGNIN, SIGNOUT, REGISTER, UPDATE CHORES
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
                chores: [],
                groups: {},
                createdGroups: [],
                groupAuth: {},
                score: '',
                isPending: false,
            });
        
        // REGISTER 
        case REQUEST_REGISTER_PENDING:
            return Object.assign({}, state, { auth: 'guest', isPending: true });
        case REQUEST_REGISTER_SUCCESS:
            return Object.assign({}, state, { 
                auth: 'guest', 
                isPending: false
            });
        case REQUEST_REGISTER_FAILED:
            return Object.assign({}, state, { error: action.payload , auth: 'guest', isPending: false });

        // UPDATE CHORES
        case REQUEST_CHORES_PENDING:
            return Object.assign({}, state, { 
                isPending: true 
                });
        case REQUEST_CHORES_SUCCESS:
            return Object.assign({}, state, { 
                chores: action.payload.chores,
                groups: action.payload.groups,
                createdGroups: action.payload.createdGroups,
                groupAuth: action.payload.auth,
                isPending: false
                });
        case REQUEST_CHORES_FAILED:
            return Object.assign({}, state, { 
                error: action.payload, 
                isPending: false
                });

        
    
        // DEFAULT
        default:
            return state;
    }
}



