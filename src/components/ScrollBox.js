import React from 'react';

const ScrollBox = (props) => {
    return (
        <div style={{overflowY: 'scroll', maxHeight: `${props.maxHeight}px`}}>
            {props.children}
        </div>
        
    )
}

export default ScrollBox;