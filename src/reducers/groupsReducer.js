import {
    CREATE_GROUP_FAILED,
    CREATE_GROUP_PENDING,
    CREATE_GROUP_SUCCESS
} from '../constants/group_constants'

const groupInitialState = {
    isPending : false,
    error : ''
}

export const user = (state = groupInitialState, action = {}) => {
    switch(action.type){
        case CREATE_GROUP_PENDING: 
            return Object.assign({}, state, { isPending: true });
        case CREATE_GROUP_SUCCESS:
            return Object.assign({}, state, { isPending: false });
        case CREATE_GROUP_FAILED:
            return Object.assign({}, state, { isPending: false , error: action.payload})
        default:
            return state;
    }
}