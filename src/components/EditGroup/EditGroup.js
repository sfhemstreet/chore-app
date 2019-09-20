import React from 'react';
import XButton from '../form_components/XButton';
import {getEmails} from '../../utils/addChoresHelpers';
import EditMembers from './EditMembers';
import DeleteGroup from './DeleteGroup';
/*
    EDITGROUP
    - add/remove members
    - delete group
*/

class EditGroup extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            editingPeople: false,
            removedPeople: [],
            groupMembers: getEmails(this.props.groupData),
            groupName: this.props.groupName,
            deleting: false 
        }
    }

    onEditGroupMembers = () => {
        this.setState({ editingPeople: true });
    }

    onDelete = () => {
        this.setState({ deleting: true });
    }

    onClose = () => {
        this.setState({ editingPeople: false, deleting: false });
    }

    removeMembers = (email) => {
        this.setState({ removedPeople: [...this.state.removedPeople, email] });
    }

    submitChanges = (addedPeople) => {
        const {removedPeople} = this.state;
        this.props.submitEdits(removedPeople, addedPeople);
    }

    deleteGroup = () => {
        this.props.delete();
    }


    render(){
        const {groupName, editingPeople, deleting, groupMembers} = this.state;
        return (
            <div className='center'>
                <div className='tc flex justify-center f1 fw2 black-90 mv3' >Edit {groupName} 
                    <div className='pa3 f6'><XButton className='tc center' click={this.props.quit} index={-1}/></div>
                </div>
                <div className="pa3 bt b--black-10">
                {
                    editingPeople ? <EditMembers currentMembers={groupMembers} remove={this.removeMembers} close={this.onClose} submit={this.submitChanges} />
                    :
                    deleting ? <DeleteGroup close={this.onClose} submit={this.deleteGroup} />
                    :
                    <div>
                        <div className='tc f3 pointer hover-white pa2' onClick={this.onEditGroupMembers} >Add/Remove Group Members</div>
                        <div className='tc f3 pointer hover-red pa2 ' onClick={this.onDelete} >Delete Group</div>
                    </div>
                }
                </div>
            </div>
        )
    }
}

export default EditGroup;