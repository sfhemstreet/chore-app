export function todaysDate(){
    
    const now = new Date()
    let month = now.getMonth() + 1;
    if(month < 10){
    month = '0' + month;
    }
    const todaysDate = now.getFullYear() + '-' + month + '-' + now.getDate();

    return todaysDate;
}