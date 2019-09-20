import {
    CREATE_GROUP_FAILED,
    CREATE_GROUP_PENDING,
    CREATE_GROUP_SUCCESS,
    DELETE_GROUP_PENDING,
    DELETE_GROUP_SUCCESS,
    DELETE_GROUP_FAILED,
    EDIT_GROUP_PENDING,
    EDIT_GROUP_SUCCESS,
    EDIT_GROUP_FAILED
} from '../constants/group_constants'

const groupInitialState = {
    isPending : false,
    error : ''
}

export const group = (state = groupInitialState, action = {}) => {
    switch(action.type){
        case CREATE_GROUP_PENDING: 
            return Object.assign({}, state, { isPending: true });
        case CREATE_GROUP_SUCCESS:
            return Object.assign({}, state, { isPending: false });
        case CREATE_GROUP_FAILED:
            return Object.assign({}, state, { isPending: false , error: action.payload})
        case DELETE_GROUP_PENDING: 
            return Object.assign({}, state, { isPending: true });
        case DELETE_GROUP_SUCCESS:
            return Object.assign({}, state, { isPending: false });
        case DELETE_GROUP_FAILED:
            return Object.assign({}, state, { isPending: false , error: action.payload})
        case EDIT_GROUP_PENDING: 
            return Object.assign({}, state, { isPending: true });
        case EDIT_GROUP_SUCCESS:
            return Object.assign({}, state, { isPending: false });
        case EDIT_GROUP_FAILED:
            return Object.assign({}, state, { isPending: false , error: action.payload})
        default:
            return state;
    }
}