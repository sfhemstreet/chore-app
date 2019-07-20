import React from 'react';

const PeopleInfo = ({people,peopleChange,goForward,goBack}) => {

    let p = [...people];
    console.log(people)
    const updateInfo = (index) => {
        let email = document.getElementById('person' + index).value;
        p[index] = email;
    } 

    const onSubmit = (event) => {
        peopleChange(p);
        goForward();
    }
    
    const renderInputs = p.map((_,i) => {
        return (
            <div key={i}>
                <input id={'person' + i} type='email' placeholder={'Email ' + (i + 1)} onChange={() => updateInfo(i)}></input>
            </div>
        )
    })
    
    return (
        <div>
            <h4>Please Enter Every Group Members Email</h4>
            <div>{renderInputs}</div>
            <div className="f6 link dim br2 ph3 pv2 mb2 dib white bg-black" onClick={goBack}>Back</div>
            <div className="f6 link dim br2 ph3 pv2 mb2 dib white bg-black" onClick={onSubmit}>Next</div>
        </div>
       
    )
    
}

export default PeopleInfo;