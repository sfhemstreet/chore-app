import React from 'react';
import X from '../../images/X_mark.png'

const XButton = ({index,click}) => {
    return (
        <div className="br2 contain pa2 flex bg-white hover-bg-black pointer ba b--black" onClick={() => { index === -1 ? click() : click(index) }}>
            <img className='mw1' src={X} alt='X button'/>
        </div>
    )
}

export default XButton;