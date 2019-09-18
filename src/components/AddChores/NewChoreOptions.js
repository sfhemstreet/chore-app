import React from 'react';
import {todaysDate} from '../../utils/todaysDate';
import NextButton from '../form_components/NextButton';
import BackButton from '../form_components/BackButton';
import regexCheck from '../../utils/regexCheck';
import {uid} from 'react-uid';

class NewChoreOptions extends React.Component {
    constructor(props){
        super(props);
        this.state = {

        }
    }

    render(){
        const {chores,people,goBack, choresWithOptions} = this.props;
        

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
                    <div className="">Assign {i > 0 ? null : "(Random, or pick who does this chore)"}</div>
                    <select onChange={this.updateAssignment} name={chores[i]} defaultValue={choresWithOptions[chores[i]].assignment} className='pa1 db tc f6 lh-title' >
                        <option value='Randomly'>Randomly</option>
                        {renderSelectOptions}
                    </select>
                    <div className="">Exemption {i > 0 ? "(Optional)" : "(Optional, selected person will not get this chore)"}</div>
                    <select onChange={this.updateExempt} name={chores[i]} defaultValue={choresWithOptions[chores[i]].exempt} className='pa1 db tc f6 lh-title' >
                        <option value='None'>None</option>
                        {renderSelectOptions}
                    </select>
                    <div className="">Description (Optional)</div>
                    <input onChange={this.updateDescription} /*className={highlightred[chores[i]].description ? "pa2 input-reset ba  hover-bg-near-white bg-red w-100":"pa2 input-reset ba  hover-bg-near-white w-100"}*/ name={chores[i]} type='text' defaultValue={choresWithOptions[chores[i]].description}></input>    
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