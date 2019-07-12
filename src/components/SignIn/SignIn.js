import React from 'react';
import {connect} from 'react-redux';
import {NavLink} from 'react-router-dom';
import {signIn, signOut} from '../../actions/userActions';
import {withRouter} from 'react-router-dom';

class SignIn extends React.Component {
    
    constructor(props){
        super(props);

        this.props.dispatch(signOut());
        
        this.state = {
            signInEmail: '',
            signInPassword: '',
        }
        
    }

    // EMAIL & PASSWORD INPUT ONCHANGE 
    onInputChange = (event) => {
        const {name, value} = event.target;
        this.setState({ [name]: value});
    }

    // SUBMIT HANDLER
    onSubmitSignIn = (e) => {
        const { signInEmail, signInPassword } = this.state;
        const { dispatch } = this.props;
        if (signInEmail &&  signInPassword) {
            dispatch(signIn(signInEmail, signInPassword, this.props.history));
        }
    }
    

    render(){
        
        return (
            <div>
                <div className="center mw5 mw6-ns br3 hidden ba b--black-10 mv4">
                    <h1 className="f4 bg-near-white br3 br--top black-60 mv0 pv2 ph3">Sign In</h1>
                    <div className="pa3 bt b--black-10">
                        <div className="f6 f5-ns lh-copy measure mv0">
                            <main className="pa4 black-80">
                                <div className="measure center">
                                    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                                    <div className="mt3">
                                        <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                                        <input onChange={this.onInputChange} className="pa2 input-reset ba bg-transparent hover-bg-near-white w-100" name="signInEmail" type="email" />
                                    </div>
                                    <div className="mv3">
                                        <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                                        <input onChange={this.onInputChange} className="b pa2 input-reset ba bg-transparent hover-bg-near-white w-100" name="signInPassword" type="password" />
                                    </div>
                                    </fieldset>
                                    <div className="">
                                        <input onClick={this.onSubmitSignIn} className="b ph3 pv2 input-reset ba b--black bg-transparent grow hover-bg-near-black hover-white pointer f6 dib" type="submit" value="Sign in"/>
                                    </div>
                                    <div className="lh-copy mt3">
                                        <NavLink to='/register' >
                                        <p className="f6 link dim black db pointer">Register</p>
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
    return{
        auth: state.user.auth
    }
    
}

export default withRouter(connect(mapStateToProps)(SignIn));