import React from 'react';
import NextButton from '../form_components/NextButton';
import BackButton from '../form_components/BackButton';
import regexCheck from '../../utils/regexCheck';

class PeopleInfo extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            highlightRed : new Array(this.props.people.length).fill(false),
            emails : [...this.props.people],
            inputs : [...this.props.people]
        }
    }

    componentDidMount(){
        const {emails} = this.state;
        if(localStorage.getItem('people') === null){
            localStorage.setItem('people',[...emails]);
        }
    }
    
    updateInfo = (event) => {
        const {emails, highlightRed} = this.state;
        let newHighlightRed = [...highlightRed];
        const email = event.target.value;
        let newEmails = [...emails];

        newEmails[Number(event.target.name)] = email;
        this.setState({ emails : newEmails });

        if(newHighlightRed[Number(event.target.name)]){
            if(regexCheck(email, 'email')){
                let localP = localStorage.getItem('people').split(',');
                localP[Number(event.target.name)] = email;
                localStorage.setItem('people', [...localP]);
                newHighlightRed[Number(event.target.name)] = false;
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
                if(x > 0){
                    if(emails[x - 1] === input){
                        newHighlightRed[x] = true;
                        allGood = false;
                    }
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

    onSubmit = (event) => {
        const {emails} = this.state;
        const {peopleChange,goForward} = this.props;
        localStorage.setItem('stage', '2');
        localStorage.setItem('people',[...emails]);
        peopleChange(emails);
        goForward();
    }
    
    render(){
        const {highlightRed, inputs} = this.state;
        const renderInputs = inputs.map((_,i) => {
            return (
                <div key={inputs[i] + i} className='pa2'>
                    Email {(i + 1)}
                    <input onChange={this.updateInfo} className={highlightRed[i] ? "pa2 input-reset ba bg-light-red hover-bg-near-white w-100" : "pa2 input-reset ba hover-bg-near-white w-100"} name={i} type="email" defaultValue={inputs[i]}></input>
                </div>
            )
        })
        const {goBack} = this.props;
        return (
            <div className='center mw6-ns br3 hidden mv4 bg-light-blue'>
                <h2 className=" black  mv0 pv2 ph3 tc">Please Enter Group Member Emails</h2>
                <div className="pa3 bt b--black-10">
                    <div className="f6 f5-ns lh-copy measure mv0">
                        <main className="black-80">
                            <div className="measure center">
                                <fieldset className="ba b--transparent ph0 mh0">
                                    <div className="">
                                        <div>{renderInputs}</div>
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

export default PeopleInfo;