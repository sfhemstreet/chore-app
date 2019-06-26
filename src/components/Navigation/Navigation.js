import React from 'react';
import Logo from '../Logo/Logo.js'
import './Navigation.css';

const Navigation = ({isSignedIn, onRouteChange}) => {

    if(isSignedIn){
        return(
            <nav className="db dt-l w-100 border-box pa3 ph5-l">
                <Logo />  
                <div className="db dtc-l v-mid w-100 w-75-l tc tr-l">
                    <p className="link dim dark-gray f6 f5-l dib mr3 mr4-l" >Create Group</p>
                    <p className="link dim dark-gray f6 f5-l dib mr3 mr4-l" >Groups</p>
                    <p className="link dim dark-gray f6 f5-l dib mr3 mr4-l" >Sign Out</p>
                    <p className="link dim dark-gray f6 f5-l dib"           >Contact</p>
                </div>
            </nav>  
        )
    }
    else{
        return(
            <nav className="db dt-l w-100 border-box pa3 ph5-l">
                <Logo />  
                <div className="db dtc-l v-mid w-100 w-75-l tc tr-l">
                    <p className="link dim dark-gray f6 f5-l dib mr3 mr4-l" >Sign In</p>
                    <p className="link dim dark-gray f6 f5-l dib mr3 mr4-l" >Register</p>
                    <p className="link dim dark-gray f6 f5-l dib"           >Contact</p>
                </div>
            </nav>   
        )
        
    }



}

export default Navigation;

