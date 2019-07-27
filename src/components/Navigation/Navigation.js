import React from 'react';
import {connect} from 'react-redux';
import { NavLink, withRouter } from 'react-router-dom';
import Logo from '../Logo/Logo.js';
import './Navigation.css';

const mapStateToProps = (state) => {
    return {
        auth: state.user.auth
    }
}

const Navigation = (props) => {
    const {auth} = props;
    if(auth === 'user'){
        return(
            <nav className="db dt-l w-100 border-box pa3 ph5-l bg-near-white">
                <Logo />   
                <div className="db dtc-l v-mid w-100 w-75-l tc tr-l">
                    <NavLink 
                        to='/dash'
                        className="link dim dark-gray f6 f5-l dib mr3 mr4-l pointer">
                        Chores
                    </NavLink>
                    <NavLink 
                        to='/groups'
                        className="link dim dark-gray f6 f5-l dib mr3 mr4-l pointer">
                        Groups
                    </NavLink>
                    <NavLink  
                        to='/creategroup'
                        className="link dim dark-gray f6 f5-l dib mr3 mr4-l pointer">
                        Create New Group
                    </NavLink>
                    <NavLink 
                        to='/signin'
                        className="link dim dark-gray f6 f5-l dib mr3 mr4-l pointer">
                        Sign Out
                    </NavLink>
                </div>
            </nav>  
        )
    }
    else{
        return(
            <nav className="db dt-l w-100 border-box pa3 ph5-l bg-near-white">
                <Logo />  
                <div className="db dtc-l v-mid w-100 w-75-l tc tr-l">
                    <NavLink to='/'
                        className="link dim dark-gray f6 f5-l dib mr3 mr4-l pointer">
                        Home
                    </NavLink>
                    <NavLink to='/signin'
                        className="link dim dark-gray f6 f5-l dib mr3 mr4-l pointer">
                        Sign In
                    </NavLink>
                    <NavLink to='/register'
                        className="link dim dark-gray f6 f5-l dib mr3 mr4-l pointer">
                        Register
                    </NavLink>
                </div>
            </nav>   
        )
        
    }

}

export default withRouter(connect(mapStateToProps)(Navigation));

