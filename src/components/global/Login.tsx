import React from 'react';
import Icon from './Icon';
 
const Login = (props: { icon: JSX.Element, title: string, href: string, onClick?: () => void }) => {

    const handleClick = () => {
        window.open(props.href, '_self' );
        if(props.onClick)
            props.onClick();
    }

    return (
        <button className='login' onClick={() => handleClick()} >
            {props.icon}
            <span>{props.title}</span>
        </button>
    );
}
 
export default Login