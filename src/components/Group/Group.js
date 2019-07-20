import React from 'react';
import GroupMember from '../GroupMember/GroupMember';
import ScrollBox from '../ScrollBox';

const Group = ({groupInfo}) => {
    
    const groupName = groupInfo.name.replace('_', ' ');
    const memberData = groupInfo.memberInfo;

    console.log(groupName, memberData)

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
        <div  className='list pl0 ml0 mv0 mt0 center mw6 ba b--light-silver br2'>
            <h3 className='tc black-90 ' >{groupName}</h3>
            <div>
                <ScrollBox maxHeight={'475'}>
                    {renderAllMembers}
                </ScrollBox>
            </div>
        </div>
        
    )
    

}

export default Group;