import React from 'react';

const NextButton = ({click}) => {
    return (
        <div className="f6 link br2 ph3 pv2 mb2 dib white bg-green grow pointer" onClick={click}>Next</div>
    )
}

export default NextButton;