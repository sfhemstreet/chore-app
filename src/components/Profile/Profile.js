import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {getChores, submitChore} from '../../actions/choreActions';
import ScrollBox from '../ScrollBox.js';
import MyChores from './MyChores';
import MyCreatedGroups from './MyCreatedGroups';
import welcomeMessage from '../../utils/welcomeMessage';

class Profile extends React.Component {
    componentDidMount(){
        this.props.requestChoreUpdate();
    }

    sendCompletedChore = (choreID) => {
        this.props.submitCompletedChore(choreID)
    }

    render(){

        const message = welcomeMessage(this.props.username);
        console.log(this.props.chores)
        return (
            <div>
                <h2 className="tc center f3 f2-m f1-l fw2 black-90 mv3">
                {message}
                </h2>
                { this.props.isPending ?
                    <div>LOADING</div>
                :
                    <div>
                        <ScrollBox className="pa3 pa5-ns">
                            <MyChores 
                                chores={this.props.chores}
                                onChoreCompleted={this.sendCompletedChore}
                            />
                        </ScrollBox>
                        { 
                        Object.keys(this.props.createdGroups).length > 0 ?
                        (<ScrollBox>
                            <MyCreatedGroups 
                                createdGroups={this.props.createdGroups}
                            />
                        </ScrollBox>) 
                        : (null)
                        }
                        
                    </div>
                }
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
      groups: user.groups,
      createdGroups: user.createdGroups,
      score: user.score,
      error: user.error,
      isPending: user.isPending
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Profile));
