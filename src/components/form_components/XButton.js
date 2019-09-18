import React from 'react';

const XButton = ({index,click}) => {
    return (
        <div className="br2 pa2 pl3 flex bg-white hover-bg-black pointer b--black-10" onClick={() => click(index)}>
            <div className='tc'>{'\u274C'}</div>
        </div>
    )
}

export default XButton;