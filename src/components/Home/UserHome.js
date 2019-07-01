import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

class UserHome extends React.Component{
    constructor(props){
        super(props)
        this.state = {

        }
    }
    render(){
        return (
            <div>
                User Home
            </div>
        )
    }


}

export default withRouter(connect()(UserHome));