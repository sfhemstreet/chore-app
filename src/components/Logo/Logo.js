import React from 'react';
import Tilt from 'react-tilt';
import './Logo.css';
//import logo from './logo.png';

const Logo = () => {
    return(
        <div 
            className="db dtc-l v-mid mid-gray link dim w-100 w-25-l tc tl-l mb2 mb0-l">
            <Tilt 
                className="Tilt shadow-2" 
                options={{ max : 55 }} 
                style={{ height: 150, width: 150 }} >
                
                <div className="Tilt-inner pa3"> 
                    <img className="dib w2 h2 br-100" alt="UChore" src=''/> 
                </div>
            </Tilt>
        </div>
    )
}

export default Logo;