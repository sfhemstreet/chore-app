import React from 'react';
import ScrollBox from '../ScrollBox';

const NumberBox = ({change}) => {

    return(
        
        <select onChange={change} className='list pl0 ml0 mv0 mt0 center mw2 ba b--light-silver br2 '>
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
        
    )
}

export default NumberBox;