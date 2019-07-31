import React from 'react';
import NextButton from '../form_components/NextButton';
import BackButton from '../form_components/BackButton';
import regexCheck from '../../utils/regexCheck';

const ChoreOptions = ({chores,people,group,choresWithOptions,optionChange,goForward,goBack}) => {

    // set min day to current day
    const now = new Date()
    let month = now.getMonth() + 1;
    if(month < 10){
      month = '0' + month;
    }
    const todaysDate = now.getFullYear() + '-' + month + '-' + now.getDate();

    // deep copy choresWithOptions obj
    let choresWOptions = JSON.parse(JSON.stringify(choresWithOptions));
    // chore obj to fill array
    var choreObj = {
        dueDate : todaysDate,
        assignment : 'random',
        description : '',
        exempt : 'none'
    }
    
    //check for out of date chores and delete them
    let chorelist = Object.keys(choresWOptions);
    for(let x = 0; x < chorelist.length; x++){
        if(!chores.includes(chorelist[x])){
            delete choresWOptions[chorelist[x]];
        }
    }
    //check to see if chore is new, if new make it a choreObj
    for(let x = 0; x < chores.length; x++){
        if(!choresWOptions[chores[x]]){
            choresWOptions[chores[x]] = JSON.parse(JSON.stringify(choreObj));
        }
    }
    
    const updateDescription = (event) => {
        if(regexCheck(event.target.value, 'special')){
            choresWOptions[event.target.name].description = event.target.value;
            localStorage.setItem('choresWithOptions', JSON.stringify(choresWOptions));
            optionChange(choresWOptions);
        }
    }

    const updateDueDate = (event) => {
        if(regexCheck(event.target.value, 'yyyy-mm-dd')){
            console.log('date', event.target.value, event.target.name)
            choresWOptions[event.target.name].dueDate = event.target.value;
            localStorage.setItem('choresWithOptions', JSON.stringify(choresWOptions));
            optionChange(choresWOptions);
        } 
    }

    const updateAssignment = (event) => {
        choresWOptions[event.target.name].assignment = event.target.value;
        localStorage.setItem('choresWithOptions', JSON.stringify(choresWOptions));
        optionChange(choresWOptions);
    }

    const updateExempt = (event) => {
        choresWOptions[event.target.name].exempt = event.target.value;
        localStorage.setItem('choresWithOptions', JSON.stringify(choresWOptions));
        optionChange(choresWOptions);
    }

    const onSubmit = (event) => {
        localStorage.setItem('choresWithOptions', JSON.stringify(choresWOptions));
        optionChange(choresWOptions);
        goForward();
    }

    const renderSelectOptions = people.map((_,i) => {
        return (
            <option key={people[i] + i} value={people[i]}>{people[i]}</option>
        )
    });

    const renderChoreOptions = chores.map((_,i) => {
        return (
            <div key={chores[i] + i} className={i === 0 ? "pa2 b--black-10" : "pa2 bt b--black-10"}>
                <h3 className="">{chores[i]}</h3>
                <div className="">Due Date</div>
                <input onChange={updateDueDate} name={chores[i]} type='date' min={todaysDate} defaultValue={choresWOptions[chores[i]].dueDate}></input>
                <div className="">Assign {i > 0 ? null : "(Random, or pick who does this chore)"}</div>
                <select onChange={updateAssignment} name={chores[i]} defaultValue={choresWOptions[chores[i]].assignment} className='pa1 db f6 lh-title' >
                    <option value='random'>Random</option>
                    {renderSelectOptions}
                </select>
                <div className="">Description (Optional)</div>
                <input onChange={updateDescription} className="pa2 input-reset ba  hover-bg-near-white w-100" name={chores[i]} type='text' defaultValue={choresWOptions[chores[i]].description}></input>
                <div className="">Exempt {i > 0 ? "(Optional)" : "(Optional, excludes selected person from this chore)"}</div>
                <select onChange={updateExempt} name={chores[i]} defaultValue={choresWOptions[chores[i]].exempt} className='pa1 db f6 lh-title' >
                    <option value='none'>None</option>
                    {renderSelectOptions}
                </select>
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
                                    <div>{renderChoreOptions}</div>
                                </div>
                                <div className='tc pa2 ma2'>
                                    <BackButton click={goBack}/>
                                    <NextButton click={onSubmit}/>
                                </div>
                            </fieldset>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    ) 
}

export default ChoreOptions;