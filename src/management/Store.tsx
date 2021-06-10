import userEvent from '@testing-library/user-event';
import axios from 'axios';
import Cookies from 'js-cookie';
import React, { useEffect, useReducer, useState } from 'react';
import apiUrl from '../helper/Constants';
import isDev from '../helper/Environment';
 
interface Card{
    title: string,
    link: string,
    description: string,
    category: string,
    id: string
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
    | { type: 'add-card', payload: Card }
    | { type: 'remove-card', payload: String };

const reducer = (state: typeof initialState, action: actionType) => {
    switch(action.type){
        case 'authenticate':
            return {...state, authenticated: true, user: action.payload };
        case 'add-card':
            return {...state, cards: [...state.cards, action.payload]};
        case 'remove-card':
            const cards = state.cards.filter(card => card.id !== action.payload);
            return {...state, cards: cards};
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
        console.log(process.env.NODE_ENV);
        console.log(isDev());
        console.log(apiUrl);

        Cookies.set('nextUri', '/bookmarks', { domain: '.local.test' });

        axios.defaults.withCredentials = true;
        axios.get(apiUrl +'/auth').then(res => {
            if(res.status === 200){
                console.log(res);
                if(res.data.title === 'TRUE'){
                    dispatch({ type: 'authenticate', payload: { username: res.data.message.username, country: res.data.message.country} });

                    axios.get(apiUrl +'/get/cards').then(res => {
                        res.data.cards.forEach((card: Card) => dispatch({type: 'add-card', payload: card}));
                        setAppState(appStates.LOADED);
                    });
                }else setAppState(appStates.LOADED);

                return res.data;
            }
        });
    }, []);

    return (
        <Store.Provider value={value}>{children}</Store.Provider>
    );
}
 
export default StoreJSX