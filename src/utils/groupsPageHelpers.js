export const createGroupsArray = (groups) => {
    let array = [];
    Object.entries(groups).forEach((g) => {
        // g[0] is the groupName , g[1] is all the info
        let groupObj = {name : g[0], memberInfo : g[1]}
        array.push(groupObj);
    });
    return array;
};