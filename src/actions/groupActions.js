import {
    CREATE_GROUP_PENDING,
    CREATE_GROUP_SUCCESS,
    CREATE_GROUP_FAILED,
    DELETE_GROUP_PENDING,
    DELETE_GROUP_SUCCESS,
    DELETE_GROUP_FAILED,
    EDIT_GROUP_PENDING,
    EDIT_GROUP_SUCCESS,
    EDIT_GROUP_FAILED
} from '../constants/group_constants';

import {SIGN_OUT_USER} from '../constants/user_constants.js';



export const submitCreatedGroup = (groupInfo, history) => (dispatch) => {

    dispatch({type: CREATE_GROUP_PENDING});
    fetch(`${process.env.REACT_APP_BACKEND_URL}creategroup`, { 
        method: 'POST',
        mode: 'cors',
        credentials: 'include',
        headers: {
            'Authorization': `Bearer ${sessionStorage.getItem('_auth_')}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({
            groupName : groupInfo.groupName,
            users : groupInfo.users,
            chores : groupInfo.chores,
        })
    })
    .then(response => response.json())
    .then(res => {
        if(res === 'Group Created'){
            dispatch({ type: CREATE_GROUP_SUCCESS });
            history.push('/dash');
            localStorage.clear();
        }
        else if(res === "MUST LOGIN"){
            dispatch({ type: SIGN_OUT_USER });
        }
        else {
            dispatch({ type: CREATE_GROUP_FAILED , payload: res});
        }
    })
    .catch(error => {
        dispatch({ type: CREATE_GROUP_FAILED , payload: error});
    });
}

export const editGroup = (groupID, groupName, removed, added, updated) => (dispatch) => {
    dispatch({type: EDIT_GROUP_PENDING});
    fetch(`${process.env.REACT_APP_BACKEND_URL}editgroup`, { 
        method: 'PATCH',
        mode: 'cors',
        credentials: 'include',
        headers: {
            'Authorization': `Bearer ${sessionStorage.getItem('_auth_')}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({
            groupID: groupID,
            groupName: groupName,
            newMembers : added,
            removedMembers: removed,
            updatedMembers: updated
        })
    })
    .then(response => response.json())
    .then(res => {
        if(res === 'Group Edited'){
            dispatch({ type: EDIT_GROUP_SUCCESS });
        }
        else if(res === "MUST LOGIN"){
            dispatch({ type: SIGN_OUT_USER });
        }
        else {
            dispatch({ type: EDIT_GROUP_FAILED })
        }
    })
    .catch(error => {
        dispatch({ type: EDIT_GROUP_FAILED })
    });
}

export const deleteGroup = (groupID) => (dispatch) => {
    dispatch({type: DELETE_GROUP_PENDING});
    fetch(`${process.env.REACT_APP_BACKEND_URL}deletegroup`, { 
        method: 'DELETE',
        mode: 'cors',
        credentials: 'include',
        headers: {
            'Authorization': `Bearer ${sessionStorage.getItem('_auth_')}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({
            groupID
        })
    })
    .then(response => response.json())
    .then(res => {
        if(res === 'Group Deleted'){
            dispatch({ type: DELETE_GROUP_SUCCESS });
        }
        else if(res === "MUST LOGIN"){
            dispatch({ type: SIGN_OUT_USER });
        }
        else {
            dispatch({ type: DELETE_GROUP_FAILED })
        }
    })
    .catch(error => {
        dispatch({ type: DELETE_GROUP_FAILED })
    });
}