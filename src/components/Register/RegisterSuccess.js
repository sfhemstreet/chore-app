import React from 'react';

const RegisterSuccess = ({email, name, history}) => {
    setTimeout(() => history.push('/signin'), 20000);
    
    const msg = name ? `{name}, you are registered! Just one more step. <br/> A confirmation email has been sent to {email}. Please click on the confirmation link in the email to activate your Chore account.`
                        : `Seems you have already filled out an submitted a registration form. Not you? Refresh the page!`;
    
    return (
        <div className='tc pa2'> 
            <fieldset className="ba b--transparent ph0 mh0">
                <div className='pa2 center'>
                    {msg}
                </div>
            </fieldset>
        </div>
    )
}

export default RegisterSuccess;