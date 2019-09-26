import React from 'react';
import TextInput from '../form_components/TextInput';
import BackButton from '../form_components/BackButton';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {deleteAccount} from '../../actions/settingsActions';
import AccountDeleted from './AccountDeleted';
import LoadingScreen from '../LoadingScreen/LoadingScreen';

class DeleteAccount extends React.Component {
     constructor(props){
         super(props);
        this.state = {
            confirmPassword: '',
            red: false,
            init: false
        }
    }

    onInputPassword = (input) => {
        this.setState({ confirmPassword: input, red: false });
    }

    onSubmit = () => {
        const {confirmPassword} = this.state;
        if(confirmPassword !== ''){
            this.setState({ init: true });
            this.props.requestDeleteAccount(confirmPassword);
        }
        else{
            this.setState({ red: true });
        }
    }

    render(){
        return (
            <div>
                {this.props.isPending ? <LoadingScreen /> 
                :
                this.state.init && !this.props.isPending && this.props.error === '' ? <AccountDeleted /> :
                <div className='pa2 center'>
                    <div className='tc center f3 fw2 black-90 mv3'>Delete Account</div>
                    {this.props.error ? <div className='tc center f3 black-90 mv3' >Unable to delete your account,<br/> double check password and try again</div> : null }
                    <div className='pa3'>
                        To delete your account, please confirm your password:
                    </div>
                    <TextInput type={'password'} red={this.state.red} change={this.onInputPassword} />
                    <fieldset className="ba b--transparent ph0 mh0 flex">
                        <BackButton click={this.props.cancel} />
                        <div className="f6 link br2 ph3 pv2 mb2 dib white bg-blue hover-bg-red grow pointer" onClick={this.onSubmit}>Delete My Account</div>
                    </fieldset>
                </div>}  
            </div>
            
        )
    }
     
}

const mapStateToProps = (state) => {
    const {settings} = state;
    return {
        isPending: settings.isPending,
        error: settings.deleteError
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        requestDeleteAccount: (password) => dispatch(deleteAccount(password)),
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DeleteAccount));