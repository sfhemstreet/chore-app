import {
    REQUEST_CHORES_PENDING, 
    REQUEST_CHORES_SUCCESS, 
    REQUEST_CHORES_FAILED } from '../constants/chore_constants';


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

