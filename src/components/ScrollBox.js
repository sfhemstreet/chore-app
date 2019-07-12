import React from 'react';

const ScrollBox = (props) => {
    return (
        <div style={{overflowY: 'scroll'}}>
            {props.children}
        </div>
        
    )
}

export default ScrollBox;