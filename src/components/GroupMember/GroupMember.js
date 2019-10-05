import React from 'react';
import GroupChore from '../GroupChore/GroupChore';
import './GroupMember.css';
import ScrollBox from '../form_components/ScrollBox/ScrollBox';

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
                type = {memberChores[i].type}
                choreNum = {memberChores[i].chore_id}
                assignDate = {memberChores[i].assign_date}
                choreName = {memberChores[i].chore_name} 
                completeDate = {memberChores[i].complete_date}
                description = {memberChores[i].description} 
                dueDate = {memberChores[i].due_date}
            />
        )
    });

    return (
        <div className="">
            <div className='user_container center mw6 mv0 mb0' >
                <h3 className='name black lh-copy tc center' >{memberName}</h3>
                <h3 className='score black-90 lh-copy tc center'>{memberChores[0].score}</h3>
            </div>
            <ul className="list pl0 ml0 mv0 mt0 center mw6 ba b--light-silver br2 ">
                <ScrollBox maxHeight={'385'}>
                    {renderMemberChores}
                </ScrollBox>
                
            </ul> 
        </div>
        
    ) 
}

export default GroupMember;