import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {getGroups} from '../../actions/groupActions';

class Profile extends React.Component {
    


    componentDidMount(){
        
        this.props.fetchAllGroupInfo();
    }

    render(){
        return (
            <div>
                <div>
                Profile
                </div>
                { this.props.isPending ?
                        <div>LOADING</div>
                :
                (<div>
                    {this.props.groups.toString()}
                </div>)
                }

            </div>
            
            
        )
    }
    
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchAllGroupInfo: () => dispatch(getGroups())
    }
}

const mapStateToProps = (state) => {
    const {user, group} = state;
    return {
      auth: user.auth,
      username: user.username,
      email: user.email,
      groups: group.groups,
      isPending: group.isPending,
      //inCompleteGroup : user.inCompleteGroup,
      score: user.score,
      error: user.error
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Profile));
