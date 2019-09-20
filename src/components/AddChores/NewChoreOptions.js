import React from 'react';
import {todaysDate} from '../../utils/todaysDate';
import NextButton from '../form_components/NextButton';
import BackButton from '../form_components/BackButton';
import regexCheck from '../../utils/regexCheck';
import { makeHLRObjs } from '../../utils/choreOptionHelpers';
import {uid} from 'react-uid';

class NewChoreOptions extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            highlightred : JSON.parse(JSON.stringify(makeHLRObjs(this.props.chores)))
        }
    }

    updateDescription = (event) => {
        const { updateOptions, choresWithOptions } = this.props;
        const { highlightred } = this.state;
        
        if(regexCheck(event.target.value, 'special')){
            let c = JSON.parse(JSON.stringify(choresWithOptions));
            c[event.target.name].description = event.target.value;
            updateOptions(c);

            let hlr = JSON.parse(JSON.stringify(highlightred));
            hlr[event.target.name].description = false;
            this.setState({ highlightred : hlr });
        }
        else{
            let hlr = JSON.parse(JSON.stringify(highlightred));
            hlr[event.target.name].description = true;
            this.setState({ highlightred : hlr });
        }
    }

    updateDueDate = (event) => {
        const { choresWithOptions , updateOptions } = this.props;
        const { highlightred} = this.state;

        let c = JSON.parse(JSON.stringify(choresWithOptions));
        if(regexCheck(event.target.value, 'yyyy-mm-dd')){
            c[event.target.name].dueDate = event.target.value;
            let hlr = JSON.parse(JSON.stringify(highlightred));
            hlr[event.target.name].dueDate = false;
            updateOptions(c);
            this.setState({ highlightred : hlr});
        } 
        else{
            let hlr = JSON.parse(JSON.stringify(highlightred));
            hlr[event.target.name].dueDate = true;
            this.setState({ highlightred : hlr });
        }
    }

    updateAssignment = (event) => {
        const { choresWithOptions , updateOptions} = this.props;
        const { highlightred} = this.state;

        let c = JSON.parse(JSON.stringify(choresWithOptions));
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
        updateOptions(c);
    }

    updateExempt = (event) => {
        const { choresWithOptions , updateOptions } = this.props;
        const { highlightred } = this.state;

        let c = JSON.parse(JSON.stringify(choresWithOptions));
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
        updateOptions(c);
    }

    onSubmit = (event) => {
        const { goForward, chores, choresWithOptions, updateOptions } = this.props;
        const { highlightred } = this.state;
        // check if anything is red
        const hlr = JSON.parse(JSON.stringify(highlightred));
        let allGood = true;
        for(let x = 0; x < chores.length; x++){
            if(hlr[chores[x]].description){
                allGood = false;
                break;
            }
            if(hlr[chores[x]].dueDate){
                allGood = false;
                break;
            }
            if(hlr[chores[x]].assignment){
                allGood = false;
                break;
            }
            if(hlr[chores[x]].exempt){
                allGood = false;
                break;
            }
        }
        if(allGood){
            updateOptions(choresWithOptions);
            goForward();
        }
    }

    render(){
        const {chores,people,goBack,choresWithOptions} = this.props;
        const {highlightred} = this.state;

        const renderSelectOptions = people.map((_,i) => {
            return (
                <option key={uid(`selectOption${people[i]}`, i)} value={people[i]}>{people[i]}</option>
            )
        });

        const renderChoreOptions = chores.map((_,i) => {
            return (
                <div key={uid(`choreoption${chores[i]}`, i)} className={i % 2 === 0 ? "pa2 ma3 b--black-10 bg-white" : "pa2 ma3 b--black-10 bg-near-white"}>
                    <h3 className="underline">{chores[i]}</h3>
                    <div className="">Due Date</div>
                    <input onChange={this.updateDueDate} name={chores[i]} type='date' min={todaysDate()} defaultValue={choresWithOptions[chores[i]].dueDate} ></input>
                    <div className="pt2">Assign {i > 0 ? null : "(Random, or pick who does this chore)"}</div>
                    <select onChange={this.updateAssignment} name={chores[i]} defaultValue={choresWithOptions[chores[i]].assignment} className={highlightred[chores[i]].assignment ? 'pa1 db tc f6 lh-title bg-red' : 'pa1 db tc f6 lh-title'} >
                        <option value='Randomly'>Randomly</option>
                        {renderSelectOptions}
                    </select>
                    <div className="pt2">Exemption {i > 0 ? "(Optional)" : "(Optional, selected person will not get this chore)"}</div>
                    <select onChange={this.updateExempt} name={chores[i]} defaultValue={choresWithOptions[chores[i]].exempt} className={highlightred[chores[i]].exempt ? 'pa1 db tc f6 lh-title bg-red' : 'pa1 db tc f6 lh-title'} >
                        <option value='None'>None</option>
                        {renderSelectOptions}
                    </select>
                    <div className="pt2">Description (Optional)</div>
                    <input onChange={this.updateDescription} className={highlightred[chores[i]].description ? "pa2 input-reset ba  hover-bg-near-white bg-red w-100":"pa2 input-reset ba  hover-bg-near-white w-100"} name={chores[i]} type='text' defaultValue={choresWithOptions[chores[i]].description}></input>    
                </div>
            )
        });

        return (
            <div className='center mw6-ns br3 hidden mv4 bg-light-blue'>
                <h1 className="f4 black b mv0 pv2 ph3 tc">Edit Chores</h1>
                <div className="pa3 bt b--black-10">
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

export default NewChoreOptions;