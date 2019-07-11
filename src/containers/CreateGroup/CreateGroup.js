import React from 'react';


class CreateGroup extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            people: [],
            chores: [],
            stage: 0,
        }
    }

    render(){
        return(
            <div>
                Create Group
            </div>
        )
    }



}

export default CreateGroup;