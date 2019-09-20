import React from 'react';

class TextInput extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            text : this.props.defaultText,
        }
    }

    onTextChange = (event) => {
        const input = event.target.value;
        this.setState({text : input});
        this.props.change(input, this.props.index);
    }
    
    render(){
        return (
            <input onChange={this.onTextChange} className={this.props.red ? "pa2 input-reset ba bg-light-red hover-bg-near-white w-100" : "pa2 input-reset ba hover-bg-near-white w-100"} type="email" defaultValue={this.state.text} readOnly={this.props.isReadOnly ? true : false}></input>
        )
    }
    
        
  
} 

    
    


export default TextInput;