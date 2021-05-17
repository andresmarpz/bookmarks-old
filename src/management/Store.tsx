import React, { useReducer } from 'react';
 
interface Card{
    title: string,
    link: string,
    description: string,
    category: string
}

const initialState = {
    authenticated: false,
    username: '',
    categories: [] as String[],
    cards: [] as Card[]
};

type actionType = 
    | { type: 'set-username', payload: string }
    | { type: 'add-card', payload: string };

const reducer = (state: typeof initialState, action: actionType) => {
    switch(action.type){
        case 'set-username':
            return {...state, authenticated: true, username: action.payload};
        case 'add-card':
            return {...state};
    }
}

export interface ContextTypes{
    state: typeof initialState;
    dispatch: React.Dispatch<actionType>;
}

export const Store = React.createContext<ContextTypes>({
    state: initialState,
    dispatch: () => {}
});

const StoreJSX = ({children}: any) => {

    const [state, dispatch] = useReducer(reducer, initialState);
    const value = {state, dispatch};

    return (
        <Store.Provider value={value}>{children}</Store.Provider>
    );
}
 
export default StoreJSX