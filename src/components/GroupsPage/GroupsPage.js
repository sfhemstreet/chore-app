import React from 'react';
import Group from '../Group/Group.js';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {uid} from 'react-uid';
import {getChores, addChores} from '../../actions/choreActions';
import {deleteGroup, editGroup} from '../../actions/groupActions';
import AddChores from '../AddChores/AddChores';
import EditGroup from '../EditGroup/EditGroup';
import {getGroupId, checkEditAuth, getEmails} from '../../utils/addChoresHelpers';
import {createGroupsArray} from '../../utils/groupsPageHelpers';
import {NavLink} from 'react-router-dom';
import PlusButton from '../form_components/PlusButton';
import LoadingScreen from '../LoadingScreen/LoadingScreen.js';

class GroupsPage extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            inFocus: null,
            canEdit: null,
            addingChores: false,
            editingGroup: false,
            groupData: null,
            modGroupName: ''
        }
    }    

    componentDidMount(){
        this.props.requestChoreUpdate();
    }

    changeFocus = (groupData, canEdit) => {
        this.setState({ inFocus: groupData, canEdit: canEdit });
    }

    endGroupFocus = () => {
        this.setState({ inFocus: null, canEdit: null });
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

    submitAddChores = (chores) => {
        const id = getGroupId(this.state.groupData);
        this.props.requestAddChores(id,chores,getEmails(this.state.groupData));
        this.close();
        this.props.requestChoreUpdate();
        this.setState({ inFocus: null, canEdit: null })
    }

    submitGroupEdits = (removed, added, updated) => {
        const id = getGroupId(this.state.groupData);
        this.props.requestEditGroup(id,removed,added,updated);
        this.close();
        this.props.requestChoreUpdate();
        this.setState({ inFocus: null, canEdit: null });
    }

    deleteGroup = () => {
        const id = getGroupId(this.state.groupData);  
        this.props.requestDeleteGroup(id);
        this.close();
        this.props.requestChoreUpdate(); 
        this.setState({ inFocus: null, canEdit: null });
    }
 
    
    
    render(){
        const {inFocus, addingChores, editingGroup, groupData, modGroupName, canEdit} = this.state;
        const {email, groups, groupAuth, username} = this.props;

        const groupsArray = createGroupsArray(this.props.groups);

        const renderGroupThumbnails = groupsArray.map((_,i) => {
            const canEdit = checkEditAuth(this.props.createdGroups, groupsArray[i].memberInfo);

            const renderMemberNames = Object.keys(groupsArray[i].memberInfo).map(member => {
                return (
                    member === username ? null :
                    <div key={uid('GroupMember',i + member)} className='dib mr2'>
                        <div className='f6 f5-ns b db pa2 link dim green'>
                            {member}
                        </div>    
                    </div>
                    
                )
            });

            return (
                <div key={uid('Group',i)} className='grow pointer ma3 pa3 ba b--light-silver bg-light-gray br2 shadow-1 hover-orange center' onClick={() => this.changeFocus(groupsArray[i], canEdit)}>
                    <div className='tc f3 fw3 '>{groupsArray[i].name.replace('_', ' ')} </div>
                    <div className='list ph3 ph5-ns pv4 bt b--black-10 pa2 hover-blue'>{renderMemberNames} </div>
                </div>
            )
        });

        return(
            <div className='vh-100 bg-light-blue dt w-100'>
                {this.props.isPending ? 
                    <LoadingScreen /> 
                    :
                    <div>
                    {
                        editingGroup ? <EditGroup userEmail={email} groupName={modGroupName} groupData={groupData} submitEdits={this.submitGroupEdits} delete={this.deleteGroup} quit={this.close} /> :
                        addingChores ? <AddChores groupName={modGroupName} groupData={groupData} submit={this.submitAddChores} quit={this.close}/> :
                        inFocus !== null ? 
                        <Group 
                            groupInfo={inFocus} 
                            canAddChores={groupAuth[inFocus.name]} 
                            addChores={this.addChoresToGroup} 
                            canEditGroup={canEdit} 
                            editGroup={this.editGroup}
                            close={this.endGroupFocus}
                        /> :
                        Object.keys(groups).length > 0 ?
                            <div className='center mw6'>
                                <div className='pa1 f6 fr'><NavLink to='/creategroup'><PlusButton click={null} /></NavLink></div>
                                <h2 className="tc center f3 f2-m f1-l fw2 black-90 mv3 mw6">Your Groups</h2>
                                <div className='bt b--black-10'>
                                    {renderGroupThumbnails}
                                </div>
                            </div>
                        : 
                            <div>
                                <h2 className="tc center f3 f2-m f1-l fw2 black-90 mv3">You aren't in any groups...</h2>
                                <h2 className="tc center f3 f2-m f1-l fw2 black-90 mv3">Wanna make one?</h2>
                                <div className='center tc'><NavLink className="tc link f6 dim ph3 pv2 mb2 br2 dib white bg-green center" to='/creategroup'>Create a group</NavLink></div>
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
        requestAddChores: (groupID, newChores, emails) => dispatch(addChores(groupID, newChores, emails)),
        requestEditGroup: (id,removed,added, updated) => dispatch(editGroup(id,removed,added,updated)),
        requestDeleteGroup: (id) => dispatch(deleteGroup(id)),
        // requestMessages: (groupID) => dispatch(getGroupMessages(groupID))
        // submitMessage: (groupID, message) => dispatch(sendMessage(groupID, message))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(GroupsPage));