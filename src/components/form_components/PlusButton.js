import React from 'react';
import plus from '../../images/plus.png';

const PlusButton = ({click}) => {
    return (
        <div className="br2 contain pa2 flex bg-white hover-bg-green pointer ba b--black" onClick={click}>
            <img className='mw1' src={plus} alt='Add group button'/>
        </div>
    )
}

export default PlusButton;