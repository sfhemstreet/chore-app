import React from 'react';
import './ScrollBox.css';

const ScrollBox = (props) => {
    return (
        <div style={{overflowY: 'scroll', maxHeight: `${props.maxHeight}px`}}>
            {props.children}
        </div>
        
    )
}

export default ScrollBox;