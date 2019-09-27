import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {getChores, submitChore} from '../../actions/choreActions';
import MyChores from '../MyChores/MyChores';
import welcomeMessage from '../../utils/welcomeMessage';
import LoadingScreen from '../LoadingScreen/LoadingScreen';

class Dash extends React.Component {
    componentDidMount(){
        this.props.requestChoreUpdate();
    }

    sendCompletedChore = (choreID) => {
        this.props.submitCompletedChore(choreID)
    }

    render(){

        const message = welcomeMessage(this.props.username);
        
        return (
            <div className='vh-100 bg-blue dt w-100'>
                <div className='mw6 list center pa3 ma4 ba b--light-silver bg-near-white br2 shadow-2'>
                    <h2 className="tc center f3 f2-m f1-l fw2 black-90 mv3">
                    {message}
                    </h2>
                    { this.props.isPending ?
                        <LoadingScreen />
                    :
                        <div>
                                <MyChores 
                                    chores={this.props.chores}
                                    onChoreCompleted={this.sendCompletedChore}
                                />                           
                        </div>
                    }    
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        requestChoreUpdate: () => dispatch(getChores()),
        submitCompletedChore: (choreID) => dispatch(submitChore(choreID))
    }
}

const mapStateToProps = (state) => {
    const {user} = state;
    return {
      auth: user.auth,
      username: user.username,
      email: user.email,
      chores: user.chores,
      score: user.score,
      error: user.error,
      isPending: user.isPending
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Dash));
