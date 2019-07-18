import React from 'react';

const ScrollBox = (props) => {
    return (
        <div style={{overflowY: 'scroll', maxHeight: '475px'}}>
            {props.children}
        </div>
        
    )
}

export default ScrollBox;