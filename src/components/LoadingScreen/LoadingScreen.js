import React from 'react';
import orbs from '../../images/loadingOrbs.gif';

const LoadingScreen = () => {
    return (
        <div className='flex justify-center'>
            <img src={orbs} alt='Loading screen animation' /> 
        </div>
    )
}

export default LoadingScreen;