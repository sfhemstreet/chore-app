import React from 'react';

const TextInput = ({placeHolderText = '', textType = '', change, nameAttribute = '' }) => {

    const onCheckValidity = (event) => {
        const text = event.target.value;
        let regex = /^[a-zA-Z0-9_.-]*$/;
        switch(textType){
            case 'plain':
                regex = /^[a-zA-Z0-9_.-]*$/;
                break;
            case 'email':
                regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                break;
            case 'password':
                regex = /^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})/;
                break;
            default:
                regex = /^[a-zA-Z0-9_.-]*$/;
        }
        const valid = text.match(regex);
        if(valid){
            change(text);
        }
        else{
            change('*ERROR*')
        }
    }

    return (
        <input name={nameAttribute} placeholder={placeHolderText} onChange={onCheckValidity} type={textType} className="pa2 input-reset ba hover-bg-near-white w-100"></input>
    ) 
} 

    
    


export default TextInput;