import React from 'react';
import GroupMember from '../GroupMember/GroupMember';
import XButton from '../form_components/XButton';


const Group = ({groupInfo, canAddChores, addChores, canEditGroup, editGroup, close}) => {

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
        <div  className='list center mw6 pa3 ma4 ba b--light-silver bg-light-gray br2 shadow-2'>
            <div className='pa1 f6 fr'><XButton className='tc center' click={close} index={-1}/></div>
            <div className='tc pa2'>
                <div className='tc f1 fw2 black-90 mv3' >{groupName}</div>
                <div className='flex justify-between bt b--black-10 pt2' >
                    {canAddChores ?
                        <div className='blue pointer grow hover-green' onClick={() => addChores(groupName, memberData)}>Add Chores</div>
                        : null
                    }
                    {canEditGroup ? 
                        <div className='blue pointer grow hover-green' onClick={() => editGroup(groupName, memberData)}>Edit Group</div>
                        : null
                    }
                </div>
            </div>
            <div>
                {renderAllMembers}
            </div>
        </div> 
    )    
}

export default Group;