import React from 'react';
import './PopUp.css';

const PopUp = (props) => {
    return (
        <div className='popup center' > 
            <div className='popup_inner lh-copy measure  center bg-light-gray pa3 ' onClick={props.close} >{props.text}</div>
        </div>
    )
}

export default PopUp;