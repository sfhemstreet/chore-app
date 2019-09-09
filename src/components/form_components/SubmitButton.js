import React from 'react';

const SubmitButton = ({click}) => {
    return (
        <div className="f6 link br2 ph3 pv2 mb2 dib black bg-white hover-bg-green grow pointer" onClick={click}>Submit</div>
    )
}

export default SubmitButton;