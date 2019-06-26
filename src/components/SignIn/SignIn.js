import React from 'react';

class SignIn extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            signInEmail: '',
            signInPassword: ''
        }
    }

    // EMAIL
    onEmailChange = (event) => {
        /*
        const reEmail = new RegExp(/[a-z\d]+([\.\_]?[a-z\d]+)+@[a-z\d]+(\.[a-z]+)+/igm);
        if(event.target.value.match(reEmail)){
            this.setState({signInEmail: event.target.value});
        }
        */
        this.setState({signInEmail: event.target.value});
    }
    // PASSWORD 
    onPasswordChange = (event) => {
        this.setState({signInPassword: event.target.value});
    }

    onSubmitSignIn = (event) => {
        if(!this.state.signInEmail || !this.state.signInPassword){
            return console.log('Bad Input');
        }
        else{
            console.log('Good Input')
        }
    }

    render(){
        const {onRouteChange} = this.props;
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
                                        <input onChange={this.onEmailChange} className="pa2 input-reset ba bg-transparent hover-bg-near-white w-100" type="email" />
                                    </div>
                                    <div className="mv3">
                                        <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                                        <input onChange={this.onPasswordChange} className="b pa2 input-reset ba bg-transparent hover-bg-near-white w-100" type="password" />
                                    </div>
                                    </fieldset>
                                    <div className="">
                                        <input onClick={this.onSubmitSignIn} className="b ph3 pv2 input-reset ba b--black bg-transparent grow hover-bg-near-black hover-white pointer f6 dib" type="submit" value="Sign in"/>
                                    </div>
                                    <div className="lh-copy mt3">
                                        <p 
                                            onClick={() => onRouteChange('register')}
                                            href="#0" className="f6 link dim black db pointer">Register</p>
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

export default SignIn;