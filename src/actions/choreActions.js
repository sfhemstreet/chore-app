import {
    REQUEST_CHORES_PENDING, 
    REQUEST_CHORES_SUCCESS, 
    REQUEST_CHORES_FAILED, 
    SUBMIT_CHORE_PENDING,
    SUBMIT_CHORE_SUCCESS,
    SUBMIT_CHORE_FAILED
        } from '../constants/chore_constants';


export const getChores = () => (dispatch) => {
    dispatch({type: REQUEST_CHORES_PENDING});
    fetch('http://localhost:3000/getchores', { 
        method: 'get',
        mode: 'cors',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        }
    })
    .then(response => response.json())
    .then(data => {
        console.log(data)
        if(data.chores){
            dispatch({ type: REQUEST_CHORES_SUCCESS, payload: data });
        }
        else {
            dispatch({ type: REQUEST_CHORES_FAILED, payload: data })
        }
    })
    .catch(error => {
        //console.log(error);
        dispatch({ type: REQUEST_CHORES_FAILED, payload: error })
    });
}

export const submitChore = (choreID) => (dispatch) => {
   /*
    dispatch({type: SUBMIT_CHORE_PENDING});
    fetch('http://localhost:3000/submitchore', { 
        method: 'patch',
        mode: 'cors',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({
            chore: choreID
        })
    })
    .then(response => response.json())
    .then(data => {
        console.log(data)
        if(data.chores){
            dispatch({ type: SUBMIT_CHORE_SUCCESS, payload: data });
        }
        else {
            dispatch({ type: SUBMIT_CHORE_FAILED, payload: data })
        }
    })
    .catch(error => {
        //console.log(error);
        dispatch({ type: SUBMIT_CHORE_FAILED, payload: error })
    });
    */
   return null
}

