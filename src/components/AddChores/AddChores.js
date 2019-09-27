import React from 'react';
import '../PopUp/PopUp.css';
import ChoreOptions from '../CreateGroup/ChoreOptions';
import {checkChoresForOptions} from '../../utils/choreOptionHelpers';
import XButton from '../form_components/XButton';
import {assignChores} from '../../utils/assignChores';
import {replaceUsernameWithEmail} from '../../utils/addChoresHelpers';
import ChoreSelection from '../CreateGroup/ChoreSelection';
import NewGroupConfirm from '../CreateGroup/NewGroupConfirm';

class AddChores extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            stage: 0,
            chores: [],
            choresWithOptions: {},
            people: Object.keys(this.props.groupData)
        }
    }

    updateChores = (chores) => {
        const cwo = checkChoresForOptions(this.state.choresWithOptions,chores);
        this.setState({ chores: chores, choresWithOptions: cwo });
    }

    updateChoreOptions = (choresWithOptions) => {
        this.setState({ choresWithOptions: choresWithOptions });
    }

    nextStage = () => {
        const newStage = this.state.stage + 1;
        this.setState({ stage: newStage });
    }

    previousStage = () => {
        const newStage = this.state.stage - 1;
        this.setState({ stage: newStage });
    }

    onSubmit = () => {
        // assign chores with usernames
        const roughAssignedChores = assignChores(this.state.people, this.state.choresWithOptions);
        // replace usernames with emails 
        const assignedChores = replaceUsernameWithEmail(roughAssignedChores, this.props.groupData);
        this.props.submit(assignedChores);
    }

    onQuit = () => {
        this.props.quit();
    }

    render(){
        const {groupName} = this.props;
        
        return (
            <div className='mw6 list center pa3 ma4 ba b--light-silver bg-near-white br2 shadow-2'>
                <div className='pa1 fr f6'><XButton className='tc center' click={this.onQuit} index={-1}/></div>
                <div className='center'>
                    <div className='tc f1 fw2 black-90 mv3' >Add Chores to {groupName}</div>
                    {{
                        0:  <ChoreSelection doNotSave={true} chores={this.state.chores} choreChange={this.updateChores} goForward={this.nextStage}/>,
                        1:  <ChoreOptions doNotSave={true} chores={this.state.chores} choresWithOptions={this.state.choresWithOptions} optionChange={this.updateChoreOptions} people={this.state.people} goForward={this.nextStage} goBack={this.previousStage} />,   
                        2:  <NewGroupConfirm justChores={true} chores={this.state.chores} choreOptions={this.state.choresWithOptions} submit={this.onSubmit} goBack={this.previousStage} />,
                        default:  <ChoreSelection doNotSave={true} chores={this.state.chores} choreChange={this.updateChores} goForward={this.nextStage}/>
                    }[this.state.stage]}
                </div>    
            </div>
            
        )
    }

}

export default AddChores;