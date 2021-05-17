import React, { useContext, useEffect } from 'react';
import StoreJSX, { Store, appStates } from '../management/Store';
import Container from './container/Container';
import Navbar from './navbar/Navbar';
import axios from 'axios';

import Cookies from 'js-cookie';
import LoadingScreen from './LoadingScreen';

const App = () => {

    const { state, dispatch, appState } = useContext(Store);

    return (
        <div className='app'>
            { appState === appStates.LOADING && <LoadingScreen /> }
            { appState === appStates.LOADED && <div>
                    <Navbar />
                    <Container />
                </div>
            }
        </div>
    );
}
 
export default App