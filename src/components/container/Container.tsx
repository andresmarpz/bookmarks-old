import React, { useContext, useEffect } from 'react';
import { Store } from '../../management/Store';
import Card from '../global/Card';
import Icon from '../global/Icon';
 
const Container = () => {

    const {state, dispatch} = useContext(Store);

    const getCards = (): JSX.Element[] => {
        const cards: JSX.Element[] = [];
        state.cards.forEach(card => 
            cards.push(<Card key={card.id} title={card.title} description={card.description} link={card.link} />));

        return cards;
    }

    var cards: JSX.Element[] = getCards();
    useEffect(() => {
        cards = getCards();
    }, [state.cards]);

    return (
        <div className='container'>
            {cards}
        </div>
    );
}
 
export default Container