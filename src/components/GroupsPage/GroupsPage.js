import React from 'react';
import Group from '../Group/Group.js';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {uid} from 'react-uid';
import {getChores, addChores} from '../../actions/choreActions';
import {deleteGroup, editGroup} from '../../actions/groupActions';
import AddChores from '../AddChores/AddChores';
import EditGroup from '../EditGroup/EditGroup';
import {getGroupId, checkEditAuth} from '../../utils/addChoresHelpers';

class GroupsPage extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            addingChores: false,
            editingGroup: false,
            groupData: null,
            modGroupName: ''
        }
    }    

    componentDidMount(){
        this.props.requestChoreUpdate();
    }

    editGroup = (groupName, groupData) => {
        this.setState({ groupData: groupData, addingChores: false, modGroupName: groupName, editingGroup: true });
    }

    addChoresToGroup = (groupName, groupData) => {
        this.setState({ groupData: groupData, addingChores: true, modGroupName: groupName });
    }

    close = () => {
        this.setState({ addingChores : false, editingGroup: false });    
    }

    submitNewChores = (chores) => {
        console.log('yo', chores)
        const id = getGroupId(this.state.groupData);
        this.props.requestAddChores(id,chores);
        this.close();
        this.props.requestChoreUpdate();
    }

    submitGroupEdits = (remove, add) => {
        const id = getGroupId(this.state.groupData);
        this.props.requestEditGroup(id,remove,add);
        this.close();
        this.props.requestChoreUpdate();
    }

    deleteGroup = () => {
        const id = getGroupId(this.state.groupData);  
        this.props.requestDeleteGroup(id);
        this.close();
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
        const groupsArray = this.createGroupsArray(this.props.groups);
        const renderAllGroups = groupsArray.map((_,i) => {
            const canEdit = checkEditAuth(this.props.createdGroups, groupsArray[i].memberInfo);
            return (
                <div key={uid('Group',i)} className='mb3'>
                   <Group   
                        groupInfo={groupsArray[i]} 
                        canAddChores={this.props.groupAuth[groupsArray[i].name]} 
                        addChores={this.addChoresToGroup} 
                        canEditGroup={canEdit} 
                        editGroup={this.editGroup}
                    /> 
                </div>
            )
        });
        
        return(
            <div className='vh-100 bg-light-blue dt w-100'>
                {this.props.isPending ? 
                    <div>LOADING</div> 
                    :
                    <div>
                    {
                        this.state.editingGroup ? <EditGroup groupName={this.state.modGroupName} groupData={this.state.groupData} submitEdits={this.submitGroupEdits} delete={this.deleteGroup} quit={this.close} /> :
                        this.state.addingChores ? <AddChores groupName={this.state.modGroupName} groupData={this.state.groupData} submit={this.submitNewChores} quit={this.close}/> :
                        Object.keys(this.props.groups).length > 0 ?
                            <div>
                                <h2 className="tc center f3 f2-m f1-l fw2 black-90 mv3">Your Groups</h2>
                                <div className=''>
                                    {renderAllGroups}
                                </div>
                            </div>
                        : 
                            <div>
                                <h2 className="tc center f3 f2-m f1-l fw2 black-90 mv3">You aren't in any groups...</h2>
                                <h2 className="tc center f3 f2-m f1-l fw2 black-90 mv3">Wanna make one?</h2>
                            </div>
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
      groupAuth: user.groupAuth,
      score: user.score,
      error: user.error,
      isPending: user.isPending
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        requestChoreUpdate: () => dispatch(getChores()),
        requestAddChores: (groupID, newChores) => dispatch(addChores(groupID, newChores)),
        requestEditGroup: (id,remove,add) => dispatch(editGroup(id,remove,add)),
        requestDeleteGroup: (id) => dispatch(deleteGroup(id)),
        // requestMessages: (groupID) => dispatch(getGroupMessages(groupID))
        // submitMessage: (groupID, message) => dispatch(sendMessage(groupID, message))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(GroupsPage));