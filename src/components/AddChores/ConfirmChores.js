import React from 'react';
import BackButton from '../form_components/BackButton';
import SubmitButton from '../form_components/SubmitButton';
import '../CreateGroup/CreateNewGroup.css';
import {uid} from 'react-uid';

const ConfirmChores = ({ chores,choreOptions,submit,goBack }) => {

    const submitGroup = () => {
        submit()
    }

    const renderChoreList = chores.map((_,i) => {
        return (
            <li key={uid(`cg_chore${chores[i]}`,i)} className={i % 2 === 0 ? "bg-white pa2" : "bg-near-white pa2"} name={chores[i]}>
                <div  className={choreOptions[chores[i]].description === '' ? "pa1 b--black-10 ml2 confirm_chores_title_grid" : "pa1 b--black-10 ml2 confirm_chores_grid "}>
                    <div className="chore underline mt0 lh-copy tc center b pa1">{chores[i]}</div>
                    <div className="due mt0 lh-copy tc center pa1 dib">Due On : <div className="due mt0 lh-copy tc center pa1 b dib">{choreOptions[chores[i]].dueDate}</div></div>
                    <div className="assign mt0 lh-copy tc center pa1 dib">Assign : <div className="due mt0 lh-copy tc center pa1 b dib">{choreOptions[chores[i]].assignment}</div></div>
                    <div className="exempt mt0 lh-copy tc center pa1 dib">Exemption : <div className="due mt0 lh-copy tc center pa1 b dib">{choreOptions[chores[i]].exempt}</div></div> 
                    {choreOptions[chores[i]].description === '' ? null : <div className="description mmt0 lh-copy b--black-10 bt tc center pa1">"{choreOptions[chores[i]].description}"</div>}
                </div>
            </li>
        )
    });

    return (
        <div className='center mw6-ns br3 hidden mv4 bg-light-blue'>
            <h1 className="f4 black b mv0 pv2 ph3 tc">Confirm New Chores</h1>
            <div className="pa3 bt b--black-10">
                <div className="f6 f5-ns lh-copy measure mv0">
                    <main className="black-80">
                        <div className="measure center">
                            <fieldset className="ba b--transparent ph0 mh0 ">
                                <div>
                                    <ul className="list pl0 ml0 mv0 mt0 mb0 pa0 center  ba b--light-silver br2 ">
                                        {renderChoreList}
                                    </ul>
                                </div>
                                <div className='tc pa2 ma2'>
                                    <BackButton click={goBack}/>
                                    <SubmitButton click={submitGroup}/>
                                </div> 
                            </fieldset>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    )      
}

export default ConfirmChores;