import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {submitCreatedGroup} from '../../actions/groupActions';
import NumPeople from './NumPeople';
import PeopleInfo from './PeopleInfo';
import ChoreSelection from './ChoreSelection';
import ChoreOptions from './ChoreOptions';
import NewGroupConfirm from './NewGroupConfirm';
import ProgressLine from '../ProgressLine/ProgressLine';
import {assignChores} from '../../utils/assignChores';

import GroupName from './GroupName';
import AddPeople from './AddPeople';


class CreateGroup extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            groupName : '',
            numPeople : 2,
            people : [this.props.email, ''],
            chores : [],
            stage : 0,
            choresWithOptions : {}
        }
    }

    componentDidMount(){
        // SEE IF LOCALSTORAGE HOLDS ANY PREVOUS CREATE GROUP DATA
        //check if storage is assocated to this user!
        if(localStorage.getItem('user') === this.props.username){
            // check stage
            if(localStorage.getItem('stage') !== null){
                //check if storage stage is greater than current
                if(this.state.stage < localStorage.getItem('stage')){
                    // check number of people
                    if(localStorage.getItem('numPeople') !== null){
                        this.setState({ numPeople : Number(localStorage.getItem('numPeople')) });
                    }
                    else{
                        this.setState({ stage : 0, numPeople : 2, people : [this.props.email, ''], chores : [], choresWithOptions : {} });
                    }
                    // check groupname 
                    if(localStorage.getItem('groupName') !== null){
                        this.setState({groupName : localStorage.getItem('groupName')});
                    }
                    else {
                        this.setState({ stage : 0, people : [this.props.email, ''], chores : [], groupName : '', choresWithOptions : {} });
                        return null;
                    }
                    //check people
                    if(localStorage.getItem('people') !== null){
                        const p = localStorage.getItem('people').split(',');
                        let full = true;
                        p.forEach(person => {
                            if(person === ''){
                                this.setState({ stage : 1, people : p });
                                full = false;
                            }
                        });
                        if(!full){
                            return null;
                        }
                        this.setState({ people : p });
                    }
                    else{
                        this.setState({ stage : 1, people : this.fillPeopleHelper(this.state.numPeople), chores : [], choresWithOptions : {} });
                        return null;
                    }
                    //check chores
                    if(localStorage.getItem('chores') !== null){
                        const c = localStorage.getItem('chores').split(',');
                        this.setState({ chores : c });
                    } 
                    else{
                        this.setState({ stage : 2, chores : [], choresWithOptions : {} });
                        return null;
                    }    
                    //check choresWithOptions
                    if(localStorage.getItem('choresWithOptions') !== null){
                        const cwo = JSON.parse(localStorage.getItem('choresWithOptions'));
                        this.setState({ stage : 3, choresWithOptions : cwo });
                    }
                    else{
                        this.setState({ stage : 3, choresWithOptions : {} });
                        return null;
                    }
                    // check if confirmChoreGroup is true
                    if(localStorage.getItem('confirmChoreGroup') !== null){
                        if(localStorage.getItem('confirmChoreGroup') === 'true'){
                            this.setState({ stage : 4 });
                        }
                    }
                }
            }     
        }
        // data is not users, delete it 
        else{
            localStorage.clear();
            localStorage.setItem('user', this.props.username);
        }
        
    }

    fillPeopleHelper = (number) => {
        let array = new Array(number).fill('');
        array[0] = this.props.email;
        return array;
    }

    onAdvanceStage = (event) => {
        this.setState({ stage: this.state.stage + 1 });
    }

    onDecreaseStage = (event) => {
        this.setState({ stage: this.state.stage - 1 });
    }

    onChangeGroupName = (name) => {
        this.setState({ groupName : name });
    }

    onChangeNum = (num) => {
        this.setState({ people : this.fillPeopleHelper(Number(num)) ,numPeople : Number(num) });
    }

    onChangePeople = (peopleInfo) => {
        this.setState({ people: peopleInfo });
    }

    onChangeChores = (choresSelected) => {
        this.setState({ chores: choresSelected });
    }

    onChangeOptions = (choresInfo) => {
        this.setState({ choresWithOptions: choresInfo });
        console.log('options change')
    }

    onSubmitChoreGroup = (peopleInfo) => {
        const assignedChores = assignChores(this.state.people, this.state.choresWithOptions)
        const groupInfo = {
            users : peopleInfo,
            chores : assignedChores,
            groupName : this.state.groupName,
        }
        // SEND TO ACTIONS 
        this.props.requestCreateGroup(groupInfo, this.props.history);
    }


    render(){
        const {groupName} = this.state;

        const renderStage = () => {
            switch(this.state.stage){
                case 0 : 
                    return (
                        
                        <GroupName groupNameChange={this.onChangeGroupName} nameOfGroup={this.state.groupName} goForward={this.onAdvanceStage}/>
                        //<NumPeople groupNameChange={this.onChangeGroupName} numChange={this.onChangeNum} goForward={this.onAdvanceStage} numberOfPeople={this.state.numPeople} nameOfGroup={this.state.groupName}/>
                    )
                case 1 :
                    return (
                        <AddPeople numChange={this.onChangeNum} people={this.state.people} peopleChange={this.onChangePeople} goForward={this.onAdvanceStage} goBack={this.onDecreaseStage}/>
                        //<PeopleInfo people={this.state.people} peopleChange={this.onChangePeople} goForward={this.onAdvanceStage} goBack={this.onDecreaseStage} />
                    )
                case 2 : 
                    return (
                        <ChoreSelection choreChange={this.onChangeChores} choreOptionChange={this.onChangeOptions} goForward={this.onAdvanceStage} goBack={this.onDecreaseStage} />
                    )
                case 3 :
                    return (
                        <ChoreOptions chores={this.state.chores} people={this.state.people} choresWithOptions={this.state.choresWithOptions} optionChange={this.onChangeOptions} group={this.state.groupName} goForward={this.onAdvanceStage} goBack={this.onDecreaseStage} />
                    )
                case 4 : 
                    return (
                        <NewGroupConfirm group={this.state.groupName} chores={this.state.chores} choreOptions={this.state.choresWithOptions} people={this.state.people} submit={this.onSubmitChoreGroup} goBack={this.onDecreaseStage} />
                    )
                default:
                    return (
                        <NumPeople numChange={this.onChangeNum} goForward={this.onAdvanceStage} />
                    )
            }
        }
        const outPut = renderStage();

        return (
            <div className='vh-100 bg-near-white dt w-100' >
                {groupName !== '' ? <div className='f4 black b mv0 pv2 ph3 tc'>{groupName}</div> : null}
                <ProgressLine progress={this.state.stage} />
                {outPut}
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
        requestCreateGroup: (groupInfo, history) => dispatch(submitCreatedGroup(groupInfo, history)),
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CreateGroup));