import React from 'react';
import StatusBar from '../StatusBar/StatusBar';
import PopUp from '../PopUp/PopUp';
//import './Chore.css';

class GroupChore extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            num : this.props.num,
            assignName : this.props.assignName,
            assignDate : (new Date(this.props.assignDate)).toDateString(),
            choreName : this.props.choreName,
            completeDate : this.props.completeDate !== null ? (new Date(this.props.completeDate)).toDateString() : null,
            description : this.props.description,
            groupName : this.props.groupName,
            dueDate : (new Date(this.props.dueDate)).toDateString(),
            isDone : this.props.completeDate === null ? false : true,
            isPopUp : false
        }
        console.log(this.props , 'inside', this.props.assignName)
    }

    onChallengeChore = (event) => {
        //this.setState({completeDate : new Date().toDateString(), isDone : true});
        //this.props.onSubmit(this.props.choreNum);
    }
    
    onTogglePopUp = (event) => {
        this.setState({isPopUp : !this.state.isPopUp});    
    }
    

    render(){
        
        const { assignName, assignDate, choreName, completeDate, description, dueDate, groupName, isDone, isPopUp, num} = this.state;
        const displayDueDate = dueDate.slice(0, dueDate.length - 4);
        // catch chores that are null AKA no chores for this user
        if(this.state.choreName === null){
            return (
                <li className='bg-near-white'>
                    <div className="pa3">
                        <div className='grid_container '>
                            <div className='chore center pa2 b'>No Chores Due</div>
                        </div>
                    </div>
                </li> 
            )
        }
        // dont display full chore name if over 25 char
        let displayName = choreName;
        if(choreName.length > 25){
            displayName = choreName.substring(0,25) + '...';
        }
        // used by popup and status bar
        const now = Date.now();
        const daysLeft = Math.floor((Date.parse(dueDate)/86400000) - (now/86400000)) + 1;
        const percent = ((now - Date.parse(assignDate)) / (Date.parse(dueDate) - Date.parse(assignDate))) * 100;
        // text when user clicks on chore
        const popUpText = {
            info: 
                <dl className='lh-title pa4 mt0'>
                    <dt className='f6 '>Assigned to</dt>
                    <dd className='ml0 f4 b'>{assignName}</dd>
                    <dt className='f6 '>Chore Name</dt>
                    <dd className='ml0 f4 b'>{choreName}</dd>
                    {description !== null ? 
                    (<><dt className='f6  mt2'>Description</dt>
                    <dd className='ml0 f4 b'>{description}</dd></>)
                    : null}
                    <dt className='f6  mt2'>Due Date</dt>
                    {percent >= 100 && !isDone ? <dd className='ml0 f4 b red'>{dueDate}</dd> : <dd className='ml0 f4 b'>{dueDate}</dd>}
                    <dt className='f6  mt2'>Group</dt>
                    <dd className='ml0 f4 b'>{groupName}</dd>
                    <dt className='f6  mt2'>Assigned On</dt>
                    <dd className='ml0 f4 b'>{assignDate}</dd>
                    {completeDate === null ?
                    (null)
                    : 
                    (<><dt className='f6  mt2'>Did this actually not get done?</dt>
                    <dd className="f6 center link dim br3 ph3 pv3 mb2 mt2 dib white bg-green grow pointer" onClick={this.onChallengeChore} >Challenge Chore</dd></>)}
                </dl>
        };

        

        return (
            <li className={(num % 2) !== 0 ? 'bg-white  pointer' : 'bg-near-white pointer'} onClick={this.onTogglePopUp}>
                <div className="pa3 grow underline-hover">
                    <div className='grid_container '  >
                        <div className='chore center pa2 b hover-blue '  >{displayName}</div>
                        <div className='due center pa2 b hover-blue' >{displayDueDate}</div>
                        <StatusBar  className='status center pa2 pointer grow' status={percent} timeLeft={daysLeft} isCompleted={isDone} />
                    </div>
                </div>
                {isPopUp ? 
                <PopUp className='center' close={this.onTogglePopUp} text={popUpText.info} />
                : null }
            </li> 
        )     
            
    }
    
}



export default GroupChore;