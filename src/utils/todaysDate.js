export function todaysDate(){
    
    const now = new Date();
    let month = now.getMonth() + 1;
    if(month < 10){
        month = '0' + month;
    }
    const todaysDate = now.getFullYear() + '-' + month + '-' + now.getDate();

    return todaysDate;
}

export function nextWeek(){
    const now = new Date();
    const nextWeek = new Date(now.getFullYear(),now.getMonth(), now.getDate() + 7);
    let month = nextWeek.getMonth() + 1;
    if(month < 10){
        month = '0' + month;
    }
    const nextWeeksDate = nextWeek.getFullYear() + '-' + month + '-' + nextWeek.getDate();

    return nextWeeksDate;
}