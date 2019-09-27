import React from 'react';
import NextButton from '../form_components/NextButton';
import BackButton from '../form_components/BackButton';
import regexCheck from '../../utils/regexCheck';
import {todaysDate, nextWeek} from '../../utils/todaysDate';
import {makeChoreObjs, makeHLRObjs, checkChoresForOptions} from '../../utils/choreOptionHelpers';
import {uid} from 'react-uid';
import './CreateNewGroup.css';

class ChoreOptions extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            choresWOptions : this.props.choresWithOptions ? checkChoresForOptions(this.props.choresWithOptions, this.props.chores) : JSON.parse(JSON.stringify(makeChoreObjs(this.props.chores))),
            highlightred : JSON.parse(JSON.stringify(makeHLRObjs(this.props.chores))),
        }
    }

    componentDidMount(){
        if(!this.props.doNotSave)
            localStorage.setItem('confirmChoreGroup','false');
    }

    updateDescription = (event) => {
        const {optionChange} = this.props;
        const {choresWOptions , highlightred} = this.state;
        
        if(regexCheck(event.target.value, 'special')){
            let c = JSON.parse(JSON.stringify(choresWOptions));
            c[event.target.name].description = event.target.value;
            
            if(!this.props.doNotSave)
                localStorage.setItem('choresWithOptions', JSON.stringify(c));
            
            optionChange(c);

            let hlr = JSON.parse(JSON.stringify(highlightred));
            hlr[event.target.name].description = false;
            this.setState({ choresWOptions : c , highlightred : hlr});
        }
        else{
            let hlr = JSON.parse(JSON.stringify(highlightred));
            hlr[event.target.name].description = true;
            this.setState({ highlightred : hlr });
        }
    }

    updateDueDate = (event) => {
        const {optionChange} = this.props;
        const {choresWOptions , highlightred} = this.state;

        let c = JSON.parse(JSON.stringify(choresWOptions));
        if(regexCheck(event.target.value, 'yyyy-mm-dd')){
            c[event.target.name].dueDate = event.target.value;
            
            if(!this.props.doNotSave)
                localStorage.setItem('choresWithOptions', JSON.stringify(c));

            let hlr = JSON.parse(JSON.stringify(highlightred));
            hlr[event.target.name].dueDate = false;
            optionChange(c);
            this.setState({ choresWOptions : c , highlightred : hlr});
        } 
        else{
            let hlr = JSON.parse(JSON.stringify(highlightred));
            hlr[event.target.name].dueDate = true;
            this.setState({ highlightred : hlr });
        }
    }

    updateAssignment = (event) => {
        const {optionChange} = this.props;
        const {choresWOptions} = this.state;
        let c = JSON.parse(JSON.stringify(choresWOptions));

        // check for exempt being same as assigned
        if(c[event.target.name].exempt === event.target.value)
            c[event.target.name].exempt = 'None';
        
        // update assignment in state and localStorage
        c[event.target.name].assignment = event.target.value;
        this.setState({ choresWOptions : c });
        
        if(!this.props.doNotSave)
            localStorage.setItem('choresWithOptions', JSON.stringify(c));
        
        // send update to parent
        optionChange(c);
    }

    updateExempt = (event) => {
        const {optionChange} = this.props;
        const {choresWOptions} = this.state;
        let c = JSON.parse(JSON.stringify(choresWOptions));
        // update exempt in state and localStorage
        c[event.target.name].exempt = event.target.value;
        this.setState({ choresWOptions : c });
        
        if(!this.props.doNotSave)
            localStorage.setItem('choresWithOptions', JSON.stringify(c));
        
        // send update to parent
        optionChange(c);
    }

    onSubmit = (event) => {
        const {optionChange, goForward, chores} = this.props;
        const {choresWOptions , highlightred} = this.state;
        // check if anything is red
        const hlr = JSON.parse(JSON.stringify(highlightred));
        let allGood = true;
        for(let x = 0; x < chores.length; x++){
            if(hlr[chores[x]].description){
                allGood = false;
            }
            if(hlr[chores[x]].dueDate){
                allGood = false;
            }
        }
        if(allGood){
            if(!this.props.doNotSave)
                localStorage.setItem('choresWithOptions', JSON.stringify(choresWOptions));
            optionChange(choresWOptions);
            goForward();
        }
    }

    renderChores = (choresWOptions) => {
        const {people} = this.props;
        const { highlightred} = this.state;

        const chores = Object.keys(choresWOptions);

        const renderSelectOptions = people.map((_,i) => {
            return (
                <option key={uid(`selectOption${people[i]}`, i)} value={people[i]}>{people[i]}</option>
            )
        });

        return chores.map((_,i) => {
            return (
                <div key={uid(`choreoption${chores[i]}`, i)} className="pa2 ma3 bt b--black">
                    <h3 className="b tc">{chores[i]}</h3>
                    <div className='pa1 ma1 chore-options_grid'>
                        <div className="pt2 descript">Due Date</div>
                        <input className={highlightred[chores[i]].dueDate ? 'bg-red pa1 db tc f6 lh-title thing' : 'pa1 db tc f6 lh-title thing'} onChange={this.updateDueDate} name={chores[i]} type='date' min={todaysDate()} defaultValue={nextWeek()} ></input>
                    </div>
                    <div className='pa1 ma1 chore-options_grid'>
                        <div className="pt2 descript">Assign</div>
                        <select onChange={this.updateAssignment} name={chores[i]} defaultValue={choresWOptions[chores[i]].assignment} className='pa2 db ba bg-animate hover-bg-washed-green tc f5 lh-title thing' >
                            <option className='b pa2 input-reset ' value='Randomly'>Randomly</option>
                            {renderSelectOptions}
                        </select>    
                    </div>
                    {
                    choresWOptions[chores[i]].assignment !== 'Randomly' ? null :
                    <div className='pa1 ma1 chore-options_grid'>
                        <div className="pt2 descript">Exempt</div>
                        <select onChange={this.updateExempt} name={chores[i]} defaultValue={choresWOptions[chores[i]].exempt} className='pa2 db ba bg-animate hover-bg-washed-green tc f5 lh-title thing' >
                            <option className='b pa2 input-reset ' value='None'>None</option>
                            {renderSelectOptions}
                        </select>    
                    </div>
                    }
                    <div className='pa1 ma1 chore-options_grid'>
                        <div className="pt2 descript">Description</div>
                        <input onChange={this.updateDescription} className={highlightred[chores[i]].description ? "pa2 input-reset ba bg-animate hover-bg-washed-green bg-red w-100 thing":"pa2 input-reset ba bg-animate hover-bg-washed-green w-100 thing"} name={chores[i]} type='text' defaultValue={choresWOptions[chores[i]].description}></input>     
                    </div>  
                </div>
            )
        });

    }

    render(){
        const {group,goBack} = this.props;
        const {choresWOptions} = this.state;
        
        const renderChoreOptions = this.renderChores(choresWOptions);
        
        return (
            <div className='center mw6-ns br3 hidden mv4'>
                {this.props.doNotSave ? <h1 className="f4 black b mv0 pv2 ph3 tc">Assign New Chores</h1> : <h1 className="f4 black b mv0 pv2 ph3 tc">Assign Chores for {group}</h1>}
                <div className="pa3 bt b--black-10">
                    <div className='pa1 f5 pl3'>
                        Pick a due date<br/>
                        Assign who does the chore<br/> 
                        Exempt person will not get the chore<br/>
                    </div>
                    <fieldset className="ba b--transparent ph0 mh0">
                        <div>
                            <div className=''>{renderChoreOptions}</div>
                        </div>
                        <div className='tc pa2 ma2'>
                            <BackButton click={goBack}/>
                            <NextButton click={this.onSubmit}/>
                        </div>
                    </fieldset>
                </div>
            </div>
        )    
    }
     
}

export default ChoreOptions;