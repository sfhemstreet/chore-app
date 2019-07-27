import React from 'react';
import NextButton from '../form_components/NextButton';
import BackButton from '../form_components/BackButton';
import regexCheck from '../../utils/regexCheck';

const PeopleInfo = ({people,peopleChange,goForward,goBack}) => {

    console.log(people.length)

    let p = [...people];
    
    //console.log(people)

    const updateInfo = (event) => {
        if(event.target.value !== ''){
            let email = event.target.value;
            p[event.target.name] = email;
        }
    } 

    // check for valid email, duplicates, etc
    const checkInput = () => {
        let allGood = true;
        for(let x = 0; x < p.length; x++){
            let input = p[x];
            if(input !== '' && input !== null && input !== undefined){
                allGood = regexCheck(input, 'email');
                if(x > 0){
                    if(p[x - 1] === input){
                        allGood = false;
                    }
                }
            }
            else{
                allGood = false;
            }
        }
        if(allGood){
            onSubmit();
        }
    }

    const onSubmit = (event) => {

        peopleChange(p);
        goForward();
    }
    
    const renderInputs = p.map((_,i) => {
        return (
            <div key={i} className='pa2'>
                <input onChange={updateInfo} className="pa2 input-reset ba  hover-bg-near-white w-100" name={i} type="email" placeholder={'Email ' + (i + 1)} ></input>
            </div>
        )
    })
    
    return (
        <div className='center mw6-ns br3 hidden mv4 bg-transparent'>
            <h2 className="f4 black b mv0 pv2 ph3 tc">Please Enter Group Member Emails</h2>
            <div className="pa3 bt b--black-10">
                <div className="f6 f5-ns lh-copy measure mv0">
                    <main className="black-80">
                        <div className="measure center">
                            <fieldset className="ba b--transparent ph0 mh0">
                                <div className="">
                                    <div>{renderInputs}</div>
                                    <div className='tc pa2 ma2'>
                                        <BackButton click={goBack}/>
                                        <NextButton click={checkInput} />
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

export default PeopleInfo;