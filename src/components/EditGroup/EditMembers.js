import React from 'react';
import TextInput from '../form_components/TextInput';
import XButton from '../form_components/XButton';
import {uid} from 'react-uid';
import regexCheck from '../../utils/regexCheck';
import genInputKeys from '../../utils/genInputKeys';
import BackButton from '../form_components/BackButton';
import SubmitButton from '../form_components/SubmitButton';
import NextButton from '../form_components/NextButton';
import ProgressLine from '../ProgressLine/ProgressLine'
import {getEmails_Permissions} from '../../utils/addChoresHelpers';

class EditMembers extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            highlightRed : new Array(this.props.currentMembers).fill(false),
            emails : [...this.props.currentMembers],
            inputs : genInputKeys(this.props.currentMembers.length),
            step: 0,
            updated: {},
            added: {},
            removed: [],
            all: {}
        }
    }

    addPerson = () => {
        const {emails , inputs} = this.state;
        this.setState({ emails : [...emails, ''], inputs : [...inputs, uid(`newinput${emails[emails.length - 1]}`,Math.random())] });
    }
    
    deletePerson = (index) => {
        const {emails , inputs, removed, added, updated } = this.state;
        const {currentMembers} = this.props;
        let e = [...emails];
        let i = [...inputs];
        let r = [...removed];
        let a = JSON.parse(JSON.stringify(added));
        let u = JSON.parse(JSON.stringify(updated));

        // check if removing from currentMembers / check for duplicates in removed 
        if(currentMembers.includes(emails[index]) && !r.includes(emails[index]))
            r.push(emails[index]);
        // check if email is in added, remove it
        if(added[emails[index]])
            delete a[emails[index]];
        // check if email is in updated, remove it
        if(updated[emails[index]])
            delete u[emails[index]];
        // remove email from being dispalyed
        e.splice(index, 1);
        i.splice(index, 1);

        this.setState({ emails : e, inputs : i, removed: r, added: a, updated: u });
    }

    updateInfo = (newInput, index) => {
        const {emails, highlightRed} = this.state;
        let hlr = [...highlightRed];
        let newEmails = [...emails];
       
        newEmails[index] = newInput;
        this.setState({ emails : newEmails });

        if(hlr[index] && regexCheck(newInput, 'email')){
            hlr[index] = false;
            this.setState({ highlightRed : hlr });
        }
    } 

    checkInput = () => {
        const {emails, highlightRed} = this.state;
        let hlr = [...highlightRed];
        let allGood = true;

        for(let x = 0; x < emails.length; x++){
            let input = emails[x];
            if(input !== '' && input !== null && input !== undefined){
                if(!regexCheck(input, 'email')){
                    hlr[x] = true;
                    allGood = false;
                }
                // check for duplicates
                let e = [...emails];
                e.splice(x,1);
                if(e.includes(input)){
                    allGood = false;
                    hlr[x] = true;
                }
            }
            else{
                hlr[x] = true;
                allGood = false;
            }
        }
        this.setState({ highlightRed : hlr });
        if(allGood){
            this.checkPermissions();
        }
    }

    checkPermissions = () => {
        const {emails, added, removed} = this.state;
        const {groupData, currentMembers} = this.props;
        let add = {};
        let everyone = {};
        const currEmails = getEmails_Permissions(groupData);
        emails.forEach(e => {
            if(!currentMembers.includes(e)){
                add[e] = true; 
                everyone[e] = true;
            }
            else{
                everyone[e] = currEmails[e];
            }
        });
        
        this.setState({ added: add, step: 1, all: everyone });
    }

    backStep = () => {
        this.setState({ added: {}, all: {}, step: 0 });
    }

    onPermissionsChange = (event) => {
        let u = JSON.parse(JSON.stringify(this.state.updated));
        let a = JSON.parse(JSON.stringify(this.state.added));

        if(a[event.target.name] === true || a[event.target.name] === false)
            a[event.target.name] = event.target.value === 'true';
        else
            u[event.target.name] = event.target.value === 'true';
        
        this.setState({ updated: u, added: a });
    }
 
    submit = () => {
        const {added, removed, updated } = this.state;
        const {submit} = this.props;
        
        submit(removed, added, updated);
    }

    render(){
        const {highlightRed, inputs, emails, step, all} = this.state;
        const {close, userEmail} = this.props;
        
        const renderInputs = inputs.map((_,i) => {
            return (
                <div key={inputs[i]}>
                    {emails[i] === userEmail ? null 
                    :
                    <div className='pa2 mb2'>
                        <div>
                            <div className='flex'>
                                <TextInput change={this.updateInfo} index={i} red={highlightRed[i]} defaultText={emails[i]} isReadOnly={this.props.currentMembers.includes(emails[i])}/>
                                <XButton click={this.deletePerson} index={i} /> 
                            </div>
                        </div>
                    </div>}
                </div>
            )
        });

        const renderPeopleList = emails.map((_,i) => {
            return (
                <li key={uid(`cg_peoplelist${emails[i]}`, i)} className={i % 2 === 0 ? "bg-white" : "bg-near-white"}>
                    {emails[i] === userEmail ? null :
                    <div className="pa2 b--black-10 ml2 confirm_people_grid" >
                        <div className="name mt0 lh-copy tc center">{emails[i]}</div>
                        <select onChange={this.onPermissionsChange} className='permissions mt0 lh-copy tc center' name={emails[i]} defaultValue={all[emails[i]] ? 'true' : 'false'}>
                            <option value='true' >Can Add Chores to Group</option>
                            <option value='false' >Not Allowed to Add Chores</option>
                        </select>
                    </div>} 
                </li>
            )
        });

        return (
            <div className='center mw6-ns br3 hidden mv4'>
                <ProgressLine progress={step} size={3} />
                {step === 0 ? <h2 className="black  mv0 pv2 ph3 tc">Delete / Add Members - Emails </h2> : <h2 className="black  mv0 pv2 ph3 tc">Edit Permissions</h2>}
                <div className="pa3 bt b--black-10">
                    <div className="f6 f5-ns lh-copy measure mv0">
                        <div className="black-80">
                            <div className="measure center">
                                {step === 0 ? 
                                <fieldset className="ba b--transparent ph0 mh0">
                                    <div className='tc'> 
                                        {renderInputs}
                                    </div>
                                    <div className='flex center pa2'>
                                        <div className="f6 link br2 ph3 pv2 mb2 dib white bg-blue grow pointer" onClick={this.addPerson}>Add Member</div>
                                    </div>
                                    <div className='tc pa2 ma2'>
                                        <BackButton click={close}/>
                                        <NextButton click={this.checkInput} />
                                    </div>
                                </fieldset>
                                :
                                <fieldset className="ba b--transparent ph0 mh0">
                                    <div>
                                        <ul className="list pl0 ml0 mv0 mt0 center mw6 ba b--light-silver br2 ">
                                            {renderPeopleList}
                                        </ul>
                                    </div>
                                    <div className='tc pa2 ma2'>
                                        <BackButton click={this.backStep}/>
                                        <SubmitButton click={this.submit} />
                                    </div>
                                </fieldset>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default EditMembers;