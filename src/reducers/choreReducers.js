import {
        REQUEST_CHORES_PENDING, 
        REQUEST_CHORES_SUCCESS, 
        REQUEST_CHORES_FAILED } from '../constants/chore_constants';

const choresInitState = {
    chores: [],
    isPending: false,
    error: ''
}

export const chore = (state = choresInitState, action = {}) => {
    switch(action.type){
        case REQUEST_CHORES_PENDING:
            return Object.assign({}, state, { 
                isPending: true
                });
        case REQUEST_CHORES_SUCCESS:
            return Object.assign({}, state, { 
                chores: action.payload.chores,
                isPending: false
                });
        case REQUEST_CHORES_FAILED:
            return Object.assign({}, state, { 
                error: action.payload.error,
                isPending: false
                });
        default:
            return state;
    }
}