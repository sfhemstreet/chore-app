import React from 'react';
import NextButton from '../form_components/NextButton';
import regexCheck from '../../utils/regexCheck';

class GroupName extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            highlightRed : false,
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
    
    onSubmit = (event) => {
        const {groupNameChange, goForward} = this.props;
        const {gName} = this.state;
        if(gName !== '' && regexCheck(gName, 'special')){
            localStorage.setItem('stage', '1');
            localStorage.setItem('groupName',gName);
            groupNameChange(gName);
            goForward();
        }
        else{
            this.setState({ highlightRed : true});
        }
    }

    render(){
        const {highlightRed, gName} = this.state;
        return (
            <div className='center mw6-ns br3 hidden mv4'>
                <h2 className="f4 black b mv0 pv2 ph3 tc">Create a Group!</h2>
                <div className="pa3 bt b--black-10">
                    <div className="f6 f5-ns lh-copy measure mv0">
                        <main className="black-80">
                            <div className="measure center">
                                <fieldset className="ba b--transparent ph0 mh0">
                                    <h4 className="black mv0 pv2 ph3 tc">Please enter the name of your new group.</h4> 
                                    <div className='tc'>
                                        <input onChange={this.updateGroupName} className={highlightRed ? "pa2 input-reset ba bg-light-red hover-bg-near-white w-50" : "pa2 input-reset ba hover-bg-near-white w-50"} defaultValue={gName} ></input>
                                    </div>
                                    <div className="">
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

export default GroupName;