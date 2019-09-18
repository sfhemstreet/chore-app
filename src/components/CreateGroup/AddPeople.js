import React from 'react';
import NextButton from '../form_components/NextButton';
import BackButton from '../form_components/BackButton';
import regexCheck from '../../utils/regexCheck';
import TextInput from '../form_components/TextInput';
import XButton from '../form_components/XButton';
import {uid} from 'react-uid';
import genInputKeys from '../../utils/genInputKeys';

class AddPeople extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            highlightRed : new Array(this.props.people).fill(false),
            emails : [...this.props.people],
            inputs : genInputKeys(this.props.people.length)
        }
    }

    componentDidMount(){
        const {emails} = this.state;
        if(localStorage.getItem('people') === null){
            localStorage.setItem('people',[...emails]);
        }
    }

    addPerson = () => {
        const {emails , inputs} = this.state;
        let e = [...emails];
        let i = [...inputs];
        // create new entry in array
        e.push('');
        // create new random ID for a react key 
        i.push(uid(`NEWinput${e[e.length - 1]}`,Math.random()));
        this.setState({ emails : e, inputs : i });
    }
    
    deletePerson = (index) => {
        const {emails , inputs} = this.state;
        let e = [...emails];
        let i = [...inputs];
        // get rid of person
        e.splice(index, 1);
        i.splice(index, 1);
        this.setState({ emails : e, inputs : i });
        // delete this person from local storage
        if(localStorage.getItem('people') !== null){
            let p = localStorage.getItem('people').split(',');
            p.splice(p.indexOf(e[index]),1);
            localStorage.setItem('people', p); 
        }
    }

    updateInfo = (newInput, index) => {
        const {emails, highlightRed} = this.state;
        let newHighlightRed = [...highlightRed];
        let newEmails = [...emails];
       
        newEmails[index] = newInput;
        this.setState({ emails : newEmails });

        if(newHighlightRed[index]){
            if(regexCheck(newInput, 'email')){
                let localP = localStorage.getItem('people').split(',');
                localP[index] = newInput;
                localStorage.setItem('people', [...localP]);
                newHighlightRed[index] = false;
                this.setState({ highlightRed : newHighlightRed });
            }
        }
    } 

    checkInput = () => {
        const {emails, highlightRed} = this.state;
        let newHighlightRed = [...highlightRed];
        let allGood = true;
        for(let x = 0; x < emails.length; x++){
            let input = emails[x];
            if(input !== '' && input !== null && input !== undefined){
                if(!regexCheck(input, 'email')){
                    newHighlightRed[x] = true;
                    allGood = false;
                }
                // check for duplicates
                let e = [...emails];
                e.splice(x,1);
                if(e.includes(input)){
                    allGood = false;
                    newHighlightRed[x] = true;
                }
            }
            else{
                newHighlightRed[x] = true;
                allGood = false;
            }
        }
        this.setState({ highlightRed : newHighlightRed });
        if(allGood){
            this.onSubmit();
        }
    }

    onSubmit = () => {
        const {emails, num} = this.state;
        const {peopleChange,goForward} = this.props;
        // set local storage
        localStorage.setItem('stage', '2');
        localStorage.setItem('people',[...emails]);
        localStorage.setItem('numPeople',num);
        // send emails to parent go to next step
        peopleChange(emails);
        goForward();
    }
    
    render(){
        const {highlightRed, inputs, emails} = this.state;
        const {goBack} = this.props;
        console.log('render emails', emails);

        const renderInputs = inputs.map((_,i) => {
            return (
                <div key={inputs[i]}>{i === 0 ? null 
                    :
                <div className='pa2'>
                    <div>Email {i}
                        <div className='flex'>
                            <TextInput change={this.updateInfo} index={i} red={highlightRed[i]} defaultText={emails[i]} />
                            {i === 1 ? null : <XButton click={this.deletePerson} index={i} />}   
                        </div>
                    </div>
                </div>
                }</div>
            )
        })
       
        return (
            <div className='center mw6-ns br3 hidden mv4 bg-light-blue'>
                <h2 className=" black  mv0 pv2 ph3 tc">Please Enter Other Group Member Emails</h2>
                <div className="pa3 bt b--black-10">
                    <div className="f6 f5-ns lh-copy measure mv0">
                        <main className="black-80">
                            <div className="measure center">
                                <fieldset className="ba b--transparent ph0 mh0">
                                    <div className="">
                                        <div>
                                        {renderInputs}
                                        </div>
                                        <div className='flex center pa2'>
                                            <div className="f6 link br2 ph3 pv2 mb2 dib white bg-blue grow pointer" onClick={this.addPerson}>Add Person</div>
                                        </div>
                                        <div className='tc pa2 ma2'>
                                            <BackButton click={goBack}/>
                                            <NextButton click={this.checkInput} />
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
    
    
}

export default AddPeople;