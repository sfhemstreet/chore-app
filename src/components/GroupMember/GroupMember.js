import React from 'react';
import GroupChore from '../GroupChore/GroupChore';
import './GroupMember.css';

const GroupMember = ({memberInfo}) => {

    const memberName = memberInfo.name;
    const memberChores = memberInfo.chores.sort((a,b) => {
        return a.due_date > b.due_date ? 1 : -1
    }) ;

    const renderMemberChores = memberChores.map((_,i) => {
        return (
            <GroupChore 
                key = {i}
                num = {i}
                assignName = {memberName}
                choreNum = {memberChores[i].chore_id}
                assignDate = {memberChores[i].assign_date}
                choreName = {memberChores[i].chore_name} 
                completeDate = {memberChores[i].complete_date}
                description = {memberChores[i].description} 
                dueDate = {memberChores[i].due_date}
                groupName = {memberChores[i].g_name} 
            />
        )
    });

    return (
        <div className="">
            <div className='user_container center mw6 mv0 mb0' >
                <div className='name f7 f4-m f3-l fw2 black b mt0 lh-copy tc center' >{memberName}</div>
                <div className='score f7 f4-m f3-l fw2 black-90 mt0 lh-copy tc center'>{memberChores[0].score}</div>
            </div>
            <ul className="list pl0 ml0 mv0 mt0 center mw6 ba b--light-silver br2 ">
                {renderMemberChores}
            </ul> 
        </div>
        
    ) 
}

export default GroupMember;