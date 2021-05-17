import React from 'react';
 
const Card = (props: { title: string, link: string, description?: string }) => {

    const handleClick = (event: any) => {
        window.open(props.link, '_blank');
    }

    return (
        <div className='card' onClick={event => handleClick(event)}>
            <h4>{props.title}</h4>
            { props.description !== undefined && <p>{props.description}</p> }
        </div>
    );
}
 
export default Card