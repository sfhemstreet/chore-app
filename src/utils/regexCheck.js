const regexCheck = (input, type) => {
    let regex = new RegExp(/^[a-zA-Z0-9_.-]*$/);
    switch(type){
        case 'plain':
            regex = new RegExp(/^[a-z A-Z0-9_.-]*$/) ;
            break;
        case 'email':
            regex = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
            break;
        case 'password':
            regex = new RegExp(/^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})/);
            break;
        case 'special':
            regex = new RegExp(/^[$!@&#*%?^a-z A-Z0-9_.-]*$/);
            break;
        default:
            regex = new RegExp(/^[a-zA-Z0-9_.-]*$/);
    }
    if(regex.test(input)){
        return true;
    }
    else{
        return false;
    }
}

export default regexCheck;
