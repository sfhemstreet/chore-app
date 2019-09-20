import React from 'react';
import X from '../../images/X_mark.png'

const XButton = ({index,click}) => {
    return (
        <div className="br2 pa2 flex bg-white hover-bg-black pointer b--black-10" onClick={() => { index === -1 ? click() : click(index) }}>
            <img className='mw1' src={X} alt='X button'/>
        </div>
    )
}

export default XButton;