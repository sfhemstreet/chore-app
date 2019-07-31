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


class CreateGroup extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            groupName : '',
            numPeople : 2,
            people : new Array(2).fill(''),
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
                        this.setState({ stage : 0, numPeople : 2, people : new Array(2).fill(''), chores : [], choresWithOptions : {} });
                        console.log('failed numpeople')
                    }
                    // check groupname 
                    if(localStorage.getItem('groupName') !== null){
                        this.setState({groupName : localStorage.getItem('groupName')});
                    }
                    else {
                        this.setState({ stage : 0, people : new Array(2).fill(''), chores : [], groupName : '', choresWithOptions : {} });
                        console.log('failed groupname')
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
                        this.setState({ stage : 1, people : new Array(this.state.numPeople).fill(''), chores : [], choresWithOptions : {} });
                        console.log('failed people')
                        return null;
                    }
                    //check chores
                    if(localStorage.getItem('chores') !== null){
                        const c = localStorage.getItem('chores').split(',');
                        this.setState({ chores : c });
                    } 
                    else{
                        this.setState({ stage : 2, chores : [], choresWithOptions : {} });
                        console.log('failed chores')
                        return null;
                    }    
                    //check choresWithOptions
                    if(localStorage.getItem('choresWithOptions') !== null){
                        console.log('stored', localStorage.getItem('choresWithOptions'))
                        const cwo = JSON.parse(localStorage.getItem('choresWithOptions'));
                        console.log('cwo', cwo)
                        this.setState({ stage : 3, choresWithOptions : cwo });
                    }
                    else{
                        this.setState({ stage : 3, choresWithOptions : {} });
                        console.log('failed choreswithoptions')
                        return null;
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

    onChangeNum = (num) => {
        this.setState({ people : new Array(Number(num)).fill('') ,numPeople : Number(num) });
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

    onSubmitChoreGroup = (event) => {
        //send the data to server 
    }


    render(){

        const renderStage = () => {
            switch(this.state.stage){
                case 0 : 
                    return (
                        <NumPeople groupNameChange={this.onChangeGroupName} numChange={this.onChangeNum} goForward={this.onAdvanceStage} numberOfPeople={this.state.numPeople} nameOfGroup={this.state.groupName}/>
                    )
                case 1 :
                    return (
                        <PeopleInfo people={this.state.people} peopleChange={this.onChangePeople} goForward={this.onAdvanceStage} goBack={this.onDecreaseStage} />
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
            <div className='vh-100 bg-blue dt w-100' >
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
        requestCreateGroup: (groupInfo) => dispatch(submitCreatedGroup(groupInfo)),
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CreateGroup));