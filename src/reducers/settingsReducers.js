import {
    PASSWORD_CHANGE_PENDING,
    PASSWORD_CHANGE_SUCCESS,
    PASSWORD_CHANGE_FAILED,
    DELETE_ACCOUNT_PENDING,
    DELETE_ACCOUNT_SUCCESS,
    DELETE_ACCOUNT_FAILED
} from '../constants/settings_constants';


const userInitialState = {
    isPending: false,
    deleteError: '',
    passwordChangeError: ''
}

// SEETINGS - change password
export const settings = (state = userInitialState, action = {}) => {
    switch(action.type){
        // SIGN IN
        case PASSWORD_CHANGE_PENDING:
            return Object.assign({}, state, {  
                isPending: true,
                passwordChangeError: '' 
            });
        case PASSWORD_CHANGE_SUCCESS:
            return Object.assign({}, state, { 
                isPending: false,
                passwordChangeError: '' 
            });
        case PASSWORD_CHANGE_FAILED:
            return Object.assign({}, state, { 
                passwordChangeError: 'Unable to change password' , 
                isPending: false,
            });

        // DELETE ACCOUNT
        case DELETE_ACCOUNT_PENDING:
            return Object.assign({}, state, {
                isPending: true,
                deleteError: ''
            });
        case DELETE_ACCOUNT_SUCCESS:
            return Object.assign({}, state, {
                isPending: false,
                deleteError: ''
            });
        case DELETE_ACCOUNT_FAILED:
            return Object.assign({}, state, {
                isPending: false,
                deleteError: 'Unable to delete account'
            });

        // DEFAULT
        default:
            return state;
    }
}