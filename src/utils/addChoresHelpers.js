export const getGroupId = (groupData) => {
    const keys = Object.keys(groupData);
    const id = groupData[keys[0]][0].group_id;
    return id;
}

export const getEmails_Permissions = (groupData) => {
    let emails_and_permissions = {};
    Object.keys(groupData).forEach(person => {
        emails_and_permissions[groupData[person][0].assign_email] = groupData[person][0].canAddChores;
    });
    return emails_and_permissions;
}

export const getEmails = (groupData) => {
    let emails = [];
    Object.keys(groupData).forEach(person => {
        emails.push(groupData[person][0].assign_email);
    });
    return emails;
}

export const checkEditAuth = (createdGroups, groupData) => {
    const id = getGroupId(groupData);
    if(createdGroups.includes(id)){
        return true;
    }
    return false;
}
