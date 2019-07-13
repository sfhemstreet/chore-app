const welcomeMessage = (name) => {

    const hour = (new Date()).getHours();
    let welcomeMessage = `Hello ${name}!`;

    if(hour < 12){
        welcomeMessage = `Good Morning ${name}!`;
    }
    else if(hour >= 12 && hour <= 17){
        welcomeMessage = `Good Afternoon ${name}!`;
    }
    else if(hour >= 18 && hour < 24){
        welcomeMessage = `Good Evening ${name}!`;
    }
    if(hour === 0){
        welcomeMessage = `Doing Chores At Midnight ${name}??`;
    }

    return welcomeMessage;
}

export default welcomeMessage;