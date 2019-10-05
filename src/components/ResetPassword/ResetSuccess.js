import React from 'react';

const ResetSuccess = ({history}) => {
    setTimeout(() => history.push('/signin'), 3000);
    return (
        <div className='tc pa2'> 
            <fieldset className="ba b--transparent ph0 mh0">
                <div className='pa2 center'>
                    Password Reset! You can now log in with your new password.
                </div>
            </fieldset>
        </div>
    )
}

export default ResetSuccess;