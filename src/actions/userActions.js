import {REQUEST_SIGNIN_PENDING,
        REQUEST_SIGNIN_SUCCESS,
        REQUEST_SIGNIN_FAILED,
        REQUEST_REGISTER_PENDING,
        REQUEST_REGISTER_SUCCESS,
        REQUEST_REGISTER_FAILED,
        SIGN_OUT_USER,
        RESET_PASSWORD_PENDING,
        RESET_PASSWORD_SUCCESS,
        RESET_PASSWORD_FAILED
} from '../constants/user_constants.js';

import { toast } from "react-toastify";


// SIGN IN
export const signIn = (signInEmail, signInPassword, history) => (dispatch) => {
    dispatch({ type: REQUEST_SIGNIN_PENDING })
    fetch('http://localhost:4000/signin', {
        method: 'post',
        mode: 'cors',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({
            email: signInEmail,
            password: signInPassword
        })
    })
    .then(response => response.json())
    .then(data => {
        //console.log(data)
        if(data.userData){
            dispatch({ type: REQUEST_SIGNIN_SUCCESS, payload: data });
            history.push('/dash');
        }
        else {
            dispatch({ type: REQUEST_SIGNIN_FAILED, payload: data})
            toast.error(data, {
                position: "bottom-center",
                autoClose: 4000,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true
                });
        }
    })
    .catch(error => {
        console.log(error);
        dispatch({ type: REQUEST_SIGNIN_FAILED, payload: error})
    });
    
}

// REGISTER
export const register = (registerName, registerEmail, registerPassword, history) => (dispatch) => {
    dispatch({ type: REQUEST_REGISTER_PENDING })
    fetch('http://localhost:4000/register', {
        method: 'post',
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify({
            email: registerEmail,
            password: registerPassword,
            username: registerName
        })
    })
    .then(response => response.json())
    .then(res => {
        console.log(res)
        if(res === 'Success!'){
            dispatch({ type: REQUEST_REGISTER_SUCCESS, payload: res });
            history.push('/signin');
            toast.success("Success! Please go to the email we just sent you to verify your account.", {
                position: "bottom-center",
                autoClose: 5000,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true
            });
        }
        else {
            dispatch({ type: REQUEST_REGISTER_FAILED, payload: res});
            toast.error(res, {
                position: "bottom-center",
                autoClose: 3000,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true
            });
        }
    })
    .catch(error => {
        dispatch({ type: REQUEST_REGISTER_FAILED, payload: error});
        toast.error(error, {
            position: "bottom-center",
            autoClose: 3000,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true
            });
    }); 
    
}

// SIGN OUT
export const signOut = () => (dispatch) => {
    dispatch({ type: SIGN_OUT_USER });
};

// FORGOT PASSWORD
export const forgotPassword = (email) => (dispatch) => {
    dispatch({ type: RESET_PASSWORD_PENDING })
    fetch('http://localhost:4000/forgotpassword', {
        method: 'post',
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify({
            email
        })
    })
    .then(response => response.json())
    .then(res => {
        console.log(res)
        if(res === 'Success!'){
            dispatch({ type: RESET_PASSWORD_SUCCESS });
            toast.success("Please go to the email we sent you to reset your password.", {
                position: "bottom-center",
                autoClose: 5000,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true
            });
        }
        else {
            dispatch({ type: RESET_PASSWORD_FAILED });
            toast.error("Email was not valid", {
                position: "bottom-center",
                autoClose: 3000,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true
            });
        }
    })
    .catch(error => {
        dispatch({ type: REQUEST_REGISTER_FAILED });
        toast.error("Check email and try again.", {
            position: "bottom-center",
            autoClose: 3000,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true
            });
    }); 
}


