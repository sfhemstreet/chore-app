import React from 'react';
import {connect} from 'react-redux';
import { NavLink, withRouter } from 'react-router-dom';
import Logo from '../Logo/Logo.js';
import './Navigation.css';



const mapStateToProps = (state) => {
    console.log('NAV',state)
    return {
        auth: state.userAccess.auth
    }
}




const Navigation = (props) => {
    const {auth} = props;
    if(auth === 'user'){
        return(
            <nav className="db dt-l w-100 border-box pa3 ph5-l">
                <Logo />   
                <div className="db dtc-l v-mid w-100 w-75-l tc tr-l">
                    <NavLink  
                        to='/creategroup'
                        className="link dim dark-gray f6 f5-l dib mr3 mr4-l pointer">
                        Create Group
                    </NavLink>
                    <NavLink 
                        to='/groups'
                        className="link dim dark-gray f6 f5-l dib mr3 mr4-l pointer">
                        Groups
                    </NavLink>
                    <NavLink 
                        to='/signin'
                        className="link dim dark-gray f6 f5-l dib mr3 mr4-l pointer">
                        Sign Out
                    </NavLink>
                    <NavLink 
                        to='/about'
                        className="link dim dark-gray f6 f5-l dib pointer">
                        About
                    </NavLink>
                </div>
            </nav>  
        )
    }
    else{
        return(
            <nav className="db dt-l w-100 border-box pa3 ph5-l">
                <Logo />  
                <div className="db dtc-l v-mid w-100 w-75-l tc tr-l">
                    <NavLink to='/signin'
                        className="link dim dark-gray f6 f5-l dib mr3 mr4-l pointer">
                        Sign In
                    </NavLink>
                    <NavLink to='/register'
                        className="link dim dark-gray f6 f5-l dib mr3 mr4-l pointer">
                        Register
                    </NavLink>
                    <NavLink to='/about' 
                        className="link dim dark-gray f6 f5-l dib pointer">
                        About
                    </NavLink>
                </div>
            </nav>   
        )
        
    }

}

export default withRouter(connect(mapStateToProps)(Navigation));

