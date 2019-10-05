export const assignChores = (people, chores) => {
    // holds all chores after assigned
    let assignedChores = {};
    // holds count of chores per person
    let p = {};
    people.forEach(person => {
        p[person] = 0;
    });
    // array of everyone we will go thru to assign chore
    let everyone = [...people];
    // randomly shuffle around everyone 
    shuffle(everyone);
    // keeps index for everyone 
    let i = 0;
    const mod = everyone.length;

    for(let c in chores){
        assignedChores[c] = {};
        // check if assigned to someone
        if(chores[c].assignment !== 'Randomly'){
            assignedChores[c].type = 'A';
            assignedChores[c].assigned = chores[c].assignment;
            p[chores[c].assignment] += 1;
        }
        // check for exemption
        else if(chores[c].exempt !== 'None'){
            if(everyone[i % mod] === chores[c].exempt)
                i++;
            
            assignedChores[c].type = 'E';
            assignedChores[c].assigned = everyone[i % mod];
            p[everyone[i % mod]] += 1;
            i++;
        }
        // its just random
        else{
            assignedChores[c].type = 'R';
            assignedChores[c].assigned = everyone[i % mod];
            p[everyone[i % mod]] += 1;
            i++;
        }
        assignedChores[c].dueDate = chores[c].dueDate;
        assignedChores[c].description = chores[c].description === '' ? null : chores[c].description;
    }

    //console.log(assignedChores)
    
    return assignedChores;
}

function shuffle(array) {
    for(let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}


