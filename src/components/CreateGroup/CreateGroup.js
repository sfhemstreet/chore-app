import React from 'react';
import NumPeople from './NumPeople';
import PeopleInfo from './PeopleInfo';
import ChoreSelection from './ChoreSelection';
import ChoreOptions from './ChoreOptions';
import NewGroupConfirm from './NewGroupConfirm';

class CreateGroup extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            groupName : '',
            numPeople : 0,
            people : [],
            chores : [],
            stage : 0,
        }
    }

    onAdvanceStage = (event) => {
        this.setState({ stage: this.state.stage + 1 })
    }

    onDecreaseStage = (event) => {
        if((this.state.stage - 1) === 1 ){
            this.setState({ people : new Array(this.state.numPeople) })
        }
        this.setState({ stage: this.state.stage - 1 })
    }

    onChangeNum = (num) => {
        this.setState({ people: new Array(Number(num)), numPeople : Number(num) })
    }

    onChangePeople = (peopleInfo) => {
        this.setState({ people: peopleInfo })
    }

    onChangeChores = (choresSelected) => {
        this.setState({ chores: choresSelected })
    }

    onChangeOptions = (choresInfo) => {
        this.setState({ chores: choresInfo })
    }

    onSubmitChoreGroup = (event) => {
        //send the data to server 
    }


    render(){

        
        // sidebar thaty shows progress
        const renderStage = () => {
            switch(this.state.stage){
                case 0 : 
                    return (
                        <NumPeople numChange={this.onChangeNum} goForward={this.onAdvanceStage} />
                    )
                case 1 :
                    return (
                        <PeopleInfo people={this.state.people} peopleChange={this.onChangePeople} goForward={this.onAdvanceStage} goBack={this.onDecreaseStage} />
                    )
                case 2 : 
                    return (
                        <ChoreSelection choreChange={this.onChangeChores} goForward={this.onAdvanceStage} goBack={this.onDecreaseStage} />
                    )
                case 3 :
                    return (
                        <ChoreOptions chores={this.state.chores} people={this.state.people} optionChange={this.onChangeOptions} goForward={this.onAdvanceStage} goBack={this.onDecreaseStage} />
                    )
                case 4 : 
                    return (
                        <NewGroupConfirm chores={this.state.chores} people={this.state.people} submit={this.onSubmitChoreGroup} goForward={this.onAdvanceStage} goBack={this.onDecreaseStage} />
                    )
                default:
                    return (
                        <NumPeople numChange={this.onChangeNum} goForward={this.onAdvanceStage} />
                    )
            }
        }
        const outPut = renderStage();

        return (
            <div className='vh-100 bg-light-purple dt w-100' >
                {outPut}
            </div> 
        )
    }
}

export default CreateGroup;