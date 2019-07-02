import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {register, signOut} from '../../actions/userActions';

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
        /*
        const re = new RegExp(/^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/igm)
        if(event.target.value.match(re)){
            this.setState({registerName: event.target.value});
        }
        */
        this.setState({registerName: event.target.value});
    }
    // EMAIL
    onEmailChange = (event) => {
        /*
        const re = new RegExp(/[a-z\d]+([\.\_]?[a-z\d]+)+@[a-z\d]+(\.[a-z]+)+/igm)
        if(event.target.value.match(re)){
            this.setState({registerEmail: event.target.value});
        }
        */
       this.setState({registerEmail: event.target.value});
    }
    // PASSWORD 
    onPasswordChange = (event) => {
        /*
        pattern matches password validation for having 3 of 4 of the following items: 
        lowercase, uppercase, numbers, special characters
        */
        /*
        const re = new RegExp(/^((?=.*[\d])(?=.*[a-z])(?=.*[A-Z])|(?=.*[a-z])(?=.*[A-Z])(?=.*[^\w\d\s])|(?=.*[\d])(?=.*[A-Z])(?=.*[^\w\d\s])|(?=.*[\d])(?=.*[a-z])(?=.*[^\w\d\s])).{7,30}$/gm)
        if(event.target.value.match(re)){
            this.setState({registerPassword: event.target.value});
        }
        */
        this.setState({registerPassword: event.target.value});
        
    }
    // SUBMIT
    onRegisterSubmit = (event) => {
        const {registerEmail, registerName, registerPassword} = this.state;
        if(!registerEmail || !registerName || !registerPassword){
            return console.log('Bad Input');
        }
        else{
            console.log(registerEmail)
            this.props.dispatch(register(registerName,registerEmail,registerPassword,this.props.history))
        }
        
    }

    render(){
        return (
            <div>
                <div className="center mw5 mw6-ns br3 hidden ba b--black-10 mv4">
                    <h1 className="f4 bg-near-white br3 br--top black-60 mv0 pv2 ph3">Register</h1>
                    <div className="pa3 bt b--black-10">
                        <div className="f6 f5-ns lh-copy measure mv0">
                            <main className="pa4 black-80">
                                <div className="measure center">
                                    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                                    <div className="mt3">
                                        <label className="db fw6 lh-copy f6" >Name</label>
                                        <input onChange={this.onNameChange} className="pa2 input-reset ba bg-transparent hover-bg-near-white  w-100" type="email" />
                                    </div>
                                    <div className="mt3">
                                        <label className="db fw6 lh-copy f6" >Email</label>
                                        <input onChange={this.onEmailChange} className="pa2 input-reset ba bg-transparent hover-bg-near-white  w-100" type="email" />
                                    </div>
                                    <div className="mv3">
                                        <label className="db fw6 lh-copy f6" >Password</label>
                                        <input onChange={this.onPasswordChange} className="b pa2 input-reset ba bg-transparent hover-bg-near-white  w-100" type="password" />
                                    </div>
                                    </fieldset>
                                    <div className="">
                                        <input onClick={this.onRegisterSubmit} className="b ph3 pv2 input-reset ba b--black bg-transparent grow hover-bg-near-black hover-white pointer f6 dib" type="submit" value="Register"/>
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
        auth: state.userAccess.auth 
    }
}

export default withRouter(connect(mapStateToProps)(Register));