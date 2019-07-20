import React from 'react';
import Group from '../Group/Group.js';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';

import {getChores} from '../../actions/choreActions';

class GroupsPage extends React.Component {
    
    componentDidMount(){
        this.props.requestChoreUpdate();
    }
    
    createGroupsArray = (groups) => {
        let array = [];
        Object.entries(groups).forEach((g) => {
            // g[0] is the groupName , g[1] is all the info
            let groupObj = {name : g[0], memberInfo : g[1]}
            array.push(groupObj);
        });
        return array;
    };
    
    render(){
        
        const groupsArray = this.createGroupsArray(this.props.groups)

        const renderAllGroups = groupsArray.map((_,i) => {
            return (
                <Group key={i} groupInfo={groupsArray[i]} />
            )
        })

        return(
            
            <div>
                
                {this.props.isPending ? 
                    <div>LOADING</div> 
                    :
                    <div>
                        
                    {
                        Object.keys(this.props.groups).length > 0 ?
                        (
                            <div>
                                <h2 className="tc center f3 f2-m f1-l fw2 black-90 mv3">Your Groups</h2>
                                <div>
                                    {renderAllGroups}
                                </div>
                            </div>
                        ) 
                        : <h2 className="tc center f3 f2-m f1-l fw2 black-90 mv3">No Groups... Wanna make one?</h2>
                    }
                    </div>
                }
                
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
      score: user.score,
      error: user.error,
      isPending: user.isPending
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        requestChoreUpdate: () => dispatch(getChores()),
        // requestMessages: (groupID) => dispatch(getGroupMessages(groupID))
        // submitMessage: (groupID, message) => dispatch(sendMessage(groupID, message))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(GroupsPage));