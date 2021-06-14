import React, { useContext, useEffect } from 'react';
import { appStates, Store } from '../../management/Store';
import Card from '../global/Card';
import Toolbar from './Toolbar'; 
import New from '../footer/New';

const Container = () => {

    const {state, dispatch, appState} = useContext(Store);

    const getCards = (): JSX.Element[] => {
        const cards: JSX.Element[] = [];
        const collection = state.collection;
        const filtered = state.cards.filter(card => card.collection === state.collection.label);
        filtered.forEach(card => 
            cards.push(<Card key={card.id} title={card.title} description={card.description} link={card.link} collection={card.collection} id={card.id} loading={card.id === 'dummy'}/>));

        return cards;
    }

    var cards: JSX.Element[] = getCards();
    useEffect(() => {
        cards = getCards();
    }, [state.cards]);

    return (
        <div>
            <Toolbar />
            { appState === appStates.LOADED && state.new && <New />}
            <div className='container'>
                {cards}
            </div>
        </div>
    );
}
 
export default Container