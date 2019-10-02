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
    RESET_AUTH_PENDING,
    RESET_AUTH_SUCCESS,
    RESET_AUTH_FAILED
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

// RESET PASSWORD
export const resetPassword = (password,id,str) => (dispatch) => {
    dispatch({ type: RESET_PASSWORD_PENDING })
    fetch('http://localhost:4000/resetforgotpassword', {
        method: 'post',
        mode: 'cors',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({
            password,
            id,
            str
        })
    })
    .then(response => response.json())
    .then(res => {
        if(res === 'Success'){
            dispatch({ type: RESET_PASSWORD_SUCCESS });
        }
        else if(res ==='MUST LOGIN'){
            dispatch({type: SIGN_OUT_USER})
        }
        else {
            dispatch({ type: RESET_PASSWORD_FAILED })
        }
    })
    .catch(error => {
        console.log(error);
        dispatch({ type: RESET_PASSWORD_FAILED })
    });
}

// CHECK FORGOT PASSWORD AUTH
export const checkForgotPasswordAuth = (str) => (dispatch) => {
    dispatch({ type: RESET_AUTH_PENDING })
    fetch('http://localhost:4000/checkauthforgotpassword', {
        method: 'post',
        mode: 'cors',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({
            str
        })
    })
    .then(response => response.json())
    .then(res => {
        if(res.success){
            dispatch({ type: RESET_AUTH_SUCCESS, payload: res.id});
        }
        else if(res ==='MUST LOGIN'){
            dispatch({type: SIGN_OUT_USER})
        }
        else {
            dispatch({ type: RESET_AUTH_FAILED })
        }
    })
    .catch(error => {
        console.log(error);
        dispatch({ type: RESET_PASSWORD_FAILED })
    });
}