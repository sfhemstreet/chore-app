import React from 'react';
import NextButton from '../form_components/NextButton';
import regexCheck from '../../utils/regexCheck';

const NumPeople = ({groupNameChange, numChange, goForward}) => {
    
    let num = 2;
    let gName = '';

    const updateGroupName = (event) => {
        const name = event.target.value;
        gName = name;
    }

    const numberChange = (event) => {
        num = event.target.value;
    }
    const onSubmit = (event) => {
        if(gName !== '' && regexCheck(gName, 'special')){
            numChange(num);
            groupNameChange(gName);
            goForward();
        }
    }
     //render a box that user can select number of people from. 
    return (
        <div className='center mw6-ns br3 hidden mv4 bg-transparent'>
            <h2 className="f4 black b mv0 pv2 ph3 tc">Create a Group!</h2>
            <div className="pa3 bt b--black-10">
                <div className="f6 f5-ns lh-copy measure mv0">
                    <main className="black-80">
                        <div className="measure center">
                            <fieldset className="ba b--transparent ph0 mh0">
                                <h2 className="f4 black b mv0 pv2 ph3 tc">Please enter the name of your new group.</h2> 
                                <div className='tc'>
                                    <input onChange={updateGroupName} className="pa2 input-reset ba  hover-bg-near-white w-50 " ></input>
                                </div>
                                <h2 className="f4 black b mv0 pv2 ph3 tc">Select the number of people in your group.</h2>
                                <div className="">
                                    <select onChange={numberChange} className='pa2 db f3 lh-title center'>
                                        <option value='2' >2</option>
                                        <option value='3' >3</option>
                                        <option value='4' >4</option>
                                        <option value='5' >5</option>
                                        <option value='6' >6</option>
                                        <option value='7' >7</option>
                                        <option value='8' >8</option>
                                        <option value='9' >9</option>
                                        <option value='10'>10</option>
                                    </select>
                                    <div className='tc pa2'>
                                        <NextButton click={onSubmit} />
                                    </div>
                                </div>
                            </fieldset>
                        </div>
                    </main>
                </div>
            </div> 
        </div>  
    )
    
}

export default NumPeople;