import React from 'react';

const RegisterSuccess = ({email, name, history}) => {
    setTimeout(() => history.push('/signin'), 20000);
    return (
        <div className='tc pa2'> 
            <fieldset className="ba b--transparent ph0 mh0">
                <div className='pa2 center'>
                    {name}, you are registered! Just one more step. <br/> A confirmation email has been sent to {email}. Please click on the confirmation link in the email to activate your Chore account.
                </div>
            </fieldset>
        </div>
    )
}

export default RegisterSuccess;