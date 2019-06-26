import React from 'react';
import Tilt from 'react-tilt';
import './Logo.css';
import logo from './logo.png';

const Logo = ({onRouteChange}) => {
    return(
        <div 
            className="db dtc-l v-mid mid-gray link dim w-100 w-25-l tc tl-l mb2 mb0-l">
            <Tilt 
                className="Tilt shadow-2  br-100 dib w2 h2 pointer" 
                options={{ max : 55 }} 
                style={{ height: 100, width: 100 }} >
                <img onClick={() => onRouteChange('home')} className=" br-100"  alt="UChore" src={logo}/> 
            </Tilt>
        </div>
    )
}

export default Logo;