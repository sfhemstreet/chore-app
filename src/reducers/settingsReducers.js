import {
    PASSWORD_CHANGE_PENDING,
    PASSWORD_CHANGE_SUCCESS,
    PASSWORD_CHANGE_FAILED,
    DELETE_ACCOUNT_PENDING,
    DELETE_ACCOUNT_SUCCESS,
    DELETE_ACCOUNT_FAILED,
    RESET_PASSWORD_PENDING,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_FAILED, 
    FORGOT_PASSWORD_PENDING, 
    FORGOT_PASSWORD_SUCCESS, 
    FORGOT_PASSWORD_FAILED,
} from '../constants/settings_constants';


const userInitialState = {
    isPending: false,
    deleteError: '',
    passwordError: '',
    success: false,
    data: null
}

// SEETINGS - change password
export const settings = (state = userInitialState, action = {}) => {
    switch(action.type){
        // SIGN IN
        case PASSWORD_CHANGE_PENDING:
            return Object.assign({}, state, {  
                isPending: true,
                passwordError: '' 
            });
        case PASSWORD_CHANGE_SUCCESS:
            return Object.assign({}, state, { 
                isPending: false,
                passwordError: '' 
            });
        case PASSWORD_CHANGE_FAILED:
            return Object.assign({}, state, { 
                passwordError: 'Unable to change password' , 
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

        // FORGOT PASSWORD
        case RESET_PASSWORD_PENDING:
            return Object.assign({}, state, {  
                isPending: true,
                passwordError: '' 
            });
        case RESET_PASSWORD_SUCCESS:
            return Object.assign({}, state, { 
                isPending: false,
                passwordError: '',
                success: true 
            });
        case RESET_PASSWORD_FAILED:
            return Object.assign({}, state, { 
                passwordError: 'Unable to perform forgot password' , 
                isPending: false,
                success: false
            });

        // RESET PASSWORD
        case RESET_PASSWORD_PENDING:
            return Object.assign({}, state, {  
                isPending: true,
                passwordError: '' 
            });
        case RESET_PASSWORD_SUCCESS:
            return Object.assign({}, state, { 
                isPending: false,
                passwordError: '',
                success: true 
            });
        case RESET_PASSWORD_FAILED:
            return Object.assign({}, state, { 
                passwordError: 'Unable to reset password' , 
                isPending: false,
                success: false
            });

        // DEFAULT
        default:
            return state;
    }
}