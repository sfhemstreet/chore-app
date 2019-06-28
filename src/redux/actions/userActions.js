import {REQUEST_SIGNIN_PENDING, 
        REQUEST_SIGNIN_SUCCESS, 
        REQUEST_SIGNIN_FAILED } from '../constants/user_constants.js';

export const requestSignin = () => (dispatch) => {
    dispatch({ type: REQUEST_SIGNIN_PENDING });
    fetch('localhost:3000')
        .then(response => response.json())
        .then(data => dispatch({ type: REQUEST_SIGNIN_SUCCESS, payload: data }))
        .catch(error => dispatch({ type: REQUEST_SIGNIN_FAILED, payload: error}));
}


// NEW NEW
export const requestSignIn = () => (dispatch) => {
    dispatch({ type: REQUEST_SIGNIN_PENDING })
    fetch('localhost:3000/signin', {
        method: 'post',
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify({
            email: this.state.signInEmail,
            password: this.state.signInPassword
        })
    })
    .then(response => response.json())
    .then(user => {
        if(user.id){
            this.props.loadUser(user);
            this.props.onRouteChange('home');
        }
        
    })
    
}
