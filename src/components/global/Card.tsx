import axios from 'axios';
import React, { useState } from 'react';
import { useContext } from 'react';
import { apiUrl } from '../../helper/Constants';
import { Store } from '../../management/Store';
import SVG from 'react-inlinesvg';
 
const Card = (props: { title: string, link: string, description?: string, id: string, loading: boolean }) => {

    const {state, dispatch} = useContext(Store);
    const [loading, setLoading] = useState(props.loading);

    const handleClick = (event: any) => {
        window.open(props.link, '_blank');
    }

    const destroy = () => {
        setLoading(true);
        axios.post(apiUrl +'/delete/card', {
            card: {
                id: props.id
            }
        }).then(res => {
            if(res.status === 200)
                dispatch({ type: 'remove-card', payload: props.id });
        });
    }

    const getElements = (): JSX.Element[] => {
        const elements: JSX.Element[] = [];

        if(loading){
            elements.push(
                <div key={Math.random()} className='card-dummy'>
                    <SVG width={64} height={64} src='https://andres.run/files/spinner1.svg' />
                </div>
            );
        }else{
            elements.push(<div key={Math.random()} onClick={event => handleClick(event)}>
                <h4>{props.title}</h4>
                { props.description !== undefined && <p>{props.description}</p> }
            </div>);
            
            elements.push(<button key={Math.random()} className='delete-button' onClick={destroy}>x</button>);
        }

        return elements;
    }

    return (
        <div className='card' >
            {getElements()}
        </div>
    );
}
 
export default Card