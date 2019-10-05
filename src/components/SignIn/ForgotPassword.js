import React from 'react';
import LoadingScreen from '../LoadingScreen/LoadingScreen';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import ForgotPasswordSuccess from './ForgotPasswordSuccess';
import regexCheck from '../../utils/regexCheck';
import {forgotPassword} from '../../actions/settingsActions';

class ForgotPassword extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            email: '',
            red: false
        }
    }

    emailChange = (event) => {
        const {value} = event.target;
        this.setState({ email: value , red: false });
    }

    onSubmit = () => {
        const { email } = this.state;

        if(email === '' || !regexCheck(email, 'email'))
            this.setState({ red: true });
        
        if(email !== '' && regexCheck(email, 'email')){
            this.props.requestForgotPassword(email);
        }
    }

    render(){
        const {email, red} = this.state;
        const {isPending, back, error, success} = this.props;
        return (
            <div className="center  mw6-ns br3 hidden  mv4 bg-near-white shadow-2">
                <h1 className="f4 br3 br--top black-80 mv0 pv2 ph3 bg-blue white">Forgot Password</h1>
                {isPending ? <LoadingScreen /> : success ? <ForgotPasswordSuccess email={email} back={back}/> :
                <div className="pa3 bt b--black-10">
                    <div className="f6 f5-ns lh-copy measure center mv0">
                        <main className="pa4 black-80">
                        {error ? <div className='red' >{error}</div>  : null}
                        <h4>Enter your account email below and we will send you a link so you can recover your account.</h4>
                            <div className="measure center">
                                <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                                <div className="">
                                    <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                                    <input onChange={this.emailChange} className={red ? "pa2 input-reset ba bg-red bg-animate hover-bg-washed-green w-100" : "pa2 input-reset ba bg-animate hover-bg-washed-green w-100"} type="email" />
                                </div>
                                </fieldset>
                                <div className="flex justify-around">
                                    <input onClick={back} className="b ph3 pv2 input-reset ba b--black  grow hover-bg-blue hover-white pointer f6 dib" type="submit" value="Back"/>
                                    <input onClick={this.onSubmit} className="b ph3 pv2 input-reset ba b--black  grow hover-bg-near-black hover-white pointer f6 dib" type="submit" value="Submit"/>
                                </div>
                            </div>
                        </main>
                    </div>
                </div>}
            </div>
        )    
    }
    
}

const mapStateToProps = (state) => {
    const {settings} = state;
    return{
        error: settings.passwordError,
        isPending: settings.isPending,
        success: settings.forgotPasswordSuccess
    }
    
}

const mapDispatchToProps = (dispatch) => {
    return {
        requestForgotPassword: (email) => dispatch(forgotPassword(email)),
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ForgotPassword));