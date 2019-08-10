import {
    CREATE_GROUP_PENDING,
    CREATE_GROUP_SUCCESS,
    CREATE_GROUP_FAILED,
} from '../constants/group_constants';

import { toast } from "react-toastify";

export const submitCreatedGroup = (groupInfo, history) => (dispatch) => {

    dispatch({type: CREATE_GROUP_PENDING});
    fetch('http://localhost:3000/creategroup', { 
        method: 'POST',
        mode: 'cors',
        credentials: 'include',
        headers: {
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
            toast.success('Created New Group!', {
                position: "bottom-center",
                autoClose: 2000,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true
            });
            history.push('/dash');
            localStorage.clear();
        }
        else {
            dispatch({ type: CREATE_GROUP_FAILED , payload: res});
            toast.error('failed', {
                position: "bottom-center",
                autoClose: 2000,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true
            });
        }
    })
    .catch(error => {
        dispatch({ type: CREATE_GROUP_FAILED , payload: error});
        toast.error('failed', {
            position: "bottom-center",
            autoClose: 2000,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true
        });
    });
}