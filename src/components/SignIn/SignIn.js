import React from 'react';
import {connect} from 'react-redux';
import {NavLink} from 'react-router-dom';
import {signIn, signOut} from '../../actions/userActions';
import {withRouter} from 'react-router-dom';
import randomQuote from '../../utils/choreQuotes';
import regexCheck from '../../utils/regexCheck';

class SignIn extends React.Component {
    
    constructor(props){
        super(props);

        this.props.dispatch(signOut());
        
        this.state = {
            signInEmail: '',
            signInPassword: '',
            quote: randomQuote(),
            highlightRed: Array(2).fill(false)
        }
        
    }

    // EMAIL & PASSWORD INPUT ONCHANGE 
    onInputChange = (event) => {
        const {name, value} = event.target;
        this.setState({ [name]: value , highlightRed: Array(2).fill(false) });
    }

    // SUBMIT HANDLER
    onSubmitSignIn = (e) => {
        const { signInEmail, signInPassword, highlightRed } = this.state;
        const { dispatch } = this.props;
        if(signInEmail === '' || !regexCheck(signInEmail, 'email')){
            let hlr = [...highlightRed];
            hlr[0] = true;
            this.setState({ highlightRed: hlr });
        }
        if(signInPassword === '' || !regexCheck(signInPassword,'special')){
            let hlr = [...highlightRed];
            hlr[1] = true;
            this.setState({ highlightRed: hlr });
        }
        if(regexCheck(signInEmail, 'email') && regexCheck(signInPassword,'special') && signInPassword !== '' && signInEmail !== '') {
            dispatch(signIn(signInEmail, signInPassword, this.props.history));
        }
    }
    

    render(){
        const {highlightRed} = this.state;
        return (
            <div className='vh-100 bg-light-blue dt w-100'>
                <div className="">
                    <div className="">
                        <div className="center  mw6-ns br3 hidden  mv4 bg-near-white">
                            <h1 className="f4 br3 br--top black-80 mv0 pv2 ph3 bg-blue white">Sign In</h1>
                            <div className="pa3 bt b--black-10">
                                <div className="f6 f5-ns lh-copy measure mv0">
                                    <main className="pa4 black-80">
                                        <div className="measure center">
                                            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                                            <div className="mt3">
                                                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                                                <input onChange={this.onInputChange} className={highlightRed[0] ? "pa2 input-reset ba bg-red hover-bg-near-white w-100" : "pa2 input-reset ba hover-bg-near-white w-100"} name="signInEmail" type="email" />
                                            </div>
                                            <div className="mv3">
                                                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                                                <input onChange={this.onInputChange} className={highlightRed[1] ? "pa2 input-reset ba bg-red hover-bg-near-white w-100" : "pa2 input-reset ba hover-bg-near-white w-100"} name="signInPassword" type="password" />
                                            </div>
                                            </fieldset>
                                            <div className="">
                                                <input onClick={this.onSubmitSignIn} className="b ph3 pv2 input-reset ba b--black  grow hover-bg-near-black hover-white pointer f6 dib" type="submit" value="Sign in"/>
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
                    <div className="measure center tc f7 f4-m f3-l fw2 black ">
                        <div>{this.state.quote}</div>
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