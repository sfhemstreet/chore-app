import React from 'react';
import './StatusBar.css';

const StatusBar = ({status, timeLeft, isCompleted}) => {
    
    let text;
    let urgencyColor = 'lightgreen';
    let textColor = 'black';

    if(status >= 100){
        text = 'OVER DUE';
        urgencyColor = 'red';
        status = 100;
    }
    else if(timeLeft === 0) {
        text = 'Due Today!';
        urgencyColor = 'orange';
    }
    else{
        text = `Due in ${timeLeft} days`;
        if(timeLeft <= 2){
            urgencyColor = 'yellow';
        }
        if(timeLeft === 1){
            text = `Due tomorrow`
        }
    }

    if(isCompleted){
        status = 100;
        text = 'Done!';
        urgencyColor = 'blue';
        textColor = 'white';
    }
    
    return (
        <div >
           <div className='status_bar pointer grow b' style={{color: textColor ,background: `linear-gradient(to right,  ${urgencyColor} 0%,${urgencyColor} ${status}%,#dddddd ${status}%,#dddddd 100%)`}}>{text}</div> 
        </div>
    )
        
    


}

export default StatusBar;