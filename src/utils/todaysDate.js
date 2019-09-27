export function todaysDate(){
    
    const now = new Date();
    let month = now.getMonth() + 1;
    let day = now.getDate();
    if(month < 10){
        month = '0' + month;
    }
    if(day < 10){
        day = '0' + day;
    }
    const todaysDate = now.getFullYear() + '-' + month + '-' + day;

    return todaysDate;
}

export function nextWeek(){
    const now = new Date();
    const nextWeek = new Date(now.getFullYear(),now.getMonth(), now.getDate() + 7);
    let month = nextWeek.getMonth() + 1;
    let day = nextWeek.getDate();
    if(month < 10){
        month = '0' + month;
    }
    if(day < 10){
        day = '0' + day;
    }
    const nextWeeksDate = nextWeek.getFullYear() + '-' + month + '-' + day;

    return nextWeeksDate;
}