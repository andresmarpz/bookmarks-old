import userEvent from '@testing-library/user-event';
import axios from 'axios';
import Cookies from 'js-cookie';
import React, { useEffect, useReducer, useState } from 'react';
 
interface Card{
    title: string,
    link: string,
    description: string,
    category: string
}

interface User{
    username: string,
    country: string
}

const initialState = {
    authenticated: false,
    user: {} as User,
    categories: [] as String[],
    cards: [] as Card[]
};

type actionType = 
    | { type: 'authenticate', payload: User }
    | { type: 'add-card', payload: Card };

const reducer = (state: typeof initialState, action: actionType) => {
    switch(action.type){
        case 'authenticate':
            return {...state, authenticated: true, user: action.payload };
        case 'add-card':
            return {...state};
    }
}

export enum appStates{
    LOADING, LOADED
}

interface ContextTypes{
    state: typeof initialState;
    dispatch: React.Dispatch<actionType>,
    appState: appStates
}

export const Store = React.createContext<ContextTypes>({
    state: initialState,
    dispatch: () => {},
    appState: appStates.LOADING
});

const StoreJSX = ({children}: any) => {

    const [state, dispatch] = useReducer(reducer, initialState);

    const [appState, setAppState] = useState(appStates.LOADING);

    const value = {state, dispatch, appState};

    useEffect(() => {
        Cookies.set('nextUri', '/bookmarks');

        axios.defaults.withCredentials = true;
        axios.get('http://localhost:5000/auth').then(res => {
            if(res.status == 200){
                console.log(res);
                if(res.data.title === 'TRUE'){
                    dispatch({ type: 'authenticate', payload: { username: res.data.message.username, country: res.data.message.country} });

                    axios.get('http://localhost:5000/get/cards', {
                        data: {
                            username: res.data.message.username
                        }
                    }).then(res => {
                        console.log(res);
                        setAppState(appStates.LOADED);
                    });
                }else setAppState(appStates.LOADED);

                return res.data;
            }
        })
        // .then(userInfo => {
        //     console.log(userInfo);
        //     axios.get('https://api.andres.run/get/cards', {
        //         data: {
        //             username: userInfo.username
        //         }
        //     }).then(res => {
        //         console.log(res);
        //         setAppState(appStates.LOADED);
        //     });
        // });
    }, []);

    return (
        <Store.Provider value={value}>{children}</Store.Provider>
    );
}
 
export default StoreJSX