import React from 'react';
import { NavLink } from 'react-router-dom'
import Tilt from 'react-tilt';
import './Logo.css';
import logo from './logo.png';
import {connect} from 'react-redux';

const mapStateToProps = (state) => {
    return {
        auth: state.userAccess.auth
    }
}

const Logo = (props) => {
    return(
        <div className="db dtc-l v-mid mid-gray link w-100 w-25-l tc tl-l mb2 mb0-l">
            <Tilt 
                className="Tilt shadow-2  br-100 dib w2 h2 pointer" 
                options={{ max : 55 }} 
                style={{ height: 100, width: 100 }} >
                {
                    props.auth === 'user' ?
                    <NavLink to='/home' >
                    <img className=" br-100"  alt="UChore" src={logo}/> 
                    </ NavLink>
                    :
                    <NavLink to='/' >
                    <img className=" br-100"  alt="UChore" src={logo}/> 
                    </ NavLink>
                }
            </Tilt>
        </div>
    )
}

export default connect(mapStateToProps)(Logo);