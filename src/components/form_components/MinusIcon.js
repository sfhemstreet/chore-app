import React from 'react';

const MinusIcon = ({click}) => {
    return(
        <span role='img' aria-label="minus symbol" className='f6 link dim ph3 pv2 mb2 bg-red br3 dib grow' onClick={click} >➖</span>
    )
}  

export default MinusIcon;