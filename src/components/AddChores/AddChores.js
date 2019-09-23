import React from 'react';
import '../PopUp/PopUp.css';
import SelectChores from './SelectChores';
import NewChoreOptions from './NewChoreOptions';
import ConfirmChores from './ConfirmChores';
import {checkChoresForOptions} from '../../utils/choreOptionHelpers';
import XButton from '../form_components/XButton';
import {assignChores} from '../../utils/assignChores';
import {getEmails} from '../../utils/addChoresHelpers';

class AddChores extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            stage: 0,
            chores: [],
            choresWithOptions: {},
            people: getEmails(this.props.groupData)
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
        const assignedChores = assignChores(this.state.people, this.state.choresWithOptions);
        this.props.submit(assignedChores);
    }

    onQuit = () => {
        this.props.quit();
    }

    render(){
        const {groupName} = this.props;
        
        return (
            <div className='list center mw6 pa3 ma4'>
                <div className='pa1 fr f6'><XButton className='tc center' click={this.onQuit} index={-1}/></div>
                <div className='center'>
                    <div className='tc f1 fw2 black-90 mv3' >Add Chores to {groupName}</div>
                    {{
                        0:  <SelectChores chores={this.state.chores} choreChange={this.updateChores} goForward={this.nextStage}/>,
                        1:  <NewChoreOptions chores={this.state.chores} choresWithOptions={this.state.choresWithOptions} updateOptions={this.updateChoreOptions} people={this.state.people} goForward={this.nextStage} goBack={this.previousStage} />,   
                        2:  <ConfirmChores chores={this.state.chores} choreOptions={this.state.choresWithOptions} submit={this.onSubmit} goBack={this.previousStage} />,
                        default:  <SelectChores chores={this.state.chores} choreChange={this.updateChores} goForward={this.nextStage}/>
                    }[this.state.stage]}
                </div>    
            </div>
            
        )
    }

}

export default AddChores;