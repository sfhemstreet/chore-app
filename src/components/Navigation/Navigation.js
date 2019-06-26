import React from 'react';
import Logo from '../Logo/Logo.js'
import './Navigation.css';

const Navigation = ({isSignedIn, onRouteChange}) => {

    if(isSignedIn){
        return(
            <nav className="db dt-l w-100 border-box pa3 ph5-l">
                <Logo 
                    onClick={() => onRouteChange('home')}
                />   
                <div className="db dtc-l v-mid w-100 w-75-l tc tr-l">
                    <p  
                        onClick={() => onRouteChange('creategroup')} 
                        className="link dim dark-gray f6 f5-l dib mr3 mr4-l pointer">
                        Create Group
                    </p>
                    <p 
                        onClick={() => onRouteChange('groups')} 
                        className="link dim dark-gray f6 f5-l dib mr3 mr4-l pointer">
                        Groups
                    </p>
                    <p 
                        onClick={() => onRouteChange('signout')} 
                        className="link dim dark-gray f6 f5-l dib mr3 mr4-l pointer">
                        Sign Out
                    </p>
                    <p 
                        onClick={() => onRouteChange('contact')} 
                        className="link dim dark-gray f6 f5-l dib pointer">
                        Contact
                    </p>
                </div>
            </nav>  
        )
    }
    else{
        return(
            <nav className="db dt-l w-100 border-box pa3 ph5-l">
                <Logo 
                    onClick={() => onRouteChange('home')}
                />  
                <div className="db dtc-l v-mid w-100 w-75-l tc tr-l">
                    <p 
                        onClick={() => onRouteChange('signin')} 
                        className="link dim dark-gray f6 f5-l dib mr3 mr4-l pointer">
                        Sign In
                    </p>
                    <p 
                        onClick={() => onRouteChange('register')} 
                        className="link dim dark-gray f6 f5-l dib mr3 mr4-l pointer">
                        Register
                    </p>
                    <p 
                        onClick={() => onRouteChange('contact')} 
                        className="link dim dark-gray f6 f5-l dib pointer">
                        Contact
                    </p>
                </div>
            </nav>   
        )
        
    }

}

export default Navigation;

