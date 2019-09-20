import React from 'react';
import BackButton from '../form_components/BackButton';
import SubmitButton from '../form_components/SubmitButton';
import './CreateNewGroup.css';
import {uid} from 'react-uid';

const NewGroupConfirm = ({chores,choreOptions,people,group,submit,goBack}) => {
    
    localStorage.setItem('confirmChoreGroup','true');
    
    let p = {};
    people.forEach(person => {
        p[person] = true;
    });

    const onPermissionsChange = (event) => {
        p[event.target.name] = event.target.value === 'true';
    }

    const submitGroup = () => {
        submit(p)
    }

    const renderPeopleList = people.map((_,i) => {
        return (
            <li key={uid(`cg_peoplelist${people[i]}`, i)} className={i % 2 === 0 ? "bg-white" : "bg-near-white"}>
                <div className="pa2 b--black-10 ml2 confirm_people_grid" >
                    <div className="name mt0 lh-copy tc center">{people[i]}</div>
                    {i === 0 ? 
                    <div className='permissions mt0 lh-copy tc center'>Admin</div>
                    :
                    <select onChange={onPermissionsChange} className='permissions mt0 lh-copy tc center' name={people[i]}>
                        <option value='true' >Can Add Chores to Group</option>
                        <option value='false' >Not Allowed to Add Chores</option>
                    </select>}
                </div>
            </li>
        )
    });

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
            <h1 className="f4 black b mv0 pv2 ph3 tc">Confirm New Group - {group}</h1>
            <div className="pa3 bt b--black-10">
                <div className="f6 f5-ns lh-copy measure mv0">
                    <main className="black-80">
                        <div className="measure center">
                            <fieldset className="ba b--transparent ph0 mh0">
                                <div>
                                    <h4 className=' black  mv0 pv2 ph3 tc'>Emails / Permissions of Group Members</h4>
                                    <ul className="list pl0 ml0 mv0 mt0 center mw6 ba b--light-silver br2 ">
                                        {renderPeopleList}
                                    </ul>
                                </div>
                            </fieldset>
                            <fieldset className="ba b--transparent ph0 mh0 ">
                                <div>
                                    <h4 className=' black  mv0 pv2 ph3 tc bt b--black-10 pa3'>Chores</h4>
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

export default NewGroupConfirm;