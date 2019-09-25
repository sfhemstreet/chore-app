import React from 'react';
import TextInput from '../form_components/TextInput';
import BackButton from '../form_components/BackButton';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {changePassword} from '../../actions/userActions';

class ChangePassword extends React.Component {
     constructor(props){
         super(props);
        this.state = {
            oldPassword: '',
            newPassword: '',
            oldRed: false,
            newRed: false
        }
    }

    onInputOld = (input) => {
        this.setState({ oldPassword: input, oldRed: false });
    }

    onInputNew = (input) => {
        this.setState({ newPassword: input, newRed: false });
    }

    onSubmit = () => {
        const {oldPassword, newPassword} = this.state;
        if(newPassword !== '' && oldPassword !== ''){
            //this.props.requestChangePassword(oldPassword, newPassword)
        }
        if(newPassword === ''){
            this.setState({ newRed: true });
        }
        if(oldPassword === ''){
            this.setState({ oldRed: true });
        }
    }


    render(){
        return (
            <div className='pa2 center'>
                <div className='tc center f3 fw2 black-90 mv3'>Change Password</div>
                <div className='pa2'>
                    <div className='pa3'>
                        Old Password:
                    </div>
                    <TextInput type={'password'} red={this.state.oldRed} change={this.onInputOld} />    
                </div>
                <div className='pa2'>
                    <div className='pa3'>
                        New Password:
                    </div>
                    <TextInput type={'password'} red={this.state.newRed} change={this.onInputNew} />    
                </div>
                <fieldset className="ba b--transparent ph0 mh0 flex ">
                    <BackButton click={this.props.cancel} />
                    <div className="f6 link br2 ph3 pv2 mb2 dib white bg-blue grow pointer" onClick={this.onSubmit}>Change Password</div>
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
        requestChangePassword: (oldPassword, newPassword) => dispatch(changePassword(oldPassword,newPassword))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ChangePassword));