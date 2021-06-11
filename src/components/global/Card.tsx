import axios from 'axios';
import React from 'react';
import { useContext } from 'react';
import { apiUrl } from '../../helper/Constants';
import { Store } from '../../management/Store';
 
const Card = (props: { title: string, link: string, description?: string, id: string }) => {

    const {state, dispatch} = useContext(Store);

    const handleClick = (event: any) => {
        window.open(props.link, '_blank');
    }

    const destroy = () => {
        axios.post(apiUrl +'/delete/card', {
            card: {
                id: props.id
            }
        }).then(res => {
            if(res.status === 200)
                dispatch({ type: 'remove-card', payload: props.id });
        });
    }

    return (
        <div className='card' >
            <div onClick={event => handleClick(event)}>
                <h4>{props.title}</h4>
                { props.description !== undefined && <p>{props.description}</p> }
            </div>
            <button className='delete-button' onClick={destroy}>x</button>
        </div>
    );
}
 
export default Card