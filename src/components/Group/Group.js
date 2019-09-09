import React from 'react';
import GroupMember from '../GroupMember/GroupMember';

const Group = ({groupInfo}) => {
    
    const groupName = groupInfo.name.replace('_', ' ');
    const memberData = groupInfo.memberInfo;

    const createMembersArray = (members) => {
        let array = [];
        Object.entries(members).forEach((m) => {
            // m[0] is the memberName , m[1] is all thier chores
            let memberObj = {name : m[0], chores : m[1]}
            array.push(memberObj);
        });
        return array;
    };

    const membersArray = createMembersArray(memberData);
    
    const renderAllMembers = membersArray.map((_,i) => {
        return (
            <GroupMember key={i} memberInfo={membersArray[i]} />
        )
    });

    return (
        <div  className='list center mw6 pa3 ba b--light-silver bg-light-blue br2'>
            <h2 className='tc black-90' >{groupName}</h2>
            <div>
                {renderAllMembers}
            </div>
        </div> 
    )
}

export default Group;