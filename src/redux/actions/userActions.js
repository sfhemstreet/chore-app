import {REQUEST_SIGNIN_PENDING, 
        REQUEST_SIGNIN_SUCCESS, 
        REQUEST_SIGNIN_FAILED } from '../constants/user_constants.js';

export const requestSignin = () => (dispatch) => {
    dispatch({ type: REQUEST_SIGNIN_PENDING });
    fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then(data => dispatch({ type: REQUEST_SIGNIN_SUCCESS, payload: data }))
        .catch(error => dispatch({ type: REQUEST_SIGNIN_FAILED, payload: error}));
}
