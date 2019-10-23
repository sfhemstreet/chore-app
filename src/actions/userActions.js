import {REQUEST_SIGNIN_PENDING,
        REQUEST_SIGNIN_SUCCESS,
        REQUEST_SIGNIN_FAILED,
        REQUEST_REGISTER_PENDING,
        REQUEST_REGISTER_SUCCESS,
        REQUEST_REGISTER_FAILED,
        SIGN_OUT_USER,
} from '../constants/user_constants.js';

// SIGN IN
export const signIn = (signInEmail, signInPassword, history) => (dispatch) => {
    dispatch({ type: REQUEST_SIGNIN_PENDING })
    fetch(`${process.env.REACT_APP_BACKEND_URL}signin`, {
        method: 'post',
        mode: 'cors',
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
        }
    })
    .catch(error => {
        console.log(error);
        dispatch({ type: REQUEST_SIGNIN_FAILED, payload: error})
    });
    
}

// REGISTER
export const register = (registerName, registerEmail, registerPassword) => (dispatch) => {
    console.log(registerEmail)
    dispatch({ type: REQUEST_REGISTER_PENDING })
    fetch(`${process.env.REACT_APP_BACKEND_URL}register`, {
        method: 'post',
        mode: 'cors',
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
        }
        else {
            dispatch({ type: REQUEST_REGISTER_FAILED, payload: res});
        }
    })
    .catch(error => {
        dispatch({ type: REQUEST_REGISTER_FAILED });
    }); 
    
}

// SIGN OUT
export const signOut = () => (dispatch) => {
    dispatch({ type: SIGN_OUT_USER });
};




