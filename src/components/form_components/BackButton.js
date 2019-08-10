import React from 'react';

const BackButton = ({click}) => {
    return (
        <div className="f6 link br2 ph3 pv2 mb2 dib white bg-near-black grow pointer" onClick={click}>Back</div>
    )
}

export default BackButton;