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

    submitChanges = (removed, added, changed) => {
        this.props.submitEdits(removed, added, changed);
    }

    deleteGroup = () => {
        this.props.delete();
    }


    render(){
        const {groupName, editingPeople, deleting, groupMembers} = this.state;
        return (
            <div  className='list center mw6 pa3 ma4 ba b--light-silver bg-light-gray br2 shadow-2'>
                <div className='pa1 fr f6'><XButton className='tc center' click={this.props.quit} index={-1}/></div>
                <div className='center'>
                    <div className='tc f1 fw2 black-90 mv3' >Edit {groupName}</div>
                    <div className="pa3 bt b--black-10">
                    {
                        editingPeople ? <EditMembers userEmail={this.props.userEmail} groupData={this.props.groupData} currentMembers={groupMembers} remove={this.removeMembers} close={this.onClose} submit={this.submitChanges} />
                        :
                        deleting ? <DeleteGroup close={this.onClose} submit={this.deleteGroup} />
                        :
                        <div>
                            <div className='tc f3 pointer hover-green pa2' onClick={this.onEditGroupMembers} >Add/Remove Group Members <br/> Change Who Can Add Chores</div>
                            <div className='tc f3 pointer hover-red pa2 mt2' onClick={this.onDelete} >Delete Group</div>
                        </div>
                    }
                    </div>
                </div>    
            </div>
            
        )
    }
}

export default EditGroup;