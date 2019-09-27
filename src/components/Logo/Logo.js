import React from 'react';
import { NavLink } from 'react-router-dom'

import './Logo.css';
import logo from './logo.png';
import {connect} from 'react-redux';

const mapStateToProps = (state) => {
    return {
        auth: state.user.auth
    }
}

const Logo = (props) => {
    return(
        <div className="db dtc-l v-mid mid-gray link w-100 w-25-l tc tl-l mb2 mb0-l">
            <div 
                className="center grow dib w2 h2 pointer" 
                style={{ height: 50, width: 100 }} >
                {
                    props.auth === 'user' ?
                    <NavLink to='/dash' >
                    <img className=" br1 center "  alt="UChore" src={logo}/> 
                    </ NavLink>
                    :
                    <NavLink to='/' >
                    <img className=" br1 center "  alt="UChore" src={logo}/> 
                    </ NavLink>
                }
            </div>
        </div>
    )
}

export default connect(mapStateToProps)(Logo);