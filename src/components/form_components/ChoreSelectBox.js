import React from 'react';
import ScrollBox from '../ScrollBox';

const ChoreSelectBox = ({items, click, userChores}) => {

    const itemSelected = (item) => {
        
        console.log(item)
        click(item);
    }

    const renderItems = items.map((_,i) => {
        return(
            <li key={i} className={(i % 2) === 0 ? 'bg-white  pointer' : 'bg-near-white pointer'} onClick={() => itemSelected(items[i])}  >
                <div className="pa1 grow underline-hover">
                    {userChores === true ? <div className='center pa1 b hover-red tc' >{items[i]}</div>  : <div className='center pa1 b hover-blue tc' >{items[i]}</div>}
                </div>
            </li> 
        )
    });

    return (
        <ul className="list pl0 ml0 mv0 mt0 center mw5 ba b--light-silver br2 ">
            <ScrollBox maxHeight={'315'}>
                {renderItems}
            </ScrollBox>
        </ul>
    )

}

export default ChoreSelectBox;