import React from 'react';
import TextInput from '../form_components/TextInput';
import BackButton from '../form_components/BackButton';
import LoadingScreen from  '../LoadingScreen/LoadingScreen';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {changePassword} from '../../actions/settingsActions';


class ChangePassword extends React.Component {
     constructor(props){
         super(props);
        this.state = {
            oldPassword: '',
            newPassword: '',
            verifyPassword: '',
            oldRed: false,
            newRed: false,
            verifyRed: false
        }
    }

    onInputOld = (input) => {
        this.setState({ oldPassword: input, oldRed: false });
    }

    onInputNew = (input) => {
        this.setState({ newPassword: input, newRed: false });
    }

    onInputVerify = (input) => {
        this.setState({ verifyPassword: input, verifyRed: false });
    }

    onSubmit = () => {
        const {oldPassword, newPassword, verifyPassword} = this.state;
        if(newPassword !== '' && oldPassword !== '' && verifyPassword !== '' && verifyPassword === newPassword && newPassword !== oldPassword){
            this.setState({ init : true })
            this.props.requestChangePassword(oldPassword, newPassword)
        }
        if(newPassword === ''){
            this.setState({ newRed: true });
        }
        if(verifyPassword === ''){
            this.setState({ verifyRed: true });
        }
        if(oldPassword === ''){
            this.setState({ oldRed: true });
        }
        if(oldPassword === newPassword){
            this.setState({ oldRed: true, newRed: true });
        }
        if(newPassword !== verifyPassword){
            this.setState({ newRed: true, verifyRed: true });
        }
    }


    render(){
        return (
            <div>
                {this.props.isPending ? <LoadingScreen /> 
                : 
                this.state.init && !this.props.isPending && this.props.error === '' ? 
                <div className='pa2 center'> 
                    <div className='tc center f3 black-90 mv3'>Password Changed!</div>
                    <div className='tc center'><BackButton click={this.props.cancel} /></div>
                </div>
                :
                <div className='pa2 center'>
                    {this.props.error !== '' ? <div className='tc center f3 black-90 mv3' >Unable to change password, double check current password and try again</div> : null }
                    <div className='tc center f3 fw2 black-90 mv3'>Change Password</div>
                    <div className='pa2'>
                        <div className='pa3'>
                        Current Password:
                        </div>
                        <TextInput type={'password'} red={this.state.oldRed} change={this.onInputOld} />    
                    </div>
                    <div className='pa2'>
                        <div className='pa3'>
                        New Password:
                        </div>
                        <TextInput type={'password'} red={this.state.newRed} change={this.onInputNew} />    
                    </div>
                    <div className='pa2'>
                        <div className='pa3'>
                        Re-Type New Password:
                        </div>
                        <TextInput type={'password'} red={this.state.verifyRed} change={this.onInputVerify} />    
                    </div>
                    <fieldset className="ba b--transparent flex mt2 pa2">
                        <BackButton click={this.props.cancel} />
                        <div className="f6 link br2 ph3 pv2 mb2 dib white bg-blue grow pointer" onClick={this.onSubmit}>Change Password</div>
                    </fieldset>
                </div>}    
            </div>
            
        )
    }
     
}

const mapStateToProps = (state) => {
    const {settings} = state;
    return {
        isPending: settings.isPending,
        error: settings.passwordChangeError
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        requestChangePassword: (oldPassword, newPassword) => dispatch(changePassword(oldPassword,newPassword))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ChangePassword));