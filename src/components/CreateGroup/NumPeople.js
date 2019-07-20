import React from 'react';

const NumPeople = ({numChange, goForward}) => {
    
    let num = 2;

    const numberChange = (event) => {
        num = event.target.value;
    }
    const onSubmit = (event) => {
        numChange(num);
        goForward();
    }
     //render a box that user can select number of people from. 
    return (
        <div>
            <div>Please Select number of people in group</div>
            <select onChange={numberChange}>
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
            <div className="f6 link dim br2 ph3 pv2 mb2 dib white bg-black" onClick={onSubmit}>Next</div>
        </div>
        
    )
    
}

export default NumPeople;