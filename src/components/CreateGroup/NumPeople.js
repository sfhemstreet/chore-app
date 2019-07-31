import React from 'react';
import NextButton from '../form_components/NextButton';
import regexCheck from '../../utils/regexCheck';

class NumPeople extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            highlightRed : false,
            num : this.props.numberOfPeople !== 2 ? this.props.numberOfPeople : 2,
            gName : this.props.nameOfGroup !== '' ? this.props.nameOfGroup : '',
        }
    }

    updateGroupName = (event) => {
        const {highlightRed} = this.state;
        const name = event.target.value;
        this.setState({ gName : name });
        if(highlightRed){
            if(regexCheck(name, 'special')){
                this.setState({ highlightRed : false });
            }
        }
        
    }

    numberChange = (event) => {
        const {numChange} = this.props;
        this.setState({num : event.target.value});
        numChange(event.target.value);
    }
    
    onSubmit = (event) => {
        const {groupNameChange, goForward} = this.props;
        const {gName, num} = this.state;
        if(gName !== '' && regexCheck(gName, 'special')){
            localStorage.setItem('stage', '1');
            localStorage.setItem('groupName',gName);
            localStorage.setItem('numPeople',num);
            groupNameChange(gName);
            goForward();
        }
        else{
            this.setState({ highlightRed : true});
        }
    }

    render(){
        const {highlightRed, num, gName} = this.state;
        return (
            <div className='center mw6-ns br3 hidden mv4 bg-light-blue'>
                <h2 className="f4 black b mv0 pv2 ph3 tc">Create a Group!</h2>
                <div className="pa3 bt b--black-10">
                    <div className="f6 f5-ns lh-copy measure mv0">
                        <main className="black-80">
                            <div className="measure center">
                                <fieldset className="ba b--transparent ph0 mh0">
                                    <h4 className=" black mv0 pv2 ph3 tc">Please enter the name of your new group.</h4> 
                                    <div className='tc'>
                                        <input onChange={this.updateGroupName} className={highlightRed ? "pa2 input-reset ba bg-light-red hover-bg-near-white w-50" : "pa2 input-reset ba hover-bg-near-white w-50"} defaultValue={gName} ></input>
                                    </div>
                                    <h4 className=" black mv0 pv2 ph3 tc">Select the number of people in your group.</h4>
                                    <div className="">
                                        <select onChange={this.numberChange} className='pa2 db f3 lh-title center' defaultValue={num}>
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
                                            <NextButton click={this.onSubmit} />
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

export default NumPeople;