import React from 'react';

const AddButton = ({click}) => {
    return (
        <div className="f6 link br2 ph3 pv2 mb2 dib white bg-blue grow pointer" onClick={click}>Add</div>
    )
}

export default AddButton;