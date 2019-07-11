import {REQUEST_SIGNIN_PENDING,
        REQUEST_SIGNIN_SUCCESS,
        REQUEST_SIGNIN_FAILED,
        REQUEST_REGISTER_PENDING,
        REQUEST_REGISTER_SUCCESS,
        REQUEST_REGISTER_FAILED,
        SIGN_OUT_USER } from '../constants/user_constants.js';

import { toast } from "react-toastify";


// SIGN IN
export const signIn = (signInEmail, signInPassword, history) => (dispatch) => {
    dispatch({ type: REQUEST_SIGNIN_PENDING })
    fetch('http://localhost:3000/signin', {
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
            history.push('/profile');
        }
        else {
            dispatch({ type: REQUEST_SIGNIN_FAILED, payload: data})
            toast.error(data, {
                position: "bottom-center",
                autoClose: 5000,
                hideProgressBar: false,
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
    fetch('http://localhost:3000/register', {
        method: 'post',
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify({
            email: registerEmail,
            password: registerPassword,
            username: registerName
        })
    })
    .then(response => response.json())
    .then(data => {
        if(data.user_id){
            dispatch({ type: REQUEST_REGISTER_SUCCESS, payload: data });
            history.push('/signin');
            toast.success("Registered! You can now sign in.", {
                position: "bottom-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true
            });
        }
        else {
            dispatch({ type: REQUEST_REGISTER_FAILED, payload: data});
            toast.error(data, {
                position: "bottom-center",
                autoClose: 5000,
                hideProgressBar: false,
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
            autoClose: 5000,
            hideProgressBar: false,
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