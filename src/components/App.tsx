import React, { useContext, useEffect } from 'react';
import StoreJSX, { Store } from '../management/Store';
import Container from './container/Container';
import Navbar from './navbar/Navbar';
import axios from 'axios';

import Cookies from 'js-cookie';

const App = () => {

    const { state, dispatch } = useContext(Store);

    useEffect(() => {
        axios.defaults.withCredentials = true;
        axios.get('http://localhost:5000/test').then(res => {
            console.log(res.status);
            if(res.status == 200){
                dispatch({ type: 'set-username', payload: res.data.message });
            }
        });
    }, []);

    return (
        <div className='app'>
            <Navbar />
            <Container />
        </div>
    );
}
 
export default App