import React, { CSSProperties } from 'react';
import Icon from './global/Icon';
 
const LoadingScreen = () => {

    return (
        <div className='loading-screen'>
            <img width='64' height='64' src='https://andres.run/files/spinner1.svg' alt='a'/>
            <div>Loading..</div>
        </div>
    );
}
 
export default LoadingScreen