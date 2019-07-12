import React from 'react';
import Chore from './Chore';

const MyChores = ({chores}) => {

    const renderChores = chores.map((i) => {
        return (
            <Chore 
                assignDate = {chores[i].assign_date}
                assignEmail = {chores[i].assign_email}
                assignName = {chores[i].assign_name} 
                choreName = {chores[i].chore_name} 
                completeDate = {chores[i].complete_date}
                description = {chores[i].description} 
                dueDate = {chores[i].due_date}
                groupName = {chores[i].group_name} 
            />
        )
    });

    return (
        <div>{renderChores}</div>
    ) 
}

export default MyChores;