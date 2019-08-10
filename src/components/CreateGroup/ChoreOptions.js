import React from 'react';
import NextButton from '../form_components/NextButton';
import BackButton from '../form_components/BackButton';
import regexCheck from '../../utils/regexCheck';
import ScrollBox from '../ScrollBox';
import {todaysDate} from '../../utils/todaysDate';
import {makeChoreObjs, makeHLRObjs, checkChoresForOptions} from '../../utils/choreOptionHelpers';

class ChoreOptions extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            choresWOptions : this.props.choresWithOptions ? checkChoresForOptions(this.props.choresWithOptions, this.props.chores) : JSON.parse(JSON.stringify(makeChoreObjs(this.props.chores))),
            highlightred : JSON.parse(JSON.stringify(makeHLRObjs(this.props.chores)))
        }
    }

    componentDidMount(){
        localStorage.setItem('confirmChoreGroup','false');
    }

    updateDescription = (event) => {
        const {optionChange} = this.props;
        const {choresWOptions , highlightred} = this.state;
        
        if(regexCheck(event.target.value, 'special')){
            let c = JSON.parse(JSON.stringify(choresWOptions));
            c[event.target.name].description = event.target.value;
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
        const {choresWOptions , highlightred} = this.state;

        let c = JSON.parse(JSON.stringify(choresWOptions));
        if(c[event.target.name].exempt === event.target.name){
            let hlr = JSON.parse(JSON.stringify(highlightred));
            hlr[event.target.name].assignment = true;
            hlr[event.target.name].exempt = true;
            this.setState({ highlightred : hlr });
            return null;
        }
        else{
            let hlr = JSON.parse(JSON.stringify(highlightred));
            hlr[event.target.name].assignment = false;
            hlr[event.target.name].exempt = false;
            this.setState({ highlightred : hlr });
        }
        c[event.target.name].assignment = event.target.value;
        localStorage.setItem('choresWithOptions', JSON.stringify(c));
        optionChange(c);
        this.setState({ choresWOptions : c });
    }

    updateExempt = (event) => {
        const {optionChange} = this.props;
        const {choresWOptions , highlightred} = this.state;

        let c = JSON.parse(JSON.stringify(choresWOptions));
        if(c[event.target.name].assignment === event.target.value){
            let hlr = JSON.parse(JSON.stringify(highlightred));
            hlr[event.target.name].exempt = true;
            hlr[event.target.name].assignment = true;
            this.setState({ highlightred : hlr });
            return null;
        }
        else{
            let hlr = JSON.parse(JSON.stringify(highlightred));
            hlr[event.target.name].exempt = false;
            hlr[event.target.name].assignment = false;
            this.setState({ highlightred : hlr });
        }
        c[event.target.name].exempt = event.target.value;
        localStorage.setItem('choresWithOptions', JSON.stringify(c));
        optionChange(c);
        this.setState({ choresWOptions : c });
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
            if(hlr[chores[x]].assignment){
                allGood = false;
            }
            if(hlr[chores[x]].exempt){
                allGood = false;
            }
        }
        if(allGood){
            localStorage.setItem('choresWithOptions', JSON.stringify(choresWOptions));
            optionChange(choresWOptions);
            goForward();
        }
    }

    render(){
        const {chores,people,group,goBack} = this.props;
        const {choresWOptions, highlightred} = this.state;

        const renderSelectOptions = people.map((_,i) => {
            return (
                <option key={people[i] + i} value={people[i]}>{people[i]}</option>
            )
        });

        const renderChoreOptions = chores.map((_,i) => {
            return (
                <div key={chores[i] + i} className={i % 2 === 0 ? "pa2 b--black-10 bg-white" : "pa2 b--black-10 bg-near-white"}>
                    <h3 className="underline">{chores[i]}</h3>
                    <div className="">Due Date</div>
                    <input onChange={this.updateDueDate} name={chores[i]} type='date' min={todaysDate()} defaultValue={choresWOptions[chores[i]].dueDate} className={/*highlightred[chores[i]].dueDate ? 'bg-red' :*/ null}></input>
                    <div className="">Assign {i > 0 ? null : "(Random, or pick who does this chore)"}</div>
                    <select onChange={this.updateAssignment} name={chores[i]} defaultValue={choresWOptions[chores[i]].assignment} className={highlightred[chores[i]].assignment ? 'pa1 db f6 lh-title bg-red' : 'pa1 db f6 lh-title'} >
                        <option value='Randomly'>Randomly</option>
                        {renderSelectOptions}
                    </select>
                    <div className="">Exemption {i > 0 ? "(Optional)" : "(Optional, selected person will not get this chore)"}</div>
                    <select onChange={this.updateExempt} name={chores[i]} defaultValue={choresWOptions[chores[i]].exempt} className={highlightred[chores[i]].exempt ? 'pa1 db f6 lh-title bg-red' : 'pa1 db f6 lh-title'} >
                        <option value='None'>None</option>
                        {renderSelectOptions}
                    </select>
                    <div className="">Description (Optional)</div>
                    <input onChange={this.updateDescription} className={highlightred[chores[i]].description ? "pa2 input-reset ba  hover-bg-near-white bg-red w-100":"pa2 input-reset ba  hover-bg-near-white w-100"} name={chores[i]} type='text' defaultValue={choresWOptions[chores[i]].description}></input>
                    
                </div>
            )
        });

        return (
            <div className='center mw6-ns br3 hidden mv4 bg-light-blue'>
                <h1 className="f4 black b mv0 pv2 ph3 tc">Edit Chores for {group}</h1>
                <div className="pa3 bt b--black-10">
                    <div className="f6 f5-ns lh-copy measure mv0">
                        <main className="black-80">
                            <div className="measure center">
                                <fieldset className="ba b--transparent ph0 mh0">
                                    <div>
                                        <ScrollBox maxHeight={575}>
                                            <div>{renderChoreOptions}</div>
                                        </ScrollBox> 
                                    </div>
                                    <div className='tc pa2 ma2'>
                                        <BackButton click={goBack}/>
                                        <NextButton click={this.onSubmit}/>
                                    </div>
                                </fieldset>
                            </div>
                        </main>
                    </div>
                </div>
            </div>
        )    
    }
     
}

export default ChoreOptions;