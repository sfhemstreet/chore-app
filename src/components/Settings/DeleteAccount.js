import React from 'react';
import TextInput from '../form_components/TextInput';
import BackButton from '../form_components/BackButton';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {deleteAccount} from '../../actions/userActions';

class DeleteAccount extends React.Component {
     constructor(props){
         super(props);
        this.state = {
            confirmPassword: '',
            red: false,
        }
    }

    onInputPassword = (input) => {
        this.setState({ confirmPassword: input, red: false });
    }

    onSubmit = () => {
        const {confirmPassword} = this.state;
        if(confirmPassword !== ''){
            this.props.submit(confirmPassword)
        }
        else{
            this.setState({ red: true });
        }
    }

    render(){
        return (
            <div className='pa2 center'>
                <div className='tc center f3 fw2 black-90 mv3'>Delete Account</div>
                <div className='pa3'>
                    To delete your account, please confirm your password:
                </div>
                <TextInput type={'password'} red={this.state.red} change={this.onInputPassword} />
                <fieldset className="ba b--transparent ph0 mh0 flex">
                    <BackButton click={this.props.cancel} />
                    <div className="f6 link br2 ph3 pv2 mb2 dib white bg-blue hover-bg-red grow pointer" onClick={this.onSubmit}>Delete My Account</div>
                </fieldset>
            </div>
        )
    }
     
}

const mapStateToProps = (state) => {
    const {user} = state;
    return {
      auth: user.auth,
      username: user.username,
      email: user.email,
      groups: user.groups,
      createdGroups: user.createdGroups,
      groupAuth: user.groupAuth,
      score: user.score,
      error: user.error,
      isPending: user.isPending
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        requestDeleteAccount: (password) => dispatch(deleteAccount(password)),
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DeleteAccount));