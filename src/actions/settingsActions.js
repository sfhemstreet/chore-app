import {
    PASSWORD_CHANGE_PENDING,
    PASSWORD_CHANGE_SUCCESS,
    PASSWORD_CHANGE_FAILED,
    DELETE_ACCOUNT_PENDING,
    DELETE_ACCOUNT_SUCCESS,
    DELETE_ACCOUNT_FAILED
} from '../constants/settings_constants';

import { SIGN_OUT_USER } from '../constants/user_constants';

// CHANGE PASSWORD
export const changePassword = (oldPW, newPW) => (dispatch) => {
    dispatch({ type: PASSWORD_CHANGE_PENDING })
    fetch('http://localhost:4000/changepassword', {
        method: 'PATCH',
        mode: 'cors',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({
            oldPassword: oldPW,
            newPassword: newPW
        })
    })
    .then(response => response.json())
    .then(res => {
        if(res === 'Password Changed'){
            dispatch({ type: PASSWORD_CHANGE_SUCCESS });
        }
        else if(res ==='MUST LOGIN'){
            dispatch({type: SIGN_OUT_USER})
        }
        else {
            dispatch({ type: PASSWORD_CHANGE_FAILED })
        }
    })
    .catch(error => {
        console.log(error);
        dispatch({ type: PASSWORD_CHANGE_FAILED })
    });
}

// DELETE ACCOUNT
export const deleteAccount = (password) => (dispatch) => {
    dispatch({ type: DELETE_ACCOUNT_PENDING })
    fetch('http://localhost:4000/deleteaccount', {
        method: 'delete',
        mode: 'cors',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({
            password: password
        })
    })
    .then(response => response.json())
    .then(res => {
        if(res === 'Account Deleted'){
            dispatch({ type: DELETE_ACCOUNT_SUCCESS });
        }
        else if(res ==='MUST LOGIN'){
            dispatch({type: SIGN_OUT_USER})
        }
        else {
            dispatch({ type: DELETE_ACCOUNT_FAILED })
        }
    })
    .catch(error => {
        console.log(error);
        dispatch({ type: DELETE_ACCOUNT_FAILED })
    });
}
