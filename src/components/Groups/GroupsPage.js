import React from 'react';
import MyGroups from './MyGroups.js';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';


class GroupsPage extends React.Component {
    

    render(){
        return(
            <div>
                GROUPS PAGE
                {/* 
                    Object.keys(this.props.createdGroups).length > 0 ?
                    (<ScrollBox>
                        <MyCreatedGroups 
                            createdGroups={this.props.createdGroups}
                        />
                    </ScrollBox>) 
                    : (null)
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
      groups: user.groups,
      createdGroups: user.createdGroups,
      score: user.score,
      error: user.error
    }
}

export default withRouter(connect(mapStateToProps)(GroupsPage));