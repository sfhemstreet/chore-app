import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {getChores} from '../../actions/choreActions';
import ScrollBox from '../ScrollBox.js';
import MyChores from './MyChores';
import MyGroups from './MyGroups';
import MyCreatedGroups from './MyCreatedGroups';

class Profile extends React.Component {
    componentDidMount(){
        this.props.requestChoreUpdate();
    }

    render(){
        return (
            <div>
                <div>
                Hello {this.props.username}!
                </div>
                { this.props.isPending ?
                        <div>LOADING</div>
                :
                (<div>
                    <ScrollBox>
                        <MyChores 
                            chores={this.props.chores}
                        />
                    </ScrollBox>
                    <ScrollBox>
                        <MyGroups 
                            groups={this.props.groups}
                        />
                    </ScrollBox>
                    <ScrollBox>
                        <MyCreatedGroups 
                            createdGroups={this.props.createdGroups}
                        />
                    </ScrollBox>
                </div>)
                }

            </div>
            
            
        )
    }
    
}

const mapDispatchToProps = (dispatch) => {
    return {
        requestChoreUpdate: () => dispatch(getChores())
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
      error: user.error
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Profile));
