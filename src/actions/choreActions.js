import {
    REQUEST_CHORES_PENDING, 
    REQUEST_CHORES_SUCCESS, 
    REQUEST_CHORES_FAILED, 
    SUBMIT_CHORE_PENDING,
    SUBMIT_CHORE_SUCCESS,
    SUBMIT_CHORE_FAILED,
    ADD_CHORES_PENDING,
    ADD_CHORES_SUCCESS,
    ADD_CHORES_FAILED
        } from '../constants/chore_constants';
import { SIGN_OUT_USER } from '../constants/user_constants';


export const getChores = () => (dispatch) => {
    dispatch({type: REQUEST_CHORES_PENDING});
    fetch(`${process.env.REACT_APP_BACKEND_URL}getchores`, { 
        method: 'get',
        mode: 'cors',
        credentials: 'include',
        headers: {
            'Authorization': `Bearer ${sessionStorage.getItem('_auth_')}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        }
    })
    .then(response => response.json())
    .then(data => {
        if(data.chores){
            dispatch({ type: REQUEST_CHORES_SUCCESS, payload: data });
        }
        else if(data === "MUST LOGIN"){
            dispatch({ type: SIGN_OUT_USER });
        }
        else {
            dispatch({ type: REQUEST_CHORES_FAILED, payload: data })
        }
    })
    .catch(error => {
        dispatch({ type: REQUEST_CHORES_FAILED, payload: error })
    });
}

export const submitChore = (choreID) => (dispatch) => {
    dispatch({type: SUBMIT_CHORE_PENDING});
    fetch(`${process.env.REACT_APP_BACKEND_URL}submitchore`, { 
        method: 'PATCH',
        mode: 'cors',
        credentials: 'include',
        headers: {
            'Authorization': `Bearer ${sessionStorage.getItem('_auth_')}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({
            choreID: choreID
        })
    })
    .then(response => response.json())
    .then(res => {
        if(res === 'Chore Submitted'){
            dispatch({ type: SUBMIT_CHORE_SUCCESS });
        }
        else if(res === "MUST LOGIN"){
            dispatch({ type: SIGN_OUT_USER });
        }
        else {
            dispatch({ type: SUBMIT_CHORE_FAILED })
        }
    })
    .catch(error => {
        dispatch({ type: SUBMIT_CHORE_FAILED })
    });
    
}

export const addChores = (groupID, newChores, emails) => (dispatch) =>{
    dispatch({type: ADD_CHORES_PENDING});
    fetch(`${process.env.REACT_APP_BACKEND_URL}addchores`, { 
        method: 'POST',
        mode: 'cors',
        credentials: 'include',
        headers: {
            'Authorization': `Bearer ${sessionStorage.getItem('_auth_')}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({
            groupID,
            chores: newChores,
            emails
        })
    })
    .then(response => response.json())
    .then(res => {
        if(res === 'Chores Added'){
            dispatch({ type: ADD_CHORES_SUCCESS });
        }
        else if(res === "MUST LOGIN"){
            dispatch({ type: SIGN_OUT_USER });
        }
        else {
            dispatch({ type: ADD_CHORES_FAILED })
        }
    })
    .catch(error => {
        dispatch({ type: ADD_CHORES_FAILED })
    });
}



