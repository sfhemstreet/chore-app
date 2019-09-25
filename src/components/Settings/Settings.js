import React from 'react';
import ChangePassword from './ChangePassword';
import DeleteAccount from './DeleteAccount';

class Settings extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            deletingAccount: false,
            passwordChange: false,
        }
    }

    onDeleteAccount = () => {
        this.setState({ deletingAccount: true, passwordChange: false });
    }

    onPasswordChange = () => {
        this.setState({ deletingAccount: false, passwordChange: true });
    }

    onClose = () => {
        this.setState({ deletingAccount: false, passwordChange: false });
    }

    render(){
        const {deletingAccount, passwordChange} = this.state;

        return (
            <div className='vh-100 bg-lightest-blue dt w-100'>
                <div className='list center mw6 pa3 ma4 ba b--light-silver bg-light-gray br2 shadow-2'>
                    <div className='tc f1 fw2 black-90 mv3' >Settings</div>
                        <div className='bt b--black-10 pb2' />
                    {deletingAccount ? <DeleteAccount cancel={this.onClose} /> 
                    : passwordChange ? <ChangePassword cancel={this.onClose} /> 
                        :
                    <div className='tc pa2'>    
                        <fieldset className="ba b--transparent ph0 mh0">
                            <div className='tc hover-green pa2 pointer' onClick={this.onPasswordChange} >Change Password</div>
                            <div className='tc hover-red pa2 pointer' onClick={this.onDeleteAccount} >Delete Account</div>
                        </fieldset>
                    </div>}
                </div> 
            </div> 
        )
    }
}

export default Settings;