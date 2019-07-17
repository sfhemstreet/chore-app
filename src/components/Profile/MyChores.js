import React from 'react';
import Chore from './Chore';
import './Chore.css';

const MyChores = ({chores, onChoreCompleted}) => {

    const organizedChores = chores.sort((a,b) => a.due_date > b.due_date ? 1 : -1) 

    const renderChores = organizedChores.map((_,i) => {
        return (
            <Chore 
                key = {i}
                num = {i}
                choreNum = {organizedChores[i].chore_id}
                assignDate = {organizedChores[i].assign_date}
                choreName = {organizedChores[i].chore_name} 
                completeDate = {organizedChores[i].complete_date}
                description = {organizedChores[i].description} 
                dueDate = {organizedChores[i].due_date}
                groupName = {organizedChores[i].group_name} 
                onSubmit={onChoreCompleted}
            />
        )
    });

    return (
        <div className="mt0">
            <h1 className="tc black-90">Your Chores</h1>
            <div className='grid_container center mw6 mv0 mb0' >
                <h3 className='chore f7 f4-m f3-l fw2 black-90 mt0 lh-copy tc center' >Chore</h3>
                <h3 className='due f7 f4-m f3-l fw2 black-90 mt0 lh-copy tc center' >Due Date</h3>
                <h3 className='status f7 f4-m f3-l fw2 black-90 mt0 lh-copy tc center' >Status</h3>
            </div>
            <ul className="list pl0 ml0 mv0 mt0 center mw6 ba b--light-silver br2 ">{renderChores}</ul> 
        </div>
        
    ) 
}

export default MyChores;

