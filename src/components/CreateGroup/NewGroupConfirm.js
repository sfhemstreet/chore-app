import React from 'react';
import BackButton from '../form_components/BackButton';
import SubmitButton from '../form_components/SubmitButton';

const NewGroupConfirm = ({chores,choreOptions,people,group,submit,goBack}) => {

    const onPermissionsChange = (event) => {

    }

    const renderPeopleList = people.map((_,i) => {
        return (
            <div key={people[i] + i}>
                <div className={i === 0 ? "pa2 b--black-10" : "pa2 bt b--black-10"}>
                    <h3 className="mb1">{people[i]}</h3>
                    <div className="">Permissions:
                        <select onChange={onPermissionsChange} className='pa1 db f6 lh-title' >
                            <option value='true' >Can Add Chores to Group</option>
                            <option value='false' >Not Allowed to Add Chores to Group</option>
                        </select>
                    </div>
                </div>
            </div>
        )
    });
    
    const renderChoreList = chores.map((_,i) => {
        return (
            <div key={chores[i] + i}>
                <div  className={i === 0 ? "pa2 b--black-10" : "pa2 bt b--black-10"}>
                    <h3 className="">{chores[i]}</h3>
                    <div className="">Due Date - {choreOptions[chores[i]].dueDate}</div>
                    <div className="">Assign {choreOptions[chores[i]].assignment}</div>
                    {choreOptions[chores[i]].description === '' ? null : <div className="">Description - {choreOptions[chores[i]].description}</div>}
                    <div className="">Exempt - {choreOptions[chores[i]].exempt}</div>
                </div>
            </div>
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
                                    <h4 className=' black  mv0 pv2 ph3 tc'>Emails of Group Members</h4>
                                    <div>{renderPeopleList}</div>
                                </div>
                            </fieldset>
                            <fieldset className="ba b--transparent ph0 mh0 ">
                                <div>
                                    <h4 className=' black  mv0 pv2 ph3 tc bt b--black-10 pa3'>Chores</h4>
                                    <div>{renderChoreList}</div>
                                </div>
                                <div className='tc pa2 ma2'>
                                    <BackButton click={goBack}/>
                                    <SubmitButton click={submit}/>
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