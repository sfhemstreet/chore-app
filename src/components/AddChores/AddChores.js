import React from 'react';
import '../PopUp/PopUp.css';
import SelectChores from './SelectChores';
import NewChoreOptions from './NewChoreOptions';
import ConfirmChores from './ConfirmChores';
import {checkChoresForOptions} from '../../utils/choreOptionHelpers';


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
        this.setState({ chores: chores, choresWithOptions: checkChoresForOptions(this.state.choresWithOptions,chores) });
    }

    updateChoreOptions = (choresWithOptions) => {

    }

    nextStage = () => {
        this.setState({ stage: ++this.state.stage });
    }

    previousStage = () => {
        this.setState({ stage: --this.state.stage });
    }

    render(){
        const {groupName} = this.props;
        
        return (
            <div>
                <div>{groupName}</div>
                {{
                    0:  <SelectChores chores={this.state.chores} choreChange={this.updateChores} goForward={this.nextStage}/>,
                    1:  <NewChoreOptions choresWithOptions={this.state.choresWithOptions} choreOptionChange={this.updateChoreOptions} people={this.state.people} goForward={this.nextSatge} goBack={this.previousStage} />,   
                    2:  <ConfirmChores choresWithOptions={this.state.choresWithOptions} submit={this.onSumbit} goBack={this.previousStage} />,
                    default:  <SelectChores chores={this.state.chores} choreChange={this.updateChores} goForward={this.nextStage}/>
                }[this.state.stage]}
            </div>
        )
    }

}

export default AddChores;