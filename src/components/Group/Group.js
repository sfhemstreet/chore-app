import React from 'react';
import GroupMember from '../GroupMember/GroupMember';
import AddButton from '../form_components/AddButton';

const Group = ({groupInfo, auth, addChores}) => {

    const groupName = groupInfo.name.replace('_', ' ');
    const memberData = groupInfo.memberInfo;

    const createMembersArray = (members) => {
        let array = [];
        Object.entries(members).forEach((m) => {
            // m[0] is the memberName , m[1] is all thier chores
            const memberObj = {name : m[0], chores : m[1]}
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
        <div  className='list center mw6 pa3 ba b--light-silver bg-light-gray br2'>
            <div className='tc pa2'>
                <div className='black-90 f3' >{groupName}</div>
                {auth === true ?
                    <div className='gray pointer grow hover-blue' onClick={() => addChores(groupName, memberData)}>Add Chores</div>
                    :
                    null
                }
            </div>
            <div>
                {renderAllMembers}
            </div>
        </div> 
    )    
}

export default Group;