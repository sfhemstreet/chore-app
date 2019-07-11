import {
        REQUEST_GROUPS_PENDING, 
        REQUEST_GROUPS_SUCCESS, 
        REQUEST_GROUPS_FAILED } from '../constants/group_constants';

const groupInitState = {
    groups: [],
    inCompleteGroup: {},
    isPending: false,
}

export const group = (state = groupInitState, action = {}) => {
    switch(action.type){
        case REQUEST_GROUPS_PENDING:
            return Object.assign({}, state, { 
                isPending: true
                });
        case REQUEST_GROUPS_SUCCESS:
            return Object.assign({}, state, { 
                groups: action.payload.groups,
                //inCompleteGroup: action.payload.data.inCompleteGroup,
                isPending: false
                });
        case REQUEST_GROUPS_FAILED:
            return Object.assign({}, state, { 
                groups: [],
                //inCompleteGroup: action.payload.data.inCompleteGroup,
                isPending: false
                });
        default:
            return state;
    }
}