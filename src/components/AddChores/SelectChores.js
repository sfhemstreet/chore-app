import React from 'react';
import ChoreSelectBox from '../form_components/ChoreSelectBox';
import AddButton from '../form_components/AddButton';
import NextButton from '../form_components/NextButton';
import regexCheck from '../../utils/regexCheck';
import {CHORE_LIST} from '../../constants/chore_constants';

class SelectChores extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            customChore: '',
			selectedChores : [...this.props.chores],
			allChores : [...CHORE_LIST],
        }
    }

    editCustomChore = (event) => {
		this.setState({ customChore : event.target.value })
    }
    
    addCustomChore = () => {
		if(regexCheck(this.state.customChore, 'plain') && this.state.customChore !== ''){
            this.setState({ selectedChores : [this.state.customChore, ...this.state.selectedChores], customChore : '' });
            document.getElementById('customChoreInput').value = '';
		}
    }

    addChore = (chore) => {
		this.setState({ selectedChores : [chore, ...this.state.selectedChores] });
	}

	removeChore = (chore) => {
        let sc = [...this.state.selectedChores];
        sc.splice(sc.indexOf(chore),1)
		this.setState({ selectedChores : sc });
	}

	onSubmitSelectedChores = () => {
		this.props.choreChange(this.state.selectedChores)
		this.props.goForward();
	}


    render(){
        const {selectedChores, allChores} = this.state;
        const renderedSelectableChores = allChores.filter(chore => !selectedChores.includes(chore));

        return (
            <div className="measure center">
                <fieldset className="ba b--transparent ph0 mh0">
                    <div className='flex '>
                        <div  className="pa2">
                            <h4 className=" black  mv0 pv2 ph3 tc">Click a chore to add it to your list</h4>
                            <ChoreSelectBox click={this.addChore} items={renderedSelectableChores} userChores={false}/>
                        </div>
                        <div className='pa2'>
                            <h4 className=' black  mv0 pv2 ph3 tc'>Chores you select go here!</h4>
                            <ChoreSelectBox click={this.removeChore} items={this.state.selectedChores} userChores={true}/>
                        </div>
                    </div>
                    <div className='tc pa2 ma2'>
                        <input id="customChoreInput" onChange={this.editCustomChore} placeholder='Enter your own chore here' className="pa2 input-reset ba  hover-bg-near-white w-50"/> 
                        <AddButton click={this.addCustomChore} />
                    </div>
                    <div className='tc pa2 ma2'>
                        {this.state.selectedChores.length > 0 ? <NextButton click={this.onSubmitSelectedChores}/> : null }
                    </div>
                </fieldset>
            </div>
        )
    }
}

export default SelectChores;