import React from 'react';
import ScrollBox from '../ScrollBox.js';
import MyGroups from './MyGroups.js';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';


class Groups extends React.Component {
    

    render(){
        return(
            <div>
                GROUPS PAGE
                {/*
                <ScrollBox>
                    <MyGroups 
                        groups={this.props.groups}
                    />
                </ScrollBox>
                */}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    const {user} = state;
    return {
      auth: user.auth,
      username: user.username,
      email: user.email,
      chores: user.chores,
      groups: user.groups,
      createdGroups: user.createdGroups,
      createdBy_Email: user.created_by_email,
      score: user.score,
      error: user.error
    }
}

export default withRouter(connect(mapStateToProps)(Groups));