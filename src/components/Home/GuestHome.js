import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

class GuestHome extends React.Component{
    constructor(props){
        super(props)
        this.state = {

        }
    }
    render(){
        return (
            <div>
                Guest Home
            </div>
        )
    }


}

export default withRouter(connect()(GuestHome));