import React from 'react';
import StatusBar from '../StatusBar/StatusBar';
import PopUp from '../PopUp/PopUp';
//import './Chore.css';

class GroupChore extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            num : this.props.num,
            type: this.props.type,
            assignName : this.props.assignName,
            assignDate : (new Date(this.props.assignDate)).toDateString(),
            choreName : this.props.choreName,
            completeDate : this.props.completeDate !== null ? (new Date(this.props.completeDate)).toDateString() : null,
            description : this.props.description,
            dueDate : (new Date(this.props.dueDate)).toDateString(),
            isDone : this.props.completeDate === null ? false : true,
            isPopUp : false
        }
        //console.log(this.props , 'inside', this.props.assignName)
    }

    onTogglePopUp = (event) => {
        this.setState({isPopUp : !this.state.isPopUp});    
    }
    
    render(){
        
        const { assignName, assignDate, choreName, completeDate, description, dueDate, isDone, isPopUp, num, type} = this.state;
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
        // fix this to display percentage out of 5 days 
        const percent = ((now - Date.parse(assignDate)) / (Date.parse(dueDate) - Date.parse(assignDate))) * 100;
        // type display ie randomly assigned, assigned with exempt, etc
        let displayType = type === 'R' ? 'Randomly Assigned' : type === 'A' ? 'Explicitly Assigned' : 'Randomly Assigned with one member exempt'; 
        // text when user clicks on chore
        const popUpText = {
            info: 
                <dl className='lh-title pa4 mt0'>
                    <dt className='f6 pa1'>Member</dt>
                    <dd className='ml0 f4 b pa1'>{assignName}</dd>
                    <dt className='f6 pa1'>Chore Name</dt>
                    <dd className='ml0 f4 b pa1'>{choreName}</dd>
                    {description !== null ? 
                    (<><dt className='f6  mt2 pa1'>Description</dt>
                    <dd className='ml0 f4 b pa1'>{description}</dd></>)
                    : null}
                    <dt className='f6  mt2 pa1'>Due Date</dt>
                    {percent >= 100 && !isDone ? <dd className='ml0 f4 b red pa1'>{dueDate}</dd> : <dd className='ml0 f4 b pa1'>{dueDate}</dd>}
                    <dt className='f6  mt2 pa1'>Assigned On</dt>
                    <dd className='ml0 f4 b pa1'>{assignDate}</dd>
                    {completeDate === null ?
                    (null)
                    : 
                    (<><dt className='f6  mt2 pa1'>Completed On</dt>
                    <dd className='ml0 f4 b pa1' >{completeDate}</dd></>)}
                    <dt className='f6 pa1'>{displayType}</dt>
                </dl>
        };

        return (
            <li className={(num % 2) !== 0 ? 'bg-white  pointer' : 'bg-near-white pointer'} onClick={this.onTogglePopUp}>
                <div className="pa3 underline-hover hover-blue pointer">
                    <div className='grid_container '  >
                        <div className='chore center pa2 b  '  >{displayName}</div>
                        <div className='due center pa2 b ' >{displayDueDate}</div>
                        <StatusBar  className='status center pa2' status={percent} timeLeft={daysLeft} isCompleted={isDone} />
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