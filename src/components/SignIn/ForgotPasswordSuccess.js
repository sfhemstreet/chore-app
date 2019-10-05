import React from 'react';

const ForgotPasswordSuccess = ({email, back}) => {
    setTimeout(() => back(), 7000);
    return (
        <div className='tc pa2'> 
            <fieldset className="ba b--transparent ph0 mh0">
                <div className='pa2 center'>
                    We sent an email to {email}, please click the link in the email to reset your password.
                </div>
            </fieldset>
        </div>
    )
}

export default ForgotPasswordSuccess;