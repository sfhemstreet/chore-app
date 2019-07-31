import {
    CREATE_GROUP_PENDING,
    CREATE_GROUP_SUCCESS,
    CREATE_GROUP_FAILED,
} from '../constants/group_constants';

export const submitCreatedGroup = (groupInfo) => (dispatch) => {

    dispatch({type: CREATE_GROUP_PENDING});
    fetch('http://localhost:3000/creategroup', { 
        method: 'PUT',
        mode: 'cors',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({
            groupName : groupInfo.groupName,
            people : groupInfo.people,
            chores : groupInfo.chores,
        })
    })
    .then(response => response.json())
    .then(res => {
        if(res === 'Group Created'){
            dispatch({ type: CREATE_GROUP_SUCCESS });
        }
        else {
            dispatch({ type: CREATE_GROUP_FAILED })
        }
    })
    .catch(error => {
        dispatch({ type: CREATE_GROUP_FAILED })
    });
}