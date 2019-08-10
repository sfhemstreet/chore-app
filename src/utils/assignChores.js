export const assignChores = (people, chores) => {
    let p = {};
    people.forEach(person => {
        p[person] = 0;
    });
    const assignedChores = {};
    for(let c in chores){
        assignedChores[c] = {};
        
        // check if assigned to someone
        if(chores[c].assignment !== 'Randomly'){
            assignedChores[c].assigned = chores[c].assignment;
            //assignedChores[c].picked = chores[c].assignment;
            p[chores[c].assignment] += 1;
        }
        // check for exemption
        else if(chores[c].exempt !== 'None'){
            const index = randomlyAssignChore(people.length, people.indexOf(chores[c].exempt));
            assignedChores[c].assigned = people[index];
            //assignedChores[c].exempt = chores[c].exempt;
            p[people[index]] += 1;
        }
        // its just random
        else{
            const index = randomlyAssignChore(people.length, 666);
            assignedChores[c].assigned = people[index];
            p[people[index]] += 1;
        }
        assignedChores[c].dueDate = chores[c].dueDate;
        assignedChores[c].description = chores[c].description === '' ? null : chores[c].description;
    }

    //const finalChores = checkDistro(assignedChores, p);
    
    return assignedChores;
}

function randomlyAssignChore(numPeople, exemption){
    var randomNum;
    if(exemption !== 666){
        do{
            randomNum = Math.floor(Math.random() * (numPeople));
        }while(randomNum === exemption);
        return randomNum;
    }
    else{
        randomNum = Math.floor(Math.random() * (numPeople));
        return randomNum;
    }
}

/*
function checkDistro(chores, people){
    var max = 0;
    var maxIndex = 0;
    var min = Object.keys(chores).length;
    var minIndex = 0;
    var idealNumChore = Object.keys(chores).length / people.length;
    var i = 0;
    var noChores = true;
    while(i < Object.keys(people).length || noChores){
        if(noChores && i >= Object.keys(people).length){
            i=0;
        }
       
        for(let p in people){
            if(people[p] > people[p].chores){
                if(max <= people[i].chores){
                    max = people[i].chores;
                    maxIndex = i;
                    //console.log("1new max = " + people[i].chores + " " + people[i].name);
                }
                if(people[x].chores < min){
                    min = people[x].chores;
                    minIndex = x;
                    if(min == 0){
                    noChores = true;
                    }
                    else{
                    noChores = false;
                    }
                    //console.log("1new min = " + people[x].chores + " " + people[x].name);
                }
            }else{
            if(people[x].chores > max){
                max = people[x].chores;
                maxIndex = x;
                //console.log("2new max = " + people[x].chores + " " + people[x].name);
            }
            if(people[i].chores < min){
                min = people[i].chores;
                minIndex = i;
                if(min == 0){
                noChores = true;
                }
                else{
                noChores = false;
                }
                //console.log("2new min = " + people[i].chores + " " + people[i].name);
            }
            }
            if(min < max){
                for(let y = 0; y < choreArray.length; y++){
                    if(choreArray[y].exempt !== people[minIndex].name && choreArray[y].manuallyAssigned === false && people[maxIndex].name === choreArray[y].assigned){
                        //console.log(choreArray[y].exempt + " " + people[minIndex].name);
                        choreArray[y].assigned = people[minIndex].name;
                        people[minIndex].chores += 1;
                        people[maxIndex].chores -= 1;
                        min += 1;
                        max -= 1;
                        if(min == 0){
                            noChores = true;
                        }
                        else{
                            noChores = false;
                        }
                        //console.log("Switching " + maxIndex + "with " + minIndex);
                        break;
                    }
                }
            }
        }
        if(noChores){
            for(let a = 0; a< choreArray.length; a++){
                if(people[minIndex].name == choreArray[a].exempt){
                    noChores = false;
                }
                if(people[maxIndex].name == choreArray[a].assigned && choreArray[a].manuallyAssigned == true){
                    noChores = false;
                }
            }
        }
        i++;
    }
}
*/
