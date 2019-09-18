import React from 'react';
import {connect} from 'react-redux';
import {NavLink,withRouter} from 'react-router-dom';
import {register, signOut} from '../../actions/userActions';
import regexCheck from '../../utils/regexCheck';

class Register extends React.Component {
    constructor(props){
        super(props)
        this.props.dispatch(signOut());
        this.state = {
            registerName: '',
            registerEmail: '',
            registerPassword: '',
        }
    }

    // NAME
    onNameChange = (event) => {
        this.setState({registerName: event.target.value});
    }
    // EMAIL
    onEmailChange = (event) => {
       this.setState({registerEmail: event.target.value});
    }
    // PASSWORD 
    onPasswordChange = (event) => {
        this.setState({registerPassword: event.target.value});
    }
    // SUBMIT
    onRegisterSubmit = (event) => {
        const {registerEmail, registerName, registerPassword} = this.state;
        if(!regexCheck(registerEmail, 'email') || !regexCheck(registerName, 'special') || !regexCheck(registerPassword,'special')){
            return console.log('Bad Input');
        }
        else{
            //console.log(registerEmail)
            this.props.dispatch(register(registerName,registerEmail,registerPassword,this.props.history))
        }
        
    }

    render(){
        return (
            <div className='vh-100 bg-lightest-blue dt w-100'>
                <div className="center mw6-ns br3 hidden mv4 bg-near-white">
                    <h1 className="f4 bg-blue br3 br--top white mv0 pv2 ph3">Register</h1>
                    <div className="pa3 bt b--black-10">
                        <div className="f6 f5-ns lh-copy measure mv0">
                            <main className="pa4 black-80">
                                <div className="measure center">
                                    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                                    <div className="mt3">
                                        <label className="db fw6 lh-copy f6" >Name</label>
                                        <input onChange={this.onNameChange} className="pa2 input-reset ba  hover-bg-near-white  w-100" type="email" />
                                    </div>
                                    <div className="mt3">
                                        <label className="db fw6 lh-copy f6" >Email</label>
                                        <input onChange={this.onEmailChange} className="pa2 input-reset ba  hover-bg-near-white  w-100" type="email" />
                                    </div>
                                    <div className="mv3">
                                        <label className="db fw6 lh-copy f6" >Password</label>
                                        <input onChange={this.onPasswordChange} className="b pa2 input-reset ba  hover-bg-near-white  w-100" type="password" />
                                    </div>
                                    </fieldset>
                                    <div className="">
                                        <input onClick={this.onRegisterSubmit} className="b ph3 pv2 input-reset ba b--black  grow hover-bg-near-black hover-white pointer f6 dib" type="submit" value="Register"/>
                                    </div>
                                    <div className="lh-copy mt3">
                                        <NavLink to='/signin' >
                                        <p className="f6 link dim black db pointer">Already Registered? Sign In</p>
                                        </NavLink>
                                        {/*<p href="#0" class="f6 link dim black db">Forgot your password?</p>*/}
                                    </div>
                                </div>
                            </main>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

const mapStateToProps = (state) => {
    return {
        auth: state.user.auth 
    }
}

export default withRouter(connect(mapStateToProps)(Register));