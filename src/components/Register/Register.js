import React from 'react';
import {connect} from 'react-redux';
import {NavLink,withRouter} from 'react-router-dom';
import {register, signOut} from '../../actions/userActions';
import regexCheck from '../../utils/regexCheck';
import LoadingScreen from '../LoadingScreen/LoadingScreen';
import RegisterSuccess from './RegisterSuccess';

class Register extends React.Component {
    constructor(props){
        super(props)
        this.props.requestSignOut();
        this.state = {
            registerName: '',
            registerEmail: '',
            registerPassword: '',
            verifyPassword: '',
            highlightRed: new Array(4).fill(false)
        }
    }

    // NAME
    onNameChange = (event) => {
        let hlr = [...this.state.highlightRed];
        hlr[0] = false;
        this.setState({ registerName: event.target.value, highlightRed : hlr });
    }
    // EMAIL
    onEmailChange = (event) => {
        let hlr = [...this.state.highlightRed];
        hlr[1] = false;
        this.setState({ registerEmail: event.target.value, highlightRed: hlr });
    }
    // PASSWORD 
    onPasswordChange = (event) => {
        let hlr = [...this.state.highlightRed];
        hlr[2] = false;
        this.setState({ registerPassword: event.target.value, highlightRed: hlr });
    }
    // Verify PASSWORD 
    onVerifyPasswordChange = (event) => {
        let hlr = [...this.state.highlightRed];
        hlr[3] = false;
        this.setState({ verifyPassword: event.target.value, highlightRed: hlr });
    }

    // SUBMIT
    onRegisterSubmit = () => {
        const {registerEmail, registerName, registerPassword, verifyPassword} = this.state;
        let hlr = [...this.state.highlightRed];
        if(registerName === '' || !regexCheck(registerName, 'special'))
            hlr[0] = true;
        
        if(registerEmail === '' || !regexCheck(registerEmail, 'email'))
            hlr[1] = true;
        
        if(registerPassword === '' || !regexCheck(registerPassword,'special'))
            hlr[2] = true;

        if(verifyPassword === '' || !regexCheck(verifyPassword,'special'))
            hlr[3] = true;

        if(verifyPassword !== registerPassword){
            hlr[2] = true;
            hlr[3] = true;
        }
          
        if(registerName !== '' && registerEmail !== '' && registerPassword !== '' && registerPassword === verifyPassword &&
           regexCheck(registerName, 'special') && regexCheck(registerEmail, 'email') && regexCheck(registerPassword,'special'))
        {
            this.props.requestRegister(registerName,registerEmail,registerPassword);
        }
        
        this.setState({ highlightRed : hlr })
    }

    render(){
        const {highlightRed, registerName, registerEmail} = this.state;
        const {isPending, error, success} = this.props;

        return (
            <div className='vh-100 bg-lightest-blue dt w-100'>
                <div className="center mw6-ns br3 hidden mv4 bg-near-white shadow-2">
                    <h1 className="f4 bg-blue br3 br--top white mv0 pv2 ph3">Register</h1>
                    <div className="pa3 bt b--black-10">
                        <div className="f6 f5-ns lh-copy measure mv0">
                            <main className="pa4 black-80">
                                {isPending ? <LoadingScreen /> :
                                success ? <RegisterSuccess email={registerEmail} name={registerName} exit={this.props.requestSignOut}/> :
                                <div className="measure center">
                                    {error ? <div className='red' >{error}</div>  : null}
                                    <fieldset className="ba b--transparent ph0 mh0">
                                    <div className="mt3">
                                        <label className="db fw6 lh-copy f6" >Name</label>
                                        <input onChange={this.onNameChange} className={highlightRed[0] ? "pa2 input-reset ba  bg-animate hover-bg-washed-green bg-red w-100" : "pa2 input-reset ba bg-animate hover-bg-washed-green w-100"} type="text" />
                                    </div>
                                    <div className="mt3">
                                        <label className="db fw6 lh-copy f6" >Email</label>
                                        <input onChange={this.onEmailChange} className={highlightRed[1] ? "pa2 input-reset ba  bg-animate hover-bg-washed-green bg-red w-100" : "pa2 input-reset ba bg-animate hover-bg-washed-green w-100"} type="email" />
                                    </div>
                                    <div className="mv3">
                                        <label className="db fw6 lh-copy f6" >Password</label>
                                        <input onChange={this.onPasswordChange} className={highlightRed[2] ? "pa2 input-reset ba  bg-animate hover-bg-washed-green bg-red w-100" : "pa2 input-reset ba bg-animate hover-bg-washed-green w-100"} type="password" />
                                    </div>
                                    <div className="mv3">
                                        <label className="db fw6 lh-copy f6" >Confirm Password</label>
                                        <input onChange={this.onVerifyPasswordChange} className={highlightRed[3] ? "pa2 input-reset ba  bg-animate hover-bg-washed-green bg-red w-100" : "pa2 input-reset ba bg-animate hover-bg-washed-green w-100"} type="password" />
                                    </div>
                                    </fieldset>
                                    <div className="">
                                        <input onClick={this.onRegisterSubmit} className="b ph3 pv2 input-reset ba b--black  grow hover-bg-near-black hover-white pointer f6 dib" type="submit" value="Register"/>
                                    </div>
                                    <div className="lh-copy mt3">
                                        <NavLink to='/signin' >
                                        <p className="f6 link dim black db pointer">Already Registered? Sign In</p>
                                        </NavLink>
                                    </div>
                                </div>}
                            </main>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

const mapStateToProps = (state) => {
    const {user} = state;
    return {
        error: user.registerError,
        isPending: user.isPending,
        success: user.registerSuccess 
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        requestRegister: (registerName,registerEmail,registerPassword) => dispatch(register(registerName,registerEmail,registerPassword)),
        requestSignOut: () => dispatch(signOut())
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Register));