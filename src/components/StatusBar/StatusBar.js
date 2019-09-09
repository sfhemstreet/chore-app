import React from 'react';
import './StatusBar.css';

const StatusBar = ({status, timeLeft, isCompleted}) => {
    
    let text;
    let urgencyColor = 'lightgreen';
    let textColor = 'black';
    
    // over due
    if(timeLeft < 0){
        text = 'OVER DUE';
        urgencyColor = 'red';
        status = 100;
    }
    else if(timeLeft === 0){
        text = 'Due Today!';
        urgencyColor = 'yellow';
        status = 100;
    }
    // due in 1 or more days
    else{
        text = `Due in ${timeLeft} days`;
        // 2 or less days is yellow
        if(timeLeft <= 2){
            urgencyColor = 'yellow';
        }
        // due tomorrow
        if(timeLeft === 1){
            text = `Due tomorrow`
        }
    }
    // if its completed 
    if(isCompleted){
        status = 100;
        text = 'Done!';
        urgencyColor = 'blue';
        textColor = 'white';
    }
    
    return (
        <div>
           <div className='status_bar pointer b' style={{color: textColor, background: `linear-gradient(to right, ${urgencyColor} 0%,${urgencyColor} ${status}%,#dddddd ${status}%,#dddddd 100%)`}}>{text}</div> 
        </div>
    )
}

export default StatusBar;