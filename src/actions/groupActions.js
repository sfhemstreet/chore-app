import {
    REQUEST_GROUPS_PENDING, 
    REQUEST_GROUPS_SUCCESS, 
    REQUEST_GROUPS_FAILED } from '../constants/group_constants';


export const getGroups = () => (dispatch) => {
    dispatch({type: REQUEST_GROUPS_PENDING});
    fetch('http://localhost:3000/getallgroups', { 
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
        console.log(data.groups)
        if(data.groups){
            dispatch({ type: REQUEST_GROUPS_SUCCESS, payload: data });
        }
        else {
            dispatch({ type: REQUEST_GROUPS_FAILED })
        }
    })
    .catch(error => {
        console.log(error);
        dispatch({ type: REQUEST_GROUPS_FAILED })
    });
}

