import React from 'react';
import NextButton from '../form_components/NextButton';
import BackButton from '../form_components/BackButton';
import AddButton from '../form_components/AddButton';
import ChoreSelectBox from '../form_components/ChoreSelectBox';
import {CHORE_LIST} from '../../constants/chore_constants';
import regexCheck from '../../utils/regexCheck';

class ChoreSelection extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			customChore: '',
			selectedChores : [],
			allChores : CHORE_LIST,
		}
	}

	editCustomChore = (event) => {
		this.setState({customChore : event.target.value})
	}

	addCustomChore = (event) => {
		if(this.state.customChore !== ''){
			if(regexCheck(this.state.customChore, 'plain')){
				let sc = [...this.state.selectedChores];
				sc.unshift(this.state.customChore);
				this.setState({selectedChores : sc, customChore : ''});
				document.getElementById('customChoreInput').value = '';
			}
		}
	}

	addChore = (chore) => {
		let sc = [...this.state.selectedChores];
		sc.unshift(chore);
		this.setState({selectedChores : sc});
		this.removeFromAllChores(chore);
	}

	removeChore = (chore) => {
		let sc = [...this.state.selectedChores];
		sc.splice(sc.indexOf(chore),1);
		this.setState({selectedChores : sc});
		this.addBackToAllChore(chore)
	}

	removeFromAllChores = (chore) => {
		let ac = [...this.state.allChores];
		ac.splice(ac.indexOf(chore),1);
		this.setState({allChores : ac});
	}

	addBackToAllChore = (chore) => {
		let ac = [...this.state.allChores];
		ac.unshift(chore);
		this.setState({allChores : ac});
	}

	onSubmitSelectedChores = () => {
		this.props.choreChange(this.state.selectedChores)
		this.props.goForward();
	}

	render() {
		
		return (
			<div className='center mw6-ns br3 hidden mv4 bg-transparent'>
				<h1 className="f4 black b mv0 pv2 ph3 tc">Select Chores</h1>
				<div className="pa3 bt b--black-10">
                	<div className="f6 f5-ns lh-copy measure mv0">
                    	<main className="black-80">
							<div className="measure center">
								<fieldset className="ba b--transparent ph0 mh0">
									<div className='flex '>
										<div  className="pa2">
											<h4 className="f4 black b mv0 pv2 ph3 tc">Click a chore to add it to your list</h4>
											<ChoreSelectBox click={this.addChore} items={this.state.allChores} userChores={false}/>
										</div>
										<div className='pa2'>
											<h4 className='f4 black b mv0 pv2 ph3 tc'>Chores you select go here!</h4>
											<ChoreSelectBox click={this.removeChore} items={this.state.selectedChores} userChores={true}/>
										</div>
									</div>
									<div className='tc pa2 ma2'>
										<input id="customChoreInput" onChange={this.editCustomChore} placeholder='Enter your own chore here' className="pa2 input-reset ba  hover-bg-near-white w-50"/> 
										<AddButton click={this.addCustomChore} />
									</div>
									<div className='tc pa2 ma2'>
										<BackButton click={this.props.goBack}/>
										{this.state.selectedChores.length > 0 ? <NextButton click={this.onSubmitSelectedChores}/> : null }
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

export default ChoreSelection;