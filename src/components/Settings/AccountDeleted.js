import React from 'react';
import {signOut} from '../../actions/userActions';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

const AccountDeleted = ({requestSignOut}) => {
    setTimeout(() => requestSignOut(), 1500);
    return (
        <div className='tc center f3 black-90 mv3'>Account Deleted</div>
    )
}

const mapStateToProps = (state) => {
    const {settings} = state;
    return {
        isPending: settings.isPending,
        error: settings.deleteError
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        requestSignOut: () => dispatch(signOut())
    }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(AccountDeleted));