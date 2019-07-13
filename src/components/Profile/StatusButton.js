import React from 'react';


const StatusButton = ({isDone,clickWhenDone}) => {
    
    if(isDone){
        return (
            <div className="f6 br3 ph3 pv2 mb2 dib white bg-green center"  >Completed!</div> 
        ) 
    }
    else {
        return (
            <div className="f6 link br3 ph3 pv2 mb2 dib white bg-black center pointer grow dim" onClick={clickWhenDone} >InComplete</div> 
        ) 
    }
    
}

export default StatusButton;