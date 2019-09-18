import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {submitCreatedGroup} from '../../actions/groupActions';
import {assignChores} from '../../utils/assignChores';
//compontents
import GroupName from './GroupName';
import AddPeople from './AddPeople';
import ChoreSelection from './ChoreSelection';
import ChoreOptions from './ChoreOptions';
import NewGroupConfirm from './NewGroupConfirm';
import ProgressLine from '../ProgressLine/ProgressLine';

class CreateNewGroup extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            groupName : '',
            people : [this.props.email,''],
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
                    // check groupname 
                    if(localStorage.getItem('groupName') !== null){
                        this.setState({groupName : localStorage.getItem('groupName')});
                    }
                    else {
                        this.setState({ stage : 0, people : [this.props.email,''], chores : [], groupName : '', choresWithOptions : {} });
                        return null;
                    }
                    //check people
                    if(localStorage.getItem('people') !== null){
                        const p = localStorage.getItem('people').split(',');
                        let full = true;
                        p.forEach(person => {
                            if(person === ''){
                                this.setState({ stage : 1, people : [this.props.email].concat(p) });
                                full = false;
                            }
                        });
                        if(!full){
                            return null;
                        }
                        this.setState({ people : p });
                    }
                    else{
                        this.setState({ stage : 1, people : this.state.people, chores : [], choresWithOptions : {} });
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
                        this.setState({ stage : 2, choresWithOptions : {} });
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

    onAdvanceStage = (event) => {
        this.setState({ stage: this.state.stage + 1 });
    }

    onDecreaseStage = (event) => {
        this.setState({ stage: this.state.stage - 1 });
    }

    onChangeGroupName = (name) => {
        this.setState({ groupName : name });
    }

    onChangePeople = (peopleInfo) => {
        this.setState({ people: peopleInfo });
    }

    onChangeChores = (choresSelected) => {
        this.setState({ chores: choresSelected });
    }

    onChangeOptions = (choresInfo) => {
        this.setState({ choresWithOptions: choresInfo });
    }

    onSubmitChoreGroup = (peopleInfo) => {
        const assignedChores = assignChores(this.state.people, this.state.choresWithOptions);
        console.log('should be true and false next to stuf!',peopleInfo)
        const groupInfo = {
            users : peopleInfo,
            chores : assignedChores,
            groupName : this.state.groupName,
        }
        // SEND TO ACTIONS 
        this.props.requestCreateGroup(groupInfo, this.props.history);
    }


    render(){
        const {groupName, stage, people, chores, choresWithOptions} = this.state;

        const renderStage = () => {
            switch(stage){
                case 0 : 
                    return (
                        <GroupName groupNameChange={this.onChangeGroupName} nameOfGroup={groupName} goForward={this.onAdvanceStage}/>
                    )
                case 1 :
                    return (
                        <AddPeople people={people} peopleChange={this.onChangePeople} goForward={this.onAdvanceStage} goBack={this.onDecreaseStage}/>
                    )
                case 2 : 
                    return (
                        <ChoreSelection choreChange={this.onChangeChores} choreOptionChange={this.onChangeOptions} goForward={this.onAdvanceStage} goBack={this.onDecreaseStage} />
                    )
                case 3 :
                    return (
                        <ChoreOptions userEmail={this.props.email} chores={chores} people={people} choresWithOptions={choresWithOptions} optionChange={this.onChangeOptions} group={groupName} goForward={this.onAdvanceStage} goBack={this.onDecreaseStage} />
                    )
                case 4 : 
                    return (
                        <NewGroupConfirm userEmail={this.props.email} group={groupName} chores={chores} choreOptions={choresWithOptions} people={people} submit={this.onSubmitChoreGroup} goBack={this.onDecreaseStage} />
                    )
                default:
                    return (
                        <GroupName groupNameChange={this.onChangeGroupName} nameOfGroup={groupName} goForward={this.onAdvanceStage}/>
                    )
            }
        }
        const outPut = renderStage();

        return (
            <div className='vh-100 bg-light-blue dt w-100' >
                <ProgressLine progress={this.state.stage} />
                {groupName !== '' ? <div className='f4 black mv0 pv2 ph3 tc'>{groupName}</div> : null}
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CreateNewGroup));