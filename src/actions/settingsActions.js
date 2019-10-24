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

import { SIGN_OUT_USER } from '../constants/user_constants';

// CHANGE PASSWORD
export const changePassword = (oldPW, newPW) => (dispatch) => {
    dispatch({ type: PASSWORD_CHANGE_PENDING })
    fetch(`${process.env.REACT_APP_BACKEND_URL}changepassword`, {
        method: 'PATCH',
        mode: 'cors',
        credentials: 'include',
        headers: {
            'Authorization': `Bearer ${sessionStorage.getItem('_auth_')}`,
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
        //console.log(error);
        dispatch({ type: PASSWORD_CHANGE_FAILED })
    });
}

// DELETE ACCOUNT
export const deleteAccount = (password) => (dispatch) => {
    dispatch({ type: DELETE_ACCOUNT_PENDING })
    fetch(`${process.env.REACT_APP_BACKEND_URL}deleteaccount`, {
        method: 'delete',
        mode: 'cors',
        credentials: 'include',
        headers: {
            'Authorization': `Bearer ${sessionStorage.getItem('_auth_')}`,
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
        //console.log(error);
        dispatch({ type: DELETE_ACCOUNT_FAILED })
    });
}

// FORGOT PASSWORD
export const forgotPassword = (email) => (dispatch) => {
    dispatch({ type: FORGOT_PASSWORD_PENDING })
    fetch(`${process.env.REACT_APP_BACKEND_URL}forgotpassword`, {
        method: 'post',
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify({
            email
        })
    })
    .then(response => response.json())
    .then(res => {
        if(res === 'Success!'){
            dispatch({ type: FORGOT_PASSWORD_SUCCESS });
        }
        else {
            dispatch({ type: FORGOT_PASSWORD_FAILED, payload: res });
        }
    })
    .catch(error => {
        dispatch({ type: FORGOT_PASSWORD_FAILED });
    }); 
}

// RESET PASSWORD
export const resetPassword = (password,id,auth,str) => (dispatch) => {
    dispatch({ type: RESET_PASSWORD_PENDING })
    fetch(`${process.env.REACT_APP_BACKEND_URL}resetforgotpassword`, {
        method: 'post',
        mode: 'cors',
        credentials: 'include',
        headers: {
            'Authorization': `Bearer ${auth}`,
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

