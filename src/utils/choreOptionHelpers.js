import { nextWeek } from './todaysDate';

export function makeChoreObjs(chores){
    var choreObj = {
        dueDate : nextWeek(),
        assignment : 'Randomly',
        description : '',
        exempt : 'None'
    }

    let c = {};
    
    for(let x = 0; x < chores.length; x++){
        c[chores[x]] = JSON.parse(JSON.stringify(choreObj));
    }

    return c;
}

export function makeHLRObjs(chores){
    var redObj = {
        dueDate : false,
        assignment : false,
        description : false,
        exempt : false
    }

    let hlr = {};

    for(let x = 0; x < chores.length; x++){
        hlr[chores[x]] = JSON.parse(JSON.stringify(redObj));
    }
    
    return hlr;
}

export function checkChoresForOptions(choresWithOptions, chores){
    var choreObj = {
        dueDate : nextWeek(),
        assignment : 'Randomly',
        description : '',
        exempt : 'No one'
    }
    
    //check for out of date chores and delete them
    let chorelist = Object.keys(choresWithOptions);
    for(let x = 0; x < chorelist.length; x++){
        if(!chores.includes(chorelist[x])){
            delete choresWithOptions[chorelist[x]];
        }
    }
    //check to see if chore is new, if new make it a choreObj
    for(let x = 0; x < chores.length; x++){
        if(!choresWithOptions[chores[x]]){
            choresWithOptions[chores[x]] = JSON.parse(JSON.stringify(choreObj));
        }
    }
    return choresWithOptions
}