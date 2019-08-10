import React from 'react';
import StatusBar from '../StatusBar/StatusBar';
import PopUp from '../PopUp/PopUp';
import './Chore.css';

class Chore extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            num : this.props.num,
            assignDate : (new Date(this.props.assignDate)).toDateString(),
            choreName : this.props.choreName,
            completeDate : this.props.completeDate !== null ? (new Date(this.props.completeDate)).toDateString() : null,
            description : this.props.description,
            dueDate : (new Date(this.props.dueDate)).toDateString(),
            groupName : this.props.groupName,
            isDone : this.props.completeDate === null ? false : true,
            isPopUp : false
        }
    }

    onChoreCompleted = (event) => {
        this.setState({completeDate : new Date().toDateString(), isDone : true});
        this.props.onSubmit(this.props.choreNum);
    }
    
    onTogglePopUp = (event) => {
        this.setState({isPopUp : !this.state.isPopUp});    
    }
    
    render(){
        
        const {assignDate, choreName, completeDate, description, dueDate, groupName, isDone, isPopUp, num} = this.state; 
        const displayDueDate = dueDate.slice(0, dueDate.length - 4);

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
                    {completeDate !== null ?
                    (<><dt className='f6  mt2'>Completed On</dt>
                    <dd className='ml0 f4 b'>{completeDate}</dd></>)
                    : 
                    (<><dt className='f6  mt2'>Did this chore?</dt>
                    <dd className="f6 center link dim br3 ph3 pv3 mb2 mt2 dib white bg-green grow pointer" onClick={this.onChoreCompleted} >Submit Chore</dd></>)}
                </dl>
        };

        

        return (
            <li className={(num % 2) === 0 ? 'bg-white  pointer' : 'bg-near-white pointer'} onClick={this.onTogglePopUp}>
                <div className="pa3 underline-hover">
                    <div className='grid_container grow'  >
                        <div className='chore center pa2 b hover-blue '  >{displayName}</div>
                        <div className='due center pa2 b hover-blue' >{displayDueDate}</div>
                        <StatusBar  className='status center pa2 pointer' status={percent} timeLeft={daysLeft} isCompleted={isDone} />
                    </div>
                </div>
                {isPopUp ? 
                <PopUp className='center' close={this.onTogglePopUp} text={popUpText.info} />
                : null }
            </li> 
        )          
    }
    
}



export default Chore;