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
            <input 
                onChange={this.onTextChange} 
                className={this.props.red ? "pa2 input-reset ba bg-light-red bg-animate hover-bg-washed-green w-100" : "pa2 input-reset ba bg-animate hover-bg-washed-green w-100"} 
                type={this.props.type || 'email'} 
                defaultValue={this.state.text} 
                readOnly={this.props.isReadOnly ? true : false}
            />
        )
    } 
} 

export default TextInput;