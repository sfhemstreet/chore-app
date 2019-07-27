import React from 'react';
import './ProgressLine.css';

const ProgressLine = ({progress}) => {
    

    let p = new Array(9);
    for(let x = 0; x < p.length; x++){
        if((progress * 2) > x){
            p[x] = true;
        }
        else if((progress * 2) === x){
            p[x] = 'onStep';
        }
        else{
            p[x] = false;
        }
    }

    const renderLine = p.map((_,stage) => {
        if(stage % 2 === 0){
            if(p[stage] === 'onStep'){
                return (
                    <div key={stage} className='onStep'/>
                )
            }
            if(p[stage] === true){
                return (
                    <div key={stage} className='step'/>
                )
            }
            else{
                return (
                    <div key={stage} className='incompleteStep' />
                )
            }
            
        }
        return (
            <div key={stage} className='line' />
        )    
    })

    return (
        <div className='flex center line_container items-center justify-between'>
            {renderLine} 
        </div>
       
    )
}

export default ProgressLine;