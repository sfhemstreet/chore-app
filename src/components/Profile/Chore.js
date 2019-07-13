import React from 'react';
import StatusButton from './StatusButton';
import './Chore.css';

const Chore = (props) => {
   
    const assignDate = (new Date(props.assignDate)).toDateString(),
        choreName = props.choreName,
        completeDate = props.completeDate,
        description =props.description,
        dueDate = (new Date(props.dueDate)).toDateString(),
        groupName = props.groupName,
        status = props.completeDate === null ? false : true;

    
    
    return (
        <li className="no-wrap overflow-x-auto pa3 pointer grow" /*onClick={displayInfo}*/>
            <div className='grid-container ' >
                <div className='chore center pa2' >{choreName}</div>
                <div className='due center pa2' >{dueDate}</div>
                <StatusButton className='center pa2' isDone={status} clickWhenDone={props.clickDone}/>
            </div>
        </li>
    )      
}

export default Chore;