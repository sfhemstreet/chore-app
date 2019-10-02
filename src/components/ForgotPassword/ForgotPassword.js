import React from 'react';
import TextInput from '../form_components/TextInput';
import LoadingScreen from '../LoadingScreen/LoadingScreen';
import regexCheck from '../../utils/regexCheck';
import {connect} from 'react-redux';
import {resetPassword, checkForgotPasswordAuth} from '../../actions/settingsActions';
import {withRouter} from 'react-router-dom';


class ForgotPassword extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            password: '',
            verifyPW: '',
            verifyRed: false,
            pwRed: false
        }
    }

    componentDidMount(){
        const {str} = this.props.match.params;
        console.log(str)
        this.props.requestCheckAuth(str);
    }

    onChangePW = (input) => {
        this.setState({ password: input, pwRed: false });
    }

    onChangeVerifyPW = (input) => {
        this.setState({ verifyPW: input, verifyRed: false });
    }

    onSubmit = () => {
        const {password, verifyPW} = this.state;
        const {str} = this.props.match.params;
        if(password === '' || !regexCheck(password,'special')){
            this.setState({ pwRed: true });
        }
        if(verifyPW === '' || !regexCheck(verifyPW,'special')){
            this.setState({ verifyRed: true });
        }
        if(password !== verifyPW){
            this.setState({ pwRed: true, verifyRed: true });
        }
        if(password !== '' && password === verifyPW && regexCheck(password, 'special')){
            this.props.requestResetPassword(password, this.props.id, str)
        }
    }

    render(){
        const {pwRed, verifyRed} = this.state;
        const {isPending, error, success} = this.props;

        return(
            <div className='vh-100 bg-purple dt w-100'>
                <div className='list center mw6 pa3 ma4 ba b--light-silver bg-light-gray br2 shadow-2'>
                    <div className='tc f1 fw2 black-90 mv3' >Reset Password</div>
                    <div className='bt b--black-10 pb2' />
                    {isPending ? <LoadingScreen /> :
                    success ? 
                    <div className='tc pa2'> 
                        <fieldset className="ba b--transparent ph0 mh0">
                            <div className='pa2 center'>
                                Password Reset! You can now log in with your new password.
                            </div>
                        </fieldset>
                    </div>
                    :
                    <div className='tc pa2'>    
                        <fieldset className="ba b--transparent ph0 mh0">
                            <div className='pa2 center'>
                                <div className='pa2'>
                                    <div className='pa3'>
                                    New Password:
                                    </div>
                                    <TextInput type={'password'} red={pwRed} change={this.onChangePW} />    
                                </div>
                                <div className='pa2'>
                                    <div className='pa3'>
                                    Re-Type New Password:
                                    </div>
                                    <TextInput type={'password'} red={verifyRed} change={this.onChangeVerifyPW} />    
                                </div>
                            </div>
                        </fieldset>
                        <div className="f6 link br2 ph3 pv2 mb2 dib white bg-blue grow pointer" onClick={this.onSubmit}>Change Password</div>
                    </div>}
                </div> 
            </div> 
        )
    }
}

const mapStateToProps = (state) => {
    const {settings} = state;
    return {
        isPending: settings.isPending,
        error: settings.passwordChangeError,
        success: settings.success,
        id: settings.data
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        requestCheckAuth: (str) => dispatch(checkForgotPasswordAuth(str)),
        requestResetPassword: (password, id, str) => dispatch(resetPassword(password,id,str))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ForgotPassword));